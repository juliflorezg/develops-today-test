VM_IP?=ec2-107-22-133-125.compute-1.amazonaws.com
DOCKER_HOST:="ssh://ubuntu@${VM_IP}"


.PHONY: install
install:
	cd test-country-info-api && npm install
	cd test-country-info-client && npm install

.PHONY: run-backend
run-backend:
	cd test-country-info-api && npm run start:dev

.PHONY: run-frontend
run-frontend:
	cd test-country-info-client && npm run dev


.PHONY: docker-build-all
docker-build-all:
	docker build \
	-t react-client-nginx \
	-t juliflorezg/devs-today-test-app-react-client-nginx \
	-f ./test-country-info-client/Dockerfile \
	./test-country-info-client/

	docker build \
	-t api-nest \
	-t juliflorezg/devs-today-test-app-api-nest \
	-f ./test-country-info-api/Dockerfile \
	./test-country-info-api/

.PHONY: swarm-init
swarm-init:
	DOCKER_HOST=${DOCKER_HOST} docker swarm init

.PHONY: swarm-deploy-stack
swarm-deploy-stack:
	DOCKER_HOST=${DOCKER_HOST} docker stack deploy -c docker-swarm.yml example-app

.PHONY: swarm-ls
swarm-ls:
	DOCKER_HOST=${DOCKER_HOST} docker service ls

.PHONY: swarm-remove-stack
swarm-remove-stack:
	DOCKER_HOST=${DOCKER_HOST} docker stack rm example-app


.PHONY: redeploy-all
redeploy-all:
	-$(MAKE) swarm-remove-stack
	-$(MAKE) delete-secrets
	@sleep 3
	-$(MAKE) create-secrets
	-$(MAKE) swarm-deploy-stack
