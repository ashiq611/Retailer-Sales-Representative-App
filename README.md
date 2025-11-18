# Retailer Sales Representative Backend

Backend system for managing Sales Representatives (SRs), Retailers, Master Data, and Admin operations with high performance, search, filtering, and caching.

This project is built using **Express.js**, **Prisma ORM**, **PostgreSQL**, **Redis**, and **Docker**.

---

# 🚀 Features

### 🔐 Auth
- JWT authentication (Admin + Sales Reps)
- Password hashing with bcrypt

### 🧍 Sales Rep Portal
- View assigned retailers (70 per SR)
- Pagination + search + filters
- Retailer details
- Update retailer allowed fields (points, routes, notes)

### 🛠 Admin Portal
- CRUD: Regions, Areas, Distributors, Territories
- Bulk retailer assignment/unassignment to SRs
- CSV bulk import retailers
- Auto-create master data from CSV

### ⚡ Performance
- Redis caching for:
  - Retailer list per SR
  - Retailer detail
- Optimized Prisma queries
- Indexed DB columns

---

# 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Cache | Redis |
| Auth | JWT |
| File Upload | Multer |
| Containerization | Docker + Docker Compose |

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repo
```bash
git clone https://github.com/ashiq611/Retailer-Sales-Representative-App.git
cd backend
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Create .env
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/retailer_app?schema=public
JWT_SECRET=super_secret_key
REDIS_URL=redis://redis:6379
PORT=3000
```
## 🐳 Docker Setup

Start containers:
```bash
docker-compose up -d
```
Run Prisma migrations inside container:
```bash
docker-compose exec api npx prisma migrate dev --name init
```

Seed Database:
```bash
docker-compose exec api node prisma/seed.js
```

## 📡 Running the Server
```bash
npm run dev
```

## 📚 API Documentation (Overview)

## 🔐 AUTH APIs

| Method | Endpoint     | Description          |
|--------|--------------|----------------------|
| POST   | /auth/login  | Login (Admin + SR)   |

---

## 🧍‍♂️ SALES REP APIs

| Method | Endpoint            | Description                                      |
|--------|----------------------|--------------------------------------------------|
| GET    | /retailers           | List assigned retailers (pagination + filtering) |
| GET    | /retailers/:uid      | Retailer details                                 |
| PATCH  | /retailers/:uid      | Update points, routes, notes                     |

---

## 🛠 ADMIN APIs — Master Data CRUD

### Regions
| Method | Endpoint               |
|--------|------------------------|
| GET    | /admin/regions         |
| POST   | /admin/regions         |
| PATCH  | /admin/regions/:id     |
| DELETE | /admin/regions/:id     |

### Areas
| Method | Endpoint               |
|--------|------------------------|
| GET    | /admin/areas           |
| POST   | /admin/areas           |
| PATCH  | /admin/areas/:id       |
| DELETE | /admin/areas/:id       |

### Distributors
| Method | Endpoint                   |
|--------|----------------------------|
| GET    | /admin/distributors        |
| POST   | /admin/distributors        |
| PATCH  | /admin/distributors/:id    |
| DELETE | /admin/distributors/:id    |

### Territories
| Method | Endpoint               |
|--------|------------------------|
| GET    | /admin/territories     |
| POST   | /admin/territories     |
| PATCH  | /admin/territories/:id |
| DELETE | /admin/territories/:id |

---

## 🔁 Bulk Assignment APIs

| Method | Endpoint                        | Description                  |
|--------|----------------------------------|------------------------------|
| POST   | /admin/assignments/bulk         | Assign retailers to SR       |
| POST   | /admin/assignments/unassign-bulk | Remove retailers from SR     |

---

## 📥 CSV Import API

| Method | Endpoint                | Description        |
|--------|--------------------------|--------------------|
| POST   | /admin/retailers/import | Upload CSV file    |


## 📥 Postman Collection
Import this JSON file inside Postman:
#Link: https://documenter.getpostman.com/view/33549775/2sB3WwrJAZ



