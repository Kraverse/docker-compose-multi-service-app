# Docker Compose Multi-Service Application

A practical demonstration of a multi-container application using **Node.js, Express, MongoDB, and Docker Compose**.

The Node.js web service runs separately from the MongoDB database. Docker Compose configures their networking, startup dependency, port mappings, and persistent database storage.

## Architecture

```text
Browser (http://localhost:3000)
              |
              v
     Node.js / Express
       web container
              |
              v
       MongoDB Database
       mongo container
```

## Project structure

```text
docker-compose-multi-service-app/
├── web/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── .gitignore
├── docker-compose.yml
├── PRACTICAL.md
└── README.md
```

## Prerequisites

- Docker Desktop (with Docker Compose)
- Git (to clone the repository)
- A web browser

Node.js does not need to be installed on the host because it runs inside the web container.

## Run locally

Clone the repository:

```bash
git clone https://github.com/Kraverse/docker-compose-multi-service-app.git
cd docker-compose-multi-service-app
```

Build and start both services:

```bash
docker compose up --build
```

Open **http://localhost:3000** in your browser.

The page confirms that the Node.js service is running and MongoDB is connected. Refreshing the page saves a visit record to MongoDB.

## Verify the deployment

Run these commands from the project directory in a second terminal:

```bash
docker compose ps
docker ps
docker compose logs web
```

Expected web logs:

```text
MongoDB Connected
Server running on port 3000
```

Health endpoint: **http://localhost:3000/health**

## Stop the services

```bash
docker compose down
```

The containers and Compose network are removed, but the named MongoDB volume is retained.

To remove the volume and all stored database data as well:

```bash
docker compose down -v
```

## Services

| Service | Technology | Container port | Host port |
|---|---|---:|---:|
| web | Node.js + Express | 3000 | 3000 |
| mongo | MongoDB 7 | 27017 | 27017 |

The web service connects to MongoDB using the Compose service hostname `mongo`. The database uses a named volume (`mongo_data`) so data persists across container recreation.

## Practical documentation

See [PRACTICAL.md](PRACTICAL.md) for the aim, theory, requirements, procedure, commands, expected output, result, and screenshot checklist.

## Note

The credentials in `docker-compose.yml` are simple demonstration credentials for this local practical only. Do not reuse them in production. For production deployments, use secrets or environment variables and avoid exposing the database port publicly.
