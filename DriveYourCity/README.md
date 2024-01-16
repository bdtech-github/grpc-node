# NY-Times 

## Setup

* Run `docker compose up`
* Run `docker compose exec cockroach_1 ./cockroach init --insecure --host=cockroach_1` to start one CockroachDB node.

docker compose -f docker-compose.yml up -d --build
docker compose -f docker-compose.yml down --remove-orphans --volumes
docker system prune -a -f --volumes

docker exec -it roach-0 ./cockroach sql --insecure