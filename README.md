# Pantry App

A full-stack web application for managing your pantry inventory, organizing items into categories, and creating shopping lists. Built with React and Node.js, containerized with Docker for easy deployment.

## 🌐 Live Demo

**Try the application live:** [https://pantryapp-frontend.grayocean-4e308962.westus2.azurecontainerapps.io](https://pantryapp-frontend.grayocean-4e308962.westus2.azurecontainerapps.io)

The application is deployed on Azure Container Apps and is ready to use. Register a new account to get started!

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Docker Commands](#docker-commands)
- [Troubleshooting](#troubleshooting)
- [Deployment](#-deployment)
- [Security](#-security)
- [Roadmap](#️-roadmap)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Pantry Management**: Add, update, and delete pantry items with quantities
- **Category Organization**: Organize items into custom cards/categories
- **Shopping Cart**: Create and manage shopping lists
- **Quantity Tracking**: Track current quantities and purchase quantities
- **Responsive UI**: Modern, responsive interface built with React and Bootstrap

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **React Toastify** - Toast notifications
- **Nginx** - Web server (production)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Schema validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🏗 Architecture

The application follows a three-tier architecture:

```
┌─────────────┐
│   Frontend  │  React SPA (Port 80)
│   (Nginx)   │
└──────┬──────┘
       │
       │ HTTP/REST API
       │
┌──────▼──────┐
│   Backend   │  Express.js API (Port 3000)
│   (Node.js) │
└──────┬──────┘
       │
       │ Prisma ORM
       │
┌──────▼──────┐
│  PostgreSQL │  Database (Port 5432)
│   Database  │
└─────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) or [Docker Engine](https://docs.docker.com/engine/install/) (Linux)
- [Git](https://git-scm.com/downloads)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pantry_app
   ```

2. **Start the application with Docker Compose**
   ```bash
   docker compose up --build -d
   ```

   This command will:
   - Build the PostgreSQL database container
   - Run database migrations automatically
   - Build and start the backend API server on `http://localhost:3000`
   - Build and serve the React frontend with Nginx on `http://localhost:80`

3. **Access the application**
   - Open your web browser and navigate to: `http://localhost:80`
   - Register a new account or log in with existing credentials

## 💻 Usage

### First Time Setup

1. Navigate to `http://localhost:80` in your browser
2. Click "Register" to create a new account
3. Fill in your username, email, and password
4. You'll be automatically logged in after registration

### Managing Your Pantry

- **Add Items**: Click "Add Item" to add new pantry items with quantity and type
- **Organize with Cards**: Create category cards to organize your items
- **Update Quantities**: Adjust item quantities as you use them
- **Shopping Cart**: Add items to your cart and track purchase quantities
- **Delete Items**: Remove items or cards you no longer need

## 📁 Project Structure

```
pantry_app/
├── pantry_app_client/          # Frontend React application
│   ├── src/
│   │   ├── pages/              # React components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Pantry.jsx
│   │   │   ├── AddItem.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── NavBar.jsx
│   │   ├── api.js              # API client functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── pantry_app_server/          # Backend Express API
│   ├── routes/                 # API route handlers
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cardRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── authenticateToken.js
│   │   └── errorMessages.js
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   ├── server.js               # Express server entry point
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Docker orchestration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /user/register` - Register a new user
- `POST /user/login` - Login and receive JWT token

### Items
- `GET /items` - Get all items for authenticated user
- `POST /items` - Create a new item
- `PUT /items/:id/quantity` - Update item quantity
- `PUT /items/:id/purchaseQuantity` - Update purchase quantity
- `PUT /items/:id/card` - Assign item to a card
- `PUT /items/:id/inCart` - Toggle item in cart status
- `DELETE /items/:id` - Delete an item

### Cards
- `GET /cards` - Get all cards for authenticated user
- `POST /cards` - Create a new card
- `DELETE /cards/:id` - Delete a card

### Cart
- `GET /cart` - Get all cart items for authenticated user

**Note**: All endpoints (except register/login) require JWT authentication via `Authorization: Bearer <token>` header.

## 🔐 Environment Variables

The application uses the following environment variables (configured in `docker-compose.yml`):

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)
- `SECRET_KEY` - JWT secret key for token signing

### Frontend
- `VITE_API_BASE_URL` - Backend API base URL

### Database
- `POSTGRES_USER` - Database user (default: postgres)
- `POSTGRES_PASSWORD` - Database password (default: postgres)
- `POSTGRES_DB` - Database name (default: pantry)

## 🔧 Development

### Running Services Individually

If you prefer to run services without Docker:

#### Backend
```bash
cd pantry_app_server
npm install
npm run devStart  # Uses nodemon for auto-reload
```

#### Frontend
```bash
cd pantry_app_client
npm install
npm run dev  # Starts Vite dev server
```

### Database Migrations

Migrations are automatically run when the Docker container starts. To run manually:

```bash
cd pantry_app_server
npx prisma migrate dev
```

### Prisma Studio (Database GUI)

To view and edit your database:

```bash
cd pantry_app_server
npx prisma studio
```

## 🐳 Docker Commands

### Start Services
```bash
docker compose up -d
```

### Stop Services
```bash
docker compose down
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Rebuild After Changes
```bash
docker compose up --build -d
```

### Remove All Containers and Volumes
```bash
docker compose down -v
```

## 🐛 Troubleshooting

### Port Already in Use
If ports 80, 3000, or 5432 are already in use:
- Stop the conflicting service, or
- Modify port mappings in `docker-compose.yml`

### Database Connection Issues
- Ensure the database container is healthy: `docker compose ps`
- Check database logs: `docker compose logs db`
- Verify `DATABASE_URL` in `docker-compose.yml`

### Frontend Not Loading
- Check if backend is running: `docker compose logs backend`
- Verify API URL in frontend environment variables
- Clear browser cache and try again

### Authentication Issues
- Ensure JWT token is stored in localStorage
- Check backend logs for authentication errors
- Verify `SECRET_KEY` is set in environment

## 🚀 Deployment

The application is deployed on **Azure** using a modern containerized architecture with automated CI/CD pipelines.

### Azure Services Used

- **Azure Container Apps** - Hosts both frontend and backend containers
- **Azure Container Registry (ACR)** - Stores Docker images
- **Azure Database for PostgreSQL** - Managed PostgreSQL database (or similar)
- **GitHub Actions** - CI/CD pipeline for automated deployments

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│              (Push to main branch)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions Workflows                    │
│  • Build Docker images                                   │
│  • Push to Azure Container Registry                      │
│  • Deploy to Azure Container Apps                        │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐   ┌─────────────────┐
│  Azure ACR      │   │  Azure ACR      │
│  (Frontend)     │   │  (Backend)      │
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
│ Port 80         │   │ Port 3000       │
└────────┬────────┘   └────────┬────────┘
         │                     │
         │  HTTP/REST API       │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  Azure Database for │
         │  PostgreSQL         │
         └─────────────────────┘
```

### CI/CD Pipeline

The application uses **GitHub Actions** for continuous integration and deployment:

#### Frontend Deployment
- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Workflow**: `.github/workflows/pantryapp-frontend-AutoDeployTrigger-*.yml`
- **Process**:
  1. Authenticates with Azure using OIDC
  2. Builds Docker image from `pantry_app_client/Dockerfile`
  3. Pushes image to Azure Container Registry
  4. Updates Azure Container App with new image

#### Backend Deployment
- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Workflow**: `.github/workflows/pantryapp-backend-AutoDeployTrigger-*.yml`
- **Process**:
  1. Authenticates with Azure using OIDC
  2. Builds Docker image from `pantry_app_server/Dockerfile`
  3. Runs Prisma migrations automatically on container startup
  4. Pushes image to Azure Container Registry
  5. Updates Azure Container App with new image

### Deployment Configuration

#### Resource Group
- **Name**: `your-resource-group-name` (configure in Azure)
- **Region**: `your-preferred-region` (e.g., East US, West Europe)

#### Container Apps
- **Frontend**: `your-frontend-app-name` (configure in Azure)
- **Backend**: `your-backend-app-name` (configure in Azure)

#### Container Registry
- **Registry**: `your-registry-name.azurecr.io` (configure in Azure)

### Environment Variables (Production)

The following environment variables are configured in Azure Container Apps:

#### Backend Container App
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (3000)
- `SECRET_KEY` - JWT secret key for token signing

#### Frontend Container App
- `VITE_API_BASE_URL` - Backend API URL

### Manual Deployment

If you need to manually deploy:

```bash
# Login to Azure
az login

# Login to ACR (replace with your registry name)
az acr login --name your-registry-name

# Build and push frontend (replace with your registry and app names)
docker build -f pantry_app_client/Dockerfile -t your-registry-name.azurecr.io/your-frontend-app:latest ./pantry_app_client
docker push your-registry-name.azurecr.io/your-frontend-app:latest

# Build and push backend (replace with your registry and app names)
docker build -f pantry_app_server/Dockerfile -t your-registry-name.azurecr.io/your-backend-app:latest ./pantry_app_server
docker push your-registry-name.azurecr.io/your-backend-app:latest

# Update container apps (replace with your resource group and app names)
az containerapp update --name your-frontend-app --resource-group your-resource-group --image your-registry-name.azurecr.io/your-frontend-app:latest
az containerapp update --name your-backend-app --resource-group your-resource-group --image your-registry-name.azurecr.io/your-backend-app:latest
```

### Monitoring and Logs

View application logs in Azure Portal:
- Navigate to your Container App in Azure Portal
- Go to **Log stream** or **Logs** section
- Monitor real-time logs and errors

Or use Azure CLI:
```bash
# View frontend logs (replace with your app and resource group names)
az containerapp logs show --name your-frontend-app --resource-group your-resource-group --follow

# View backend logs (replace with your app and resource group names)
az containerapp logs show --name your-backend-app --resource-group your-resource-group --follow
```

### Scaling

Azure Container Apps automatically scales based on:
- HTTP traffic
- CPU/Memory usage
- Custom scaling rules

Configure scaling in Azure Portal under your Container App's **Scale** settings.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔒 Security

### Security Features
- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schema validation for request data
- **CORS**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

### Security Best Practices
- Never commit `.env` files or secrets to version control
- Use strong, unique `SECRET_KEY` for JWT signing in production
- Keep dependencies updated to patch security vulnerabilities
- Use HTTPS in production (configured via Azure Container Apps)
- Regularly rotate JWT secret keys
- Implement rate limiting for production deployments (recommended)

### Reporting Security Issues
If you discover a security vulnerability, please email the maintainer directly instead of opening a public issue.

## 🗺️ Roadmap

Potential future enhancements:
- [ ] Email notifications for low inventory
- [ ] Barcode scanning for items
- [ ] Recipe suggestions based on available items
- [ ] Expiration date tracking
- [ ] Multi-user household support
- [ ] Mobile app (React Native)
- [ ] Export/import pantry data
- [ ] Analytics and insights dashboard

---

**Built with ❤️ using React, Node.js, and Docker**
