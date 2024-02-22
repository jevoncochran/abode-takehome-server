# Backend Overview

The backend of this project is built on a Node.js/Express application using Typescript, providing a robust and scalable foundation for handling data and API requests. Database interactions, including queries, migrations, and seeds, are seamlessly managed by Knex. In the development environment, the backend utilizes SQLITE3, but it's designed to effortlessly transition to a more robust database like PostgreSQL for production.

## Backend Architecture

The backend architecture revolves around three main entities: users, events, and invites. Each entity is meticulously organized with corresponding migrations and seeds to ensure a structured and maintainable codebase.

### API Structure

The API is logically organized into four distinct levels, following a hierarchical order:

1. **Routers:** Define the routes for each entity (users, events, invites).
2. **Controllers:** Handle the incoming requests and delegate responsibilities to the appropriate services.
3. **Services:** Contain the business logic for each entity, ensuring separation of concerns.
4. **Models:** Represent the database interactions for users, events, and invites.

## Authentication

User authentication is implemented using JSON Web Tokens (JWT), providing a secure and efficient method for managing user sessions and securing API endpoints.

This backend architecture is designed for flexibility, scalability, and ease of maintenance. 

