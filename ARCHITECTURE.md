# Architecture Documentation

This document provides a comprehensive overview of the Pantry App architecture, including system design, component interactions, data flow, and deployment strategies.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [API Architecture](#api-architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment Architecture](#deployment-architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Technology Stack](#technology-stack)
- [Security Architecture](#security-architecture)

## 🎯 System Overview

The Pantry App is a full-stack web application built using a three-tier architecture pattern, separating concerns into presentation, business logic, and data layers.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  React SPA (Browser)                            │   │
│  │  • React 19 Components                           │   │
│  │  • React Router (Client-side routing)           │   │
│  │  • Axios (HTTP Client)                           │   │
│  │  • Bootstrap 5 (UI Framework)                    │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS/REST API
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Application Layer                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Express.js API Server                           │   │
│  │  • RESTful Endpoints                             │   │
│  │  • JWT Authentication                            │   │
│  │  • Request Validation (Zod)                      │   │
│  │  • Error Handling                                │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Prisma ORM
                     │
┌────────────────────▼────────────────────────────────────┐
│                    Data Layer                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                              │   │
│  │  • Relational Data Model                          │   │
│  │  • ACID Compliance                                │   │
│  │  • Transaction Support                             │   │
│  └──────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
```

## 🏗 Architecture Patterns

### Three-Tier Architecture

The application follows a classic three-tier architecture:

1. **Presentation Tier (Frontend)**
   - React Single Page Application (SPA)
   - Served via Nginx in production
   - Client-side routing and state management
   - Responsive UI with Bootstrap

2. **Application Tier (Backend)**
   - Express.js REST API
   - Business logic and request processing
   - Authentication and authorization
   - Data validation and transformation

3. **Data Tier (Database)**
   - PostgreSQL relational database
   - Prisma ORM for database access
   - Data persistence and relationships

### Design Patterns Used

- **MVC Pattern**: Separation of routes (controllers), models (Prisma), and views (React components)
- **Middleware Pattern**: Authentication, validation, and error handling middleware
- **Repository Pattern**: Prisma client abstracts database operations
- **RESTful API**: Standard HTTP methods and resource-based URLs

## 🧩 Component Architecture

### Frontend Components

```
┌─────────────────────────────────────────┐
│           App.jsx (Root)                │
│  • Router Configuration                 │
│  • Global State (Token)                 │
│  • Toast Notifications                  │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                      │
┌───▼──────┐      ┌────────▼────────┐
│ NavBar   │      │  Page Components│
│          │      │  • LoginPage    │
│ • Logout │      │  • RegisterPage │
│ • Nav    │      │  • Pantry       │
└──────────┘      │  • AddItem      │
                  │  • Cart         │
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │   api.js        │
                  │  • API Client   │
                  │  • Axios Config │
                  │  • Error Handle │
                  └─────────────────┘
```

### Backend Components

```
┌─────────────────────────────────────────┐
│         server.js (Entry Point)         │
│  • Express App Setup                    │
│  • Middleware Configuration              │
│  • Route Registration                   │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                      │
┌───▼──────────┐  ┌────────▼──────────┐
│   Routes      │  │   Middleware      │
│               │  │                   │
│ • userRoutes  │  │ • authenticateToken│
│ • itemRoutes  │  │ • CORS            │
│ • cardRoutes  │  │ • JSON Parser     │
│ • cartRoutes  │  │ • Error Handler  │
└───────┬───────┘  └───────────────────┘
        │
        │
┌───────▼───────────────────────────────┐
│         Prisma Client                 │
│  • Database Queries                    │
│  • Transaction Management              │
│  • Schema Validation                   │
└───────────────────────────────────────┘
```

## 🔄 Data Flow

### User Registration Flow

```
1. User submits registration form
   ↓
2. Frontend: api.js → registerUser()
   ↓
3. HTTP POST /user/register
   ↓
4. Backend: userRoutes.js
   ↓
5. Validation: Zod schema (UserObject)
   ↓
6. Password hashing: bcrypt.hash()
   ↓
7. Database: Prisma.user.create()
   ↓
8. JWT token generation
   ↓
9. Response: { token, message }
   ↓
10. Frontend: Store token in localStorage
   ↓
11. Redirect to Pantry page
```

### Authenticated Request Flow

```
1. User action (e.g., add item)
   ↓
2. Frontend: api.js → addItem()
   ↓
3. HTTP Request with Authorization header
   ↓
4. Backend: authenticateToken middleware
   ↓
5. JWT verification
   ↓
6. Extract userId from token
   ↓
7. Route handler: itemRoutes.js
   ↓
8. Validation: Zod schema
   ↓
9. Database: Prisma.item.create({ userId })
   ↓
10. Response: Success/Error
   ↓
11. Frontend: Update UI / Show toast
```

### Data Relationships Flow

```
User (1) ────< (Many) Items
  │
  ├───< (Many) Cards
  │      └───> (Many) Items
  │
  └───< (Many) Carts
         └───> (Many) Items
```

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌──────────┐
│   User   │
│──────────│
│ id (PK)  │
│ username │
│ email    │◄─── Unique
│ password │     (hashed)
└────┬─────┘
     │
     │ 1:N
     │
     ├──────────────────┬──────────────────┐
     │                  │                  │
     │ 1:N              │ 1:N              │ 1:N
     │                  │                  │
┌────▼────┐      ┌──────▼──────┐    ┌──────▼──────┐
│  Item   │      │    Card     │    │    Cart     │
│─────────│      │─────────────│    │─────────────│
│ id (PK) │      │ id (PK)     │    │ id (PK)     │
│ title   │      │ name        │    │ name        │
│ quantity│      │ userId (FK) │    │ userId (FK) │
│ purchase│      └──────┬──────┘    └──────┬──────┘
│ Quantity│             │                  │
│ type    │             │ 1:N               │ 1:N
│ cardId  │◄────────────┘                  │
│ (FK)    │                                 │
│ userId  │◄───────────────────────────────┘
│ (FK)    │
│ cartId  │◄───────────────────────────────┐
│ (FK)    │                                 │
│ inCart  │                                 │
└─────────┘                                 │
                                             │
                                    ┌────────┘
                                    │
                              ┌─────▼──────┐
                              │    Cart    │
                              │ (referenced)│
                              └────────────┘
```

### Model Details

#### User Model
- **Primary Key**: `id` (auto-increment integer)
- **Unique Constraint**: `email`
- **Relationships**:
  - One-to-Many with `Item`
  - One-to-Many with `Card`
  - One-to-Many with `Cart`

#### Item Model
- **Primary Key**: `id` (auto-increment integer)
- **Foreign Keys**:
  - `userId` → User (required)
  - `cardId` → Card (optional)
  - `cartId` → Cart (optional)
- **Business Logic**:
  - `quantity`: Current quantity in pantry
  - `purchaseQuantity`: Quantity to purchase
  - `inCart`: Boolean flag for cart status

#### Card Model
- **Primary Key**: `id` (auto-increment integer)
- **Foreign Key**: `userId` → User (required)
- **Purpose**: Category/organization for items

#### Cart Model
- **Primary Key**: `id` (auto-increment integer)
- **Foreign Key**: `userId` → User (required)
- **Purpose**: Shopping cart container for items

## 🔌 API Architecture

### RESTful API Design

The API follows REST principles with resource-based URLs:

```
Base URL: http://localhost:3000 (development)
          https://your-backend-url (production)

Resources:
├── /user
│   ├── POST   /register    (Public)
│   └── POST   /login       (Public)
│
├── /items
│   ├── GET    /            (Authenticated)
│   ├── POST   /            (Authenticated)
│   ├── PUT    /:id/quantity (Authenticated)
│   ├── PUT    /:id/purchaseQuantity (Authenticated)
│   ├── PUT    /:id/card    (Authenticated)
│   ├── PUT    /:id/inCart  (Authenticated)
│   └── DELETE /:id         (Authenticated)
│
├── /cards
│   ├── GET    /            (Authenticated)
│   ├── POST   /            (Authenticated)
│   └── DELETE /:id         (Authenticated)
│
└── /cart
    └── GET    /            (Authenticated)
```

### Request/Response Patterns

#### Authentication
- **Request**: `POST /user/login`
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Protected Endpoints
- **Headers Required**:
  ```
  Authorization: Bearer <jwt_token>
  Content-Type: application/json
  ```

### Error Handling

The API uses consistent error responses:

```json
{
  "error": "Error message or code"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## 🔐 Authentication & Authorization

### JWT Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │         │  Server  │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │ 1. POST /login     │                    │
     │    {email, pass}   │                    │
     ├───────────────────>│                    │
     │                    │ 2. Query user       │
     │                    ├────────────────────>│
     │                    │<────────────────────┤
     │                    │ 3. Verify password │
     │                    │    (bcrypt)        │
     │                    │                    │
     │                    │ 4. Generate JWT    │
     │                    │    {userId}         │
     │                    │                    │
     │ 5. Return token    │                    │
     │<───────────────────┤                    │
     │                    │                    │
     │ 6. Store in        │                    │
     │    localStorage    │                    │
     │                    │                    │
     │ 7. Subsequent      │                    │
     │    requests with   │                    │
     │    Authorization:  │                    │
     │    Bearer <token>  │                    │
     ├───────────────────>│                    │
     │                    │ 8. Verify token    │
     │                    │    (jwt.verify)    │
     │                    │                    │
     │                    │ 9. Extract userId  │
     │                    │                    │
     │                    │ 10. Process request│
     │                    │     (with userId)   │
     │                    ├────────────────────>│
     │                    │<────────────────────┤
     │ 11. Response       │                    │
     │<───────────────────┤                    │
```

### Token Structure

JWT Payload:
```json
{
  "userId": 123,
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Security Measures

1. **Password Hashing**: bcrypt with salt rounds (10)
2. **Token Expiration**: Configured in JWT (recommended: 24 hours)
3. **HTTPS**: Enforced in production (Azure Container Apps)
4. **CORS**: Configured for allowed origins
5. **Input Validation**: Zod schemas for all user inputs

## 🚀 Deployment Architecture

### Production Deployment (Azure)

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│              (Source Code Management)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Push to main branch
                     │
┌────────────────────▼────────────────────────────────────┐
│              GitHub Actions (CI/CD)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Frontend Workflow                                 │  │
│  │  1. Checkout code                                  │  │
│  │  2. Azure OIDC login                              │  │
│  │  3. Build Docker image                             │  │
│  │  4. Push to ACR                                    │  │
│  │  5. Update Container App                           │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Backend Workflow                                  │  │
│  │  1. Checkout code                                  │  │
│  │  2. Azure OIDC login                              │  │
│  │  3. Build Docker image                             │  │
│  │  4. Push to ACR                                    │  │
│  │  5. Update Container App                           │  │
│  │  6. Run migrations on startup                      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐   ┌─────────────────┐
│  Azure ACR      │   │  Azure ACR      │
│  (Image Store)  │   │  (Image Store)  │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └───────────┬─────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐   ┌─────────────────┐
│ Container App   │   │ Container App   │
│ (Frontend)      │   │ (Backend)       │
│ • Nginx         │   │ • Node.js       │
│ • Static Files  │   │ • Express API    │
│ • Port 80       │   │ • Port 3000     │
└────────┬────────┘   └────────┬────────┘
         │                     │
         │  HTTP/REST API       │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  Azure Database for  │
         │  PostgreSQL          │
         │  • Managed Service   │
         │  • Automated Backups  │
         │  • High Availability │
         └─────────────────────┘
```

### Container Architecture

#### Frontend Container
- **Base Image**: `nginx:alpine`
- **Build Stage**: `node:22-slim` (build React app)
- **Port**: 80
- **Volumes**: Static files from build stage
- **Environment**: `VITE_API_BASE_URL`

#### Backend Container
- **Base Image**: `node:22-slim`
- **Port**: 3000
- **Environment Variables**:
  - `DATABASE_URL`
  - `PORT`
  - `SECRET_KEY`
- **Startup Command**: Runs Prisma migrations, then starts server

### Local Development Architecture

```
┌─────────────────────────────────────────┐
│         Docker Compose                  │
│  ┌──────────────────────────────────┐  │
│  │  Frontend Container               │  │
│  │  • React Dev Server (Vite)        │  │
│  │  • Port 80                        │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Backend Container                │  │
│  │  • Node.js + Express             │  │
│  │  • Port 3000                      │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Database Container               │  │
│  │  • PostgreSQL 15                  │  │
│  │  • Port 5432                      │  │
│  │  • Persistent Volume              │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🔄 CI/CD Pipeline

### Continuous Integration

1. **Code Push**: Developer pushes to `main` branch
2. **Workflow Trigger**: GitHub Actions detects push
3. **Build**: Docker images built from Dockerfiles
4. **Test**: (Future: Add automated tests)
5. **Push**: Images pushed to Azure Container Registry

### Continuous Deployment

1. **Image Update**: Container App updated with new image
2. **Health Check**: Azure monitors container health
3. **Rollback**: Automatic rollback on failure
4. **Scaling**: Auto-scaling based on traffic

### Workflow Files

- `.github/workflows/pantryapp-frontend-AutoDeployTrigger-*.yml`
- `.github/workflows/pantryapp-backend-AutoDeployTrigger-*.yml`

## 🛠 Technology Stack

### Frontend Stack
- **React 19**: UI library with hooks
- **Vite**: Fast build tool and dev server
- **React Router DOM 7**: Client-side routing
- **Axios**: HTTP client for API calls
- **Bootstrap 5**: CSS framework
- **React Toastify**: Toast notifications

### Backend Stack
- **Node.js 22**: JavaScript runtime
- **Express.js 4**: Web framework
- **Prisma 6**: ORM and database toolkit
- **PostgreSQL 15**: Relational database
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Zod**: Schema validation

### DevOps Stack
- **Docker**: Containerization
- **Docker Compose**: Local orchestration
- **Azure Container Apps**: Production hosting
- **Azure Container Registry**: Image storage
- **GitHub Actions**: CI/CD automation

## 🔒 Security Architecture

### Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Network Security              │
│  • HTTPS/TLS Encryption                 │
│  • CORS Configuration                   │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Layer 2: Authentication                │
│  • JWT Token Validation                  │
│  • Token Expiration                      │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Layer 3: Authorization                  │
│  • User-based Data Isolation            │
│  • Resource Ownership Validation         │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Layer 4: Input Validation              │
│  • Zod Schema Validation                │
│  • SQL Injection Prevention (Prisma)    │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Layer 5: Data Protection                │
│  • Password Hashing (bcrypt)            │
│  • Environment Variables                │
│  • Secure Secrets Management            │
└─────────────────────────────────────────┘
```

### Security Best Practices

1. **Password Security**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Never stored in plain text
   - Minimum complexity requirements (recommended)

2. **Token Security**
   - JWT tokens signed with secret key
   - Tokens stored in localStorage (consider httpOnly cookies for production)
   - Token expiration enforced

3. **Data Isolation**
   - All queries filtered by `userId`
   - Users can only access their own data
   - Foreign key constraints enforce data integrity

4. **Input Validation**
   - All user inputs validated with Zod schemas
   - Type checking and sanitization
   - Error messages don't expose system details

5. **Database Security**
   - Connection strings in environment variables
   - Prisma prevents SQL injection
   - Database credentials not in code

## 📊 Scalability Considerations

### Current Architecture
- Stateless backend (horizontal scaling ready)
- Container-based deployment (easy scaling)
- Database connection pooling (Prisma)

### Future Scalability Options
- **Caching**: Redis for session/token caching
- **CDN**: For static frontend assets
- **Load Balancing**: Azure Load Balancer
- **Database Replication**: Read replicas for read-heavy operations
- **Microservices**: Split into smaller services if needed

---

**Last Updated**: 2024
**Version**: 1.0.0
