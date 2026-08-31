package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type WaniKaniResponse struct {
	Pages struct {
		NextURL string `json:"next_url"`
	} `json:"pages"`
	Data []json.RawMessage `json:"data"`
}

// Helper to read WANI_KEY from database.env in the root folder
func loadWaniKey(envPath string) (string, error) {
	file, err := os.Open(envPath)
	if err != nil {
		return "", fmt.Errorf("could not open %s: %w", envPath, err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if strings.HasPrefix(line, "WANI_KEY=") {
			key := strings.TrimPrefix(line, "WANI_KEY=")
			// Trim surrounding quotes if any exist
			key = strings.Trim(key, `"'`)
			return strings.TrimSpace(key), nil
		}
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}

	return "", fmt.Errorf("WANI_KEY not found in %s", envPath)
}

func main() {
	// 1. Read token from database.env in root
	apiToken, err := loadWaniKey("database.env")
	if err != nil {
		panic(err)
	}

	nextURL := "https://api.wanikani.com/v2/subjects"
	var allSubjects []json.RawMessage
	client := &http.Client{}

	fmt.Println("Downloading all subjects from WaniKani...")

	for nextURL != "" {
		req, err := http.NewRequest(http.MethodGet, nextURL, nil)
		if err != nil {
			panic(err)
		}

		req.Header.Set("Authorization", "Bearer "+apiToken)
		req.Header.Set("Wanikani-Revision", "20170710")

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}

		if resp.StatusCode != http.StatusOK {
			body, _ := io.ReadAll(resp.Body)
			resp.Body.Close()
			panic(fmt.Sprintf("API request failed (%d): %s", resp.StatusCode, string(body)))
		}

		var wkResp WaniKaniResponse
		if err := json.NewDecoder(resp.Body).Decode(&wkResp); err != nil {
			resp.Body.Close()
			panic(err)
		}
		resp.Body.Close()

		allSubjects = append(allSubjects, wkResp.Data...)
		fmt.Printf("Fetched %d subjects...\n", len(allSubjects))

		nextURL = wkResp.Pages.NextURL
	}

	output, err := json.MarshalIndent(allSubjects, "", "  ")
	if err != nil {
		panic(err)
	}

	// 2. Write output into internal/api/subjects.json
	if err := os.WriteFile("internal/api/subjects.json", output, 0644); err != nil {
		panic(err)
	}

	fmt.Printf("\nDone! Saved %d subjects to internal/api/subjects.json\n", len(allSubjects))
}