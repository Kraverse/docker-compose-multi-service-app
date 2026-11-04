# Practical: Deployment of a Multi-Service Application Using Docker Compose

## Aim
To deploy a multi-service application using Docker Compose, with a Node.js web service and a MongoDB database running in separate containers.

## Objectives
- Understand containerization using Docker.
- Configure multiple services using a Docker Compose YAML file.
- Connect a Node.js application to MongoDB.
- Build, start, inspect, and stop containers using Docker commands.

## Requirements
- Docker Desktop
- Visual Studio Code or another code editor
- Web browser
- Git and GitHub (for version control)

## Theory
Docker is a platform for packaging and running applications in isolated environments called containers. Docker Compose is a tool for defining and managing multi-container applications through a YAML configuration file.

This experiment contains two services:
1. **web:** A Node.js application using Express. It accepts browser requests and stores visit records in MongoDB.
2. **mongo:** A MongoDB database that stores the visit records.

Compose creates a network for the services. The web service reaches MongoDB using the service hostname `mongo`, not `localhost`. A named volume called `mongo_data` persists database files when containers are recreated.

## Architecture
```text
User / Browser
      |
      v
Node.js Web Service (port 3000)
      |
      v
MongoDB Database (port 27017)
```

## Procedure

### 1. Get the project
Clone the GitHub repository and open the project folder in a terminal:
```bash
git clone https://github.com/Kraverse/docker-compose-multi-service-app.git
cd docker-compose-multi-service-app
```

### 2. Build and start the services
```bash
docker compose up --build
```
This builds the Node.js image, downloads the MongoDB image if it is not already available, creates the Compose network and volume, and starts both services. MongoDB must pass its health check before the web service starts.

### 3. Check Compose services
Open a second terminal in the project directory:
```bash
docker compose ps
```
Both `web` and `mongo` should be running. MongoDB should report healthy.

### 4. Check running containers
```bash
docker ps
```
Verify the Node.js and MongoDB containers and their published ports.

### 5. Check web-service logs
```bash
docker compose logs web
```
Expected messages:
```text
MongoDB Connected
Server running on port 3000
```

### 6. Test in a browser
Open:
```text
http://localhost:3000
```
The page should show that the Node.js service is running and MongoDB is connected. Refreshing the page stores another visit record in MongoDB.

Optional health endpoint:
```text
http://localhost:3000/health
```
It should return JSON indicating that the database is connected.

### 7. Stop the application
```bash
docker compose down
```
This stops and removes the containers and Compose network. The named database volume is retained.

To also delete the stored database data (destructive):
```bash
docker compose down -v
```

## Key Commands

| Command | Purpose |
|---|---|
| `docker compose up --build` | Build and start all services |
| `docker compose ps` | Check Compose service status |
| `docker ps` | List running containers |
| `docker compose logs web` | View web-service logs |
| `docker compose down` | Stop and remove containers and network |
| `docker compose down -v` | Also remove named volumes and stored database data |

## Expected Output
- The Node.js application starts on port 3000.
- MongoDB runs in a separate container on the Compose network.
- The web application connects successfully to MongoDB.
- Both services appear in `docker compose ps`.
- The application is accessible at `http://localhost:3000`.

## Result
The multi-service application is deployed using Docker Compose. The Node.js web service and MongoDB database are configured as separate services and managed together through one Compose file.

## Conclusion
Docker Compose simplifies the deployment and management of multi-container applications by defining services, networking, startup dependencies, and persistent storage in a single configuration file.

## Practical screenshots
After running the commands on your own computer, add genuine screenshots showing:
1. Project files in VS Code.
2. Successful `docker compose up --build`.
3. `docker compose ps` showing both services.
4. `docker ps` showing both containers.
5. `docker compose logs web` showing the connection and server messages.
6. The application open at `http://localhost:3000`.
7. Docker Desktop showing the running containers.

Do not use illustrative screenshots as proof of execution; capture the actual output from your Docker installation.
