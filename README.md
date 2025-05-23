# 🌐 Full-Stack Web Application with Docker, Nginx, React, Express, and MySQL

This project is a full-stack web application containerized using Docker and orchestrated with Docker Compose. It includes:

- A **React** frontend (built with Vite)
- An **Express.js** backend (Node.js)
- A **MySQL** database
- A **Nginx** reverse proxy

All services are dockerized and wired together using `docker-compose`.

---

## 🧱 Tech Stack

- **Frontend**: React + Vite  
- **Backend**: Express.js (Node.js)  
- **Database**: MySQL  
- **Proxy Server**: Nginx  
- **Containerization**: Docker  
- **Orchestration**: Docker Compose  

---

## 📁 Project Structure

```
.
├── server/              # Express server code
│   └── ...
├── client/             # React client app (Vite)
│   └── ...
├── nginx/                # Nginx reverse proxy config
│   └── default.conf
├── docker-compose.yml    # Docker Compose configuration
└── README.md
```

---
## 📁 Usage

Create a .env file in root of and add ENVIRONMENT=production  or ENVIRONMENT=development based on working mode

cd into parent folder cd docker-mern-app

./docker-compose.sh 

Done app will started initializing React,Sql,Express,Nginx will be served on current ip addess (Port 80)

## ⚙️ Features

- Containerized frontend, backend, and database using Docker
- Reverse proxy via Nginx to expose the app on a single public IP
- Seamless communication between frontend and backend via Axios
- Persistent MySQL storage with named Docker volumes
- Automatic container startup with `depends_on`
- Hot reloading support for React (via Vite)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Configure Environment Variables

Create a `.env` file in the root (or define inline in `docker-compose.yml`):

```env
MYSQL_ROOT_PASSWORD=yourpassword
MYSQL_DATABASE=mydb
MYSQL_USER=user
MYSQL_PASSWORD=pass
```

---

### 3. Start All Services

```bash
docker-compose up --build
```

---

### 🧭 Access the Application

- **Frontend (React)**: http://<your-public-ip>:80  
- **Backend API (Express)**: http://<your-public-ip>/api  
- **MySQL**: Internally on port 3306

---

## 🌐 Nginx Configuration

Sample `default.conf`:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://react-client:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://express-server:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📦 Docker Compose Overview

```yaml
services:
  mysql-server:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: yourpassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: pass
    volumes:
      - db-data:/var/lib/mysql

  express-server:
    build: ./backend
    depends_on:
      - mysql-server

  react-client:
    build: ./frontend
    ports:
      - "5173:5173"

  nginx-proxy:
    image: nginx:latest
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "80:80"

volumes:
  db-data:
```

---

## 🐛 Troubleshooting

- **MySQL connection timeout**: Ensure retry logic in Express or wait for DB readiness.
- **React fetch errors**: Check Axios base URLs and CORS settings.
- **Nginx not routing properly**: Verify container names and `default.conf`.

---

## 📦 Production Tips

- Use managed MySQL (e.g., AWS RDS) for scalability.
- Use a static IP or DNS provider (Cloudflare/Freenom).
- Secure with HTTPS using Let's Encrypt or Cloudflare SSL.

---

## 📬 License

MIT — feel free to use, modify, and distribute.
