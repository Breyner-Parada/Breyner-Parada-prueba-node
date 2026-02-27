# Technical Test API

Express.js API with TypeScript, Sequelize ORM, and PostgreSQL database integration.

## Features

- ✓ Express.js server with TypeScript
- ✓ Sequelize ORM for database management
- ✓ Local PostgreSQL with Docker
- ✓ Environment configuration with dotenv
- ✓ Development and production modes
- ✓ Docker & Docker Compose setup included

## Prerequisites

- Node.js 18+
- npm or npm
- Docker & Docker Compose (for local PostgreSQL)

## Environment Configuration

## ENV

# Configuración de la base de datos
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=prueba_tecnica

# Configuración del servidor
NODE_ENV=development
PORT=3000

# Configuración de pgAdmin
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
PGADMIN_PORT=5050



### Using Docker (Recommended for Development)

Si no tiene instalado Docker, por favor descargarlo, instalarlo y correr Docker Desktop. Una vez instalado y corriendo, corroborar con el siguiente comando

    docker --version 

## Inicio Rapido

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL with Docker
npm run docker:up

# 3. Start development server
npm run dev
```

Server will run at `http://localhost:3000`
Database management UI at `http://localhost:5050` (pgAdmin)



### 5. Test the API

```bash
# Health check
curl http://localhost:3000/api/health
```

## Database Management

### Using pgAdmin Web UI

1. Go to `http://localhost:5050`
2. Login with: `admin@example.com` / `admin`
3. Add PostgreSQL server:
   - Hostname: `postgres`
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`


## API Routes

   ### Endpoints disponibles

   #### Get Products with Stock
   ```
   GET /api/productos-con-stock
   ```
   Returns a list of products with available stock in stores.

   #### Get Best-Selling Products
   ```
   GET /api/productos-mas-vendidos
   ```
   Returns products ranked by sales volume.

   #### Get Categories with Available Products
   ```
   GET /api/categorias-con-productos
   ```
   Returns product categories with available items.

   #### Get Active Promotions by Day
   ```
   GET /api/promociones-por-dia?dia=3
   ```
   Returns active promotions for a specific day of the week (1-7).


## MIGRACIONES 

Si por alguna razon los endpoints no devuelven alguna información y la base de datos esta vacía, se pueden correr las migraciones para popular la base de datos

Ejecutar el siguiente comando para popular la información en la base de datos

```bash
npm run db:seed

```


