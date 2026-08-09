# Variables
COMPOSE_FILE = docker-compose.yml
COMPOSE_TEST_FILE = docker-compose.test.yml
DC = docker compose -f $(COMPOSE_FILE)
DC_TEST = docker compose -f $(COMPOSE_TEST_FILE)

# Color outputs
CYAN  = \033[0;36m
GREEN = \033[0;32m
RED   = \033[0;31m
RESET = \033[0m

.PHONY: help build up down restart logs logs-backend logs-frontend logs-db status clean clean-all shell-backend shell-frontend shell-db db-reset test-up test-down

help: ## Show this help menu
	@echo "$(CYAN)Available Makefile commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-18s$(RESET) %s\n", $$1, $$2}'

## -- Production / Full Stack Commands --

up: ## Start all containers in background
	@echo "$(CYAN)Starting containers...$(RESET)"
	$(DC) up -d

build: ## Rebuild image assets and start containers
	@echo "$(CYAN)Building and starting containers...$(RESET)"
	$(DC) up -d --build

down: ## Stop and remove containers
	@echo "$(CYAN)Stopping containers...$(RESET)"
	$(DC) down

restart: ## Restart all containers
	@echo "$(CYAN)Restarting containers...$(RESET)"
	$(DC) restart

logs: ## Follow logs from all containers
	$(DC) logs -f

logs-backend: ## Follow Go backend logs
	$(DC) logs -f backend

logs-frontend: ## Follow React/Nginx frontend logs
	$(DC) logs -f frontend

logs-db: ## Follow PostgreSQL database logs (useful during init.sql import)
	$(DC) logs -f db

status: ## List running containers and health status
	$(DC) ps

## -- Development & Interactive Shells --

shell-backend: ## Open interactive shell inside Go container
	$(DC) exec backend sh

shell-frontend: ## Open interactive shell inside Frontend container
	$(DC) exec frontend sh

shell-db: ## Connect directly to PostgreSQL via psql
	$(DC) exec db psql -U $${POSTGRES_USER:-portfolio_user} -d $${POSTGRES_DB:-portfolio}

db-reset: ## Wipe persistent DB volume and re-run db/init.sql from scratch
	@echo "$(RED)WARNING: Deleting database volume to re-trigger initialization script...$(RESET)"
	$(DC) down -v
	$(DC) up -d db
	@echo "$(CYAN)Database container restarting. Run 'make logs-db' to watch the import progress.$(RESET)"

## -- Local Testing (Frontend + Nginx only) --

test-up: ## Start test stack (frontend + proxy only)
	@echo "$(CYAN)Starting test stack...$(RESET)"
	$(DC_TEST) up -d --build

test-down: ## Stop test stack
	@echo "$(CYAN)Stopping test stack...$(RESET)"
	$(DC_TEST) down

## -- Cleanup Commands --

clean: ## Stop containers and remove unused Docker networks/images
	@echo "$(CYAN)Cleaning up unused Docker resources...$(RESET)"
	$(DC) down --remove-orphans
	docker image prune -f

clean-all: ## WARNING: Removes containers, images, AND persistent database volumes
	@echo "$(RED)WARNING: This will permanently delete database volumes and cached images!$(RESET)"
	@read -p "Are you sure? [y/N] " ans && [ $${ans:-N} = y ]
	$(DC) down -v --rmi all --remove-orphans