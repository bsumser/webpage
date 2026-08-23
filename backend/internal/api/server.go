package api

import (
	"backend/internal/database" // Import your database package
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http" // Added for JSON encoding if needed
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

// Embed subjects.json directly into the binary at compile time
//
//go:embed subjects.json
var subjectsJSON []byte

type Server struct {
	Router       *chi.Mux
	DB           *database.DB    // FIX: Add the DB field here
	SubjectCache map[int]Subject // In-memory map
}

type KeyRequest struct {
	Key string `json:"key"`
}

type KeyResponse struct {
	Key        string    `json:"key"`
	TotalItems int       `json:"total_items"`
	Subjects   []Subject `json:"subjects"`
}

// WaniKani Assignment Payload Structures
type WaniKaniAssignmentData struct {
	SubjectID   int    `json:"subject_id"`
	SubjectType string `json:"subject_type"` // "vocabulary" or "kana_vocabulary"
	SrsStage    int    `json:"srs_stage"`
	Passed      bool   `json:"passed"`
}

type WaniKaniAssignment struct {
	ID   int                    `json:"id"`
	Data WaniKaniAssignmentData `json:"data"`
}

type WaniKaniAssignmentsResponse struct {
	Object     string               `json:"object"`
	TotalCount int                  `json:"total_count"`
	Data       []WaniKaniAssignment `json:"data"`
}

// Your Crossword Output Structures
type CrosswordPuzzle struct {
	Key        string      `json:"key"`
	TotalItems int         `json:"total_items"`
	Grid       interface{} `json:"grid"`  // Replace with your grid struct/matrix
	Clues      interface{} `json:"clues"` // Replace with your clues struct
}

// FIX: Pass the DB connection into the server constructor
func CreateServer(db *database.DB) *Server {
	s := &Server{
		Router:       chi.NewRouter(),
		DB:           db,                 // Initialize the DB field
		SubjectCache: loadSubjectCache(), // Loads instantly into memory
	}

	s.Router.Use(middleware.Logger)
	s.Router.Use(middleware.Recoverer)

	s.Router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://bsumser.dev", "http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Authorization"},
		MaxAge:         300,
	}))

	s.MountHandlers()
	return s
}

// helper function to cache wanikani data
func loadSubjectCache() map[int]Subject {
	var list []Subject
	if err := json.Unmarshal(subjectsJSON, &list); err != nil {
		log.Fatalf("Failed to parse embedded subjects.json: %v", err)
	}

	cache := make(map[int]Subject, len(list))
	for _, sub := range list {
		cache[sub.ID] = sub
	}

	log.Printf("Successfully loaded %d WaniKani subjects into memory", len(cache))
	return cache
}

func (s *Server) MountHandlers() {
	s.Router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("MTG API is running..."))
	})

	s.Router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	s.Router.Route("/mtg", func(r chi.Router) {
		r.Get("/deck", s.handleGetDeck)
		r.Get("/card", s.handleGetCard)

		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", s.handleGetItemByID)
		})
	})

	s.Router.Route("/crossword", func(r chi.Router) {
		r.Post("/key", s.handlePostCrossword)
	})

}

func (s *Server) handleGetDeck(w http.ResponseWriter, r *http.Request) {
	rawDeck := r.URL.Query().Get("deck")
	if rawDeck == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "No deck provided"}`))
		return
	}

	entries := ParseDeckString(rawDeck)

	// This will now work because s.DB is defined!
	deckData, err := s.DB.FetchDeckData(entries)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	// If FetchDeckData returns []byte, use w.Write.
	// If it returns a slice of structs, use json.NewEncoder(w).Encode(deckData)
	w.Write(deckData)
}

func (s *Server) handleGetCard(w http.ResponseWriter, r *http.Request) {
	card := chi.URLParam(r, "card")
	w.Write([]byte("Handling get card: " + card))
}

func (s *Server) handleGetItemByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	w.Write([]byte("Item ID: " + id))
}

func (s *Server) handlePostCrossword(w http.ResponseWriter, r *http.Request) {
	// 1. Set JSON response header first
	w.Header().Set("Content-Type", "application/json")

	// 2. Decode and validate request payload
	var req KeyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || strings.TrimSpace(req.Key) == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid request body or missing key parameter",
		})
		return
	}

	apiToken := strings.TrimSpace(req.Key)

	// 3. Fetch user's vocabulary assignments from WaniKani
	assignments, err := s.fetchWaniKaniAssignments(apiToken)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("WaniKani API error: %v", err),
		})
		return
	}

	// 4. Cross-reference subject IDs against the in-memory cache
	userSubjects := make([]Subject, 0, len(assignments.Data))
	for _, assignment := range assignments.Data {
		subID := assignment.Data.SubjectID
		if subject, exists := s.SubjectCache[subID]; exists {
			userSubjects = append(userSubjects, subject)
		}
	}

	// 5. TODO: Feed userSubjects into your backend puzzle generation algorithm
	// grid, clues := s.generateCrossword(userSubjects)

	// 6. Encode and send the final puzzle payload back to client
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(KeyResponse{
		Key:        req.Key,
		TotalItems: len(userSubjects),
		Subjects:   userSubjects,
	})
}

// Helper method to execute the WaniKani GET request
func (s *Server) fetchWaniKaniAssignments(apiToken string) (*WaniKaniAssignmentsResponse, error) {
	endpoint := "https://api.wanikani.com/v2/assignments?types=vocabulary,kana_vocabulary&srs_stages=1,2,3,4,5,6,7,8,9"

	req, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Wanikani-Revision", "20170710")
	req.Header.Set("Authorization", "Bearer "+apiToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("status %d: %s", resp.StatusCode, string(body))
	}

	var assignments WaniKaniAssignmentsResponse
	if err := json.NewDecoder(resp.Body).Decode(&assignments); err != nil {
		return nil, err
	}

	return &assignments, nil
}
