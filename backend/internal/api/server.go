package api

import (
	"backend/internal/database" // Import your database package
	"encoding/json"
	"net/http" // Added for JSON encoding if needed

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type Server struct {
	Router *chi.Mux
	DB     *database.DB // FIX: Add the DB field here
}

type KeyRequest struct {
	Key string `json:"key"`
}

type KeyResponse struct {
	Key string `json:"key"`
}

// FIX: Pass the DB connection into the server constructor
func CreateServer(db *database.DB) *Server {
	s := &Server{
		Router: chi.NewRouter(),
		DB:     db, // Initialize the DB field
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
	// 1. Set JSON header BEFORE writing any headers/status
	w.Header().Set("Content-Type", "application/json")

	var req KeyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Key == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{
			"error": "Invalid request body or missing key parameter",
		})
		return
	}

	// 2. Encode structured JSON response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(KeyResponse{
		Key: req.Key,
	})
}
