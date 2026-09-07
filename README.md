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
or copy the command below 
```bash
echo -e "DB_HOST=localhost\nDB_PORT=5432\nDB_USERNAME=postgres\nDB_PASSWORD=root\nDB_NAME=postgres\nREDIS_PORT=6379\nREDIS_HOST=localhost" > .env
```
This command creates a `.env` file in the directory and assigns some default values to get started.

4. Start up Docker 
```bash
docker compose up -d
```
5. Start Dev Server
```bash
pnpm run start:dev
```

Then we can access the `API` at `localhost:3000` and the OpenAPI documentation at `localhost:3000/api`