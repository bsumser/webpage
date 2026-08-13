## Table of Contents

- [Description](#description)
- [Tech Stack](#techstack)
- [SSL Cert](#sslcert)
- [Make Coammands](#make)
- [Credits](#credits)

## Description

## Tech Stack

React
Vite
Typescript
Tailwind
Golang
Chi
nginx

## SSL Certification


## Hosting
I use the entire tech stack on a Digital Ocean VPS running Ubuntu linux.

## Make Commands

make help	Displays formatted list of all available commands
make up	Starts all services in detached mode
make build	Forces a rebuild of Docker images before running
make down	Stops and removes running containers
make logs	Streams combined real-time logs from all containers
make status	Displays container status and healthchecks
make test-up	Runs your isolated Frontend + Nginx test setup
make shell-backend	Drops you into a shell inside the running Go container
make shell-db	Opens an interactive psql shell in the database
make clean-all	Stops everything, deletes database volumes, and removes built images (with prompt)

## Optimizations
Postgres uses a module called pg_trgm to break your card names into these small chunks. When you perform a search using ILIKE or // %, the database doesn't have to scan all 650,000 rows one by one (a "Sequential Scan"). Instead, it looks up the trigrams in the index to find matching cards instantly.

## Credits

Thanks to [boda.sh](https://boda.sh/blog/beginners-guide-to-secure-vps/) for their guide on securing a VPS.

Thanks to [morhetz](https://github.com/morhetz) for creating the gruvbox color scheme. I use it in almost all the programs on my pc.

Credit to Niklas Luhmann for pioneering the Zettelkasten method for personal knowledge managment. This kind of system always intrigued me
ever since I about the interconnected web of hypercards from Neal Stephenson's book Snow Crash.

https://earthly.dev/blog/golang-chi/
