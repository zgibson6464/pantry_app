# Environment Setup Guide

This guide explains how to set up environment variables for the Pantry App.

## Local Development Setup

### 1. Create a `.env` file

Create a `.env` file in the project root directory with the following content:

```bash
# JWT Secret Key - REQUIRED
# Generate a strong random string
# On Linux/Mac: openssl rand -base64 32
# On Windows: use PowerShell: [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
SECRET_KEY=your-generated-secret-key-here

# Database Configuration (Optional - defaults shown for local dev)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=pantry

# Database URL (Optional - auto-constructed if not set)
# DATABASE_URL=postgres://postgres:postgres@db:5432/pantry

# Backend Port (Optional - defaults to 3000)
# PORT=3000
```

### 2. Generate a Secure Secret Key

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Or use an online generator:**
- Use a secure random string generator (at least 32 characters)

### 3. Important Notes

- The `.env` file is already in `.gitignore` and will NOT be committed to git
- Never commit your actual `.env` file
- Use different `SECRET_KEY` values for development and production
- The database credentials shown are defaults for local development only

## GitHub Actions Setup

For CI/CD to work, you need to add the following secrets in your GitHub repository:

### Go to: Repository Settings → Secrets and variables → Actions

Add these secrets:

#### Frontend Secrets:
- `PANTRYAPPFRONTEND_REGISTRY_URL` - Your Azure Container Registry URL 
- `PANTRYAPPFRONTEND_APP_NAME` - Your frontend container app name 
- `PANTRYAPPFRONTEND_RESOURCE_GROUP` - Your Azure resource group name 

#### Backend Secrets:
- `PANTRYAPPBACKEND_REGISTRY_URL` - Your Azure Container Registry URL (same as frontend)
- `PANTRYAPPBACKEND_APP_NAME` - Your backend container app name (e.g., `pantryapp-backend`)
- `PANTRYAPPBACKEND_RESOURCE_GROUP` - Your Azure resource group name (same as frontend)

#### Existing Secrets (Already Configured):
- `PANTRYAPPFRONTEND_AZURE_CLIENT_ID`
- `PANTRYAPPFRONTEND_AZURE_TENANT_ID`
- `PANTRYAPPFRONTEND_AZURE_SUBSCRIPTION_ID`
- `PANTRYAPPFRONTEND_REGISTRY_USERNAME`
- `PANTRYAPPFRONTEND_REGISTRY_PASSWORD`
- `PANTRYAPPBACKEND_AZURE_CLIENT_ID`
- `PANTRYAPPBACKEND_AZURE_TENANT_ID`
- `PANTRYAPPBACKEND_AZURE_SUBSCRIPTION_ID`
- `PANTRYAPPBACKEND_REGISTRY_USERNAME`
- `PANTRYAPPBACKEND_REGISTRY_PASSWORD`

## Production Deployment

For production (Azure Container Apps), set these environment variables in the Azure Portal:

### Backend Container App:
- `DATABASE_URL` - Your production PostgreSQL connection string
- `PORT` - 3000
- `SECRET_KEY` - Your production JWT secret key (different from development)

### Frontend Container App:
- `VITE_API_BASE_URL` - Your production backend API URL

## Security Reminders

1. ✅ Never commit `.env` files
2. ✅ Use strong, unique `SECRET_KEY` values
3. ✅ Rotate secrets regularly in production
4. ✅ Use different secrets for dev/staging/production
5. ✅ Keep GitHub Secrets updated
