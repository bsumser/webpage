package api

import "encoding/json"

// Subject represents a WaniKani subject entity (kanji, vocabulary, radical, etc.)
type Subject struct {
	ID         int      `json:"id"`
	Object     string   `json:"object"` // "vocabulary", "kana_vocabulary", "kanji", etc.
	Characters string   `json:"characters"`
	Meanings   []string `json:"meanings"`
	Readings   []string `json:"readings"`
}

// UnmarshalJSON extracts nested WaniKani payload fields into a flat Subject struct
func (s *Subject) UnmarshalJSON(data []byte) error {
	type Meaning struct {
		Meaning string `json:"meaning"`
	}
	type Reading struct {
		Reading string `json:"reading"`
	}
	var raw struct {
		ID     int    `json:"id"`
		Object string `json:"object"`
		Data   struct {
			Characters string    `json:"characters"`
			Meanings   []Meaning `json:"meanings"`
			Readings   []Reading `json:"readings"`
		} `json:"data"`
	}

	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	s.ID = raw.ID
	s.Object = raw.Object
	s.Characters = raw.Data.Characters

	s.Meanings = make([]string, 0, len(raw.Data.Meanings))
	for _, m := range raw.Data.Meanings {
		s.Meanings = append(s.Meanings, m.Meaning)
	}

	s.Readings = make([]string, 0, len(raw.Data.Readings))
	for _, r := range raw.Data.Readings {
		s.Readings = append(s.Readings, r.Reading)
	}

	return nil
}