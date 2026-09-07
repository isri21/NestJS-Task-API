# Intro
This is a small, unglamorous Task tracker application, that touches the basic of working with a NestJS backend.

## Description
A task tracker. A user can create a task, list tasks, mark one done, and delete it. That is the entire
feature set.

# Installation
1. Clone the Repo
```bash
git clone https://github.com/isri21/NestJS-Task-API.git
```

2. Move to Repo Directory
```bash
cd NestJS-Task-API/
```

3. Setup the following Environment Variables
```.env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DB_PORT=
REDIS_PORT=
```
or just create a `.env` file in the directory and paste in the following defaults
```bash
vi .env
```
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=postgres
REDIS_PORT=6379
REDIS_HOST=localhost
```
4. Start up Docker 
```bash
docker compose up
```
5. Start Dev Server
```bash
pnpm run start:dev
```

Then we can access the `API` at `localhost:3000` and the OpenAPI documentation at `localhost:3000/api`