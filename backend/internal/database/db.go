package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// Define the DB struct so other files in this package can see it
type DB struct {
	*sql.DB
}

func ConnectDatabase() (*DB, error) {
	// --- ROBUST ENV LOADING ---
	dir, _ := os.Getwd()
	for {
		path := filepath.Join(dir, "database.env")
		if _, err := os.Stat(path); err == nil {
			godotenv.Load(path)
			break
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			break
		}
		dir = parent
	}
	// ---------------------------

	host := os.Getenv("DB_HOST")
	portStr := os.Getenv("DB_PORT")

	port, err := strconv.Atoi(portStr)
	if err != nil || port == 0 {
		return nil, fmt.Errorf("invalid or missing DB_PORT: %v", portStr)
	}

	user := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	pass := os.Getenv("DB_PASSWORD")

	if host == "" {
		return nil, fmt.Errorf("DB_HOST is not set in environment")
	}

	// Default to 'disable' for local Docker setups if DB_SSLMODE isn't set
	sslMode := os.Getenv("DB_SSLMODE")
	if sslMode == "" {
		sslMode = "disable"
	}

	psqlSetup := fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s sslmode=%s",
		host, port, user, dbname, pass, sslMode)

	db, err := sql.Open("postgres", psqlSetup)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("error pinging database: %w", err)
	}

	return &DB{db}, nil
}
