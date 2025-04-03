# Microservices Breakdown

- **NGINX**: Acting as reverse proxy and only exposed container to the host that routes to an API that then routes to other encoding methods.
- **API1**: Can be though of as the 'Router' between Rot13 and Base64 API - using REST interfaces to communicate.
- **Rot13**: A simple encoding service that encodes text using the Rot13 algorithm.
- **Base64**: Another encoding service that encodes text using Base64 algorithm.
- **API-NETWORK**: Being used as the name to connect these containers in a private subnet that allows for the naming of services to be used instead of IP addresses. This makes it easier to manage and scale the services without worrying about IP address changes.

The main purpose of this setup is to demonstrate how microservices can be structured and communicate with each other using Docker and Docker Compose. Each service is isolated in its own container, allowing for easy scaling, maintenance, and deployment. The main file to look to is the _docker-compose.yml_ file, which defines the services, points to how to set up their configuration, and specifies the networks they belong to.

## Setup Instructions

Use `docker-compose up --build` to start the services.
