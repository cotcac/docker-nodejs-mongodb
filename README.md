# Docker Node Mongodb Example

> Simple example of a dockerized Node/Mongodb app

## Quick Start

```bash
# Run in Docker
docker-compose up --build
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```
## work with the host machine network database.
```
docker build -t node-mongo .
docker run -it -p 3000:3000 -e DB_URI=mongodb://127.0.0.1:27017 --network host node-mongo
```
Note: 127.0.0.1 = localhost so you can use localhost as well.
