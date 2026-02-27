# Quick Start Guide for Docker PostgreSQL Setup

## Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ installed

## Getting Started

### 1. Start PostgreSQL and pgAdmin with Docker

```bash
npm run docker:up
```

This will start:
- **PostgreSQL** on `localhost:5432`
- **pgAdmin** (optional) on `http://localhost:5050`

### 2. Configure Environment Variables

For Docker setup, use `.env.docker`:
```bash
# Copy docker config to .env or create a new one
cp .env.docker .env
```

Or update your `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=prueba_tecnica
NODE_ENV=development
PORT=3000
```

### 3. Update Database Configuration

Edit `src/config/database.ts` to use environment variables:

```typescript
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'prueba_tecnica',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dialect: 'postgres',
  // ... rest of config
});
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

Your API will be available at `http://localhost:3000`

## Docker Commands

```bash
# Start containers
npm run docker:up

# Stop containers
npm run docker:down

# View logs
npm run docker:logs

# Reset database (remove volumes and recreate)
npm run docker:reset

# Access PostgreSQL directly
docker exec -it prueba_tecnica_postgres psql -U postgres -d prueba_tecnica

# Access pgAdmin
# Go to http://localhost:5050
# Username: admin@example.com
# Password: admin
```

## Database Management

### Using pgAdmin (Web UI)

1. Go to `http://localhost:5050`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin`
3. Add new server:
   - General → Name: `prueba_tecnica`
   - Connection → Hostname: `postgres`
   - Connection → Port: `5432`
   - Connection → Username: `postgres`
   - Connection → Password: `postgres`

### Direct PostgreSQL Access

```bash
# Connect to database
docker exec -it prueba_tecnica_postgres psql -U postgres -d prueba_tecnica

# Common commands
\dt                    # List tables
\d table_name         # Describe table
SELECT * FROM tiendas; # Query data
\q                     # Quit
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml or docker.env
# Default: 5432 for PostgreSQL, 5050 for pgAdmin

# Or find and stop the conflicting service
lsof -i :5432
kill -9 <PID>
```

### Database Won't Connect
```bash
# Check if containers are running
docker-compose ps

# View logs
docker-compose logs postgres

# Recreate containers
npm run docker:reset
```

### Reset Everything
```bash
# Remove all containers and volumes
docker-compose down -v

# Start fresh
npm run docker:up
```

## Volume Data Persistence

Database data is stored in Docker volumes:
- `prueba_tecnica_postgres: postgres_data`
- `prueba_tecnica_pgadmin: pgadmin_data`

Data persists even after containers stop. To delete data:
```bash
npm run docker:reset
```



## Database Initialization

The database schema is automatically created from `scripts/init.sql` when the PostgreSQL container starts.

To modify the schema:
1. Edit `scripts/init.sql`
2. Run `npm run docker:reset` to recreate the database

