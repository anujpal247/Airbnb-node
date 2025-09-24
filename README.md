
# 🏨 Hotel Booking Backend (Microservices Architecture)

A scalable microservices-based backend for hotel booking applications like Booking.com or Airbnb.

---

## 📖 Overview

This project is a **hotel booking backend** built with a **microservices architecture** to support scalability and modularity. Each service is designed to be **independently deployable and scalable**, so that if user demand increases, only the required service can be scaled rather than the entire system.

The codebase follows a **layered architecture** in all services:

* **Routing Layer** – Handles incoming requests and routing.
* **Validation Layer** – Validates request payloads.
* **Controller Layer** – Orchestrates request flow.
* **Service Layer** – Contains business logic.
* **Repository Layer** – Handles database interaction.

---

## 🏗️ Architecture Diagram

```mermaid
flowchart TD

    %% Clients
    U[User] -->|HTTP/HTTPS| G[API Gateway]

    %% API Gateway
    G -->|Auth Requests| A[Auth Service (Go)]
    G -->|Hotel Data| H[Hotel Service (Node.js)]
    G -->|Booking Requests| B[Booking Service (Node.js)]
    G -->|Review Requests| R[Review Service (Go)]
    
    %% Hotel <-> Booking
    H <--> B

    %% Booking -> Notification
    B -->|Booking Success Event| Q[(Redis Queue)]
    Q --> N[Notification Service (Node.js)]
    N -->|Send Email| E[Email Provider]

    %% Databases
    H --> My[(MySQL - Hotels DB)]
    B --> Mb[(MySQL - Bookings DB)]
    R --> Mr[(MySQL - Reviews DB)]
    A --> Ma[(MySQL - Users DB)]

    %% Notes
    note right of A: Handles JWT Auth<br/>RBAC + Rate Limiting
    note right of B: Idempotent API<br/>+ Transactions
    note right of N: Async Notifications<br/>via Redis Queue

```

---

## 🏗️ Microservices

* **Hotel Service**

  * Allows hotel owners to manage hotels (CRUD).
  * Users can browse all listed hotels.
  * Cron jobs scheduled to populate room availability for the next 31 days.

* **Booking Service**

  * Users can book hotels.
  * **Idempotent API** to avoid double booking.
  * Implements **transactions** to ensure booking integrity.

* **Notification Service**

  * Sends emails asynchronously when booking is successful.
  * Uses **Redis Queue** for async message processing.

* **Auth Service**

  * Handles user management.
  * JWT-based authentication and authorization.
  * **RBAC (Role-Based Access Control)** implemented.
  * Custom **API Gateway** and **Rate Limiting** for security and traffic control.

* **Review Service**

  * Handles review management.
  * Only users who have booked a hotel can leave reviews.

---

## ⚡ Tech Stack

* **Backend:**

  * Node.js + Express.js → Hotel, Booking, Notification services
  * Go → Review, Auth services
* **Databases:**

  * MySQL → Primary data storage
  * Redis → Queue for async communication
* **Authentication:** JWT (JSON Web Token)
* **API Gateway:** Custom implementation with rate limiting
* **Other Tools:** Cron Jobs, Transaction Management

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/anujpal247/Airbnb-node.git
cd hotel-booking-backend

git clone https://github.com/anujpal247/Go_API_Gateway.git
```

### 2️⃣ Setup Environment Variables

Each service should have its own `.env` file. Example for Booking Service:

```env
PORT=4001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=booking_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
```

### 3️⃣ Install dependencies

For Node.js services:

```bash
cd hotel-service && npm install
```

For Go services:

```bash
cd auth-service && go mod tidy
```

### 4️⃣ Run services

```bash
cd hotel-service && npm run dev
cd auth-service && go run main.go
```

---

## 📌 API Documentation

* APIs are documented using Swagger/Postman collection.
* \[Insert Postman/Swagger Link Here]

---

## 📂 Project Structure (example)

```
/hotel-booking-backend
   /hotel-service
   /booking-service
   /notification-service
   /auth-service
   /review-service
   /gateway
   docker-compose.yml
   README.md
```

---

## 🛡️ Security

* JWT-based authentication.
* RBAC for fine-grained authorization.
* API Gateway with rate limiting to prevent abuse.

---







