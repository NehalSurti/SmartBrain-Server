<h1 align="center">SmartBrain - Face Detection App</h1>

<p align="center">A face recognition web application that leverages the Clarifai Face Detection API to identify and highlight face in an image submitted via URL.</p>

## ✨ Features

- User registration and secure sign-in (bcrypt + JWT)
- Token verification and protected routes (middleware)
- Image analysis using Clarifai API
- Prisma ORM for data modeling and migrations
- Vercel deployment

## 🧰 Tech Stack

| Layer      | Technology                       | Purpose                                               |
| ---------- | -------------------------------- | ----------------------------------------------------- |
| Frontend   | React (build served in `build/`) | Single-page app assets (static files present in repo) |
| Backend    | Node.js + Express                | REST API and server logic                             |
| API / AI   | Clarifai (clarifai-nodejs-grpc)  | Image recognition service integration                 |
| Auth       | JSON Web Tokens + bcrypt         | Authentication and password hashing                   |
| Database   | Prisma + PostgreSQL              | ORM and migrations                                    |
| Dev        | Nodemon, dotenv, yup             | Local dev, env management & validation                |
| Deployment | Vercel                           | Deploy backend and link environment variables         |

## 🏗️ Architecture Overview

```mermaid
flowchart LR
	A[User Browser / SPA] -->|HTTP| B[Vercel / Static Frontend]
	B -->|API Requests| C[Server (Express API)]
	C --> D[Middleware: verifyToken]
	C --> E[Prisma Client]
	E --> F[(Database)]
	C --> G[Clarifai API]
	style A fill:#f9f,stroke:#333,stroke-width:1px
	style C fill:#bbf,stroke:#333
```

## 🎬 Demo Video

https://github.com/user-attachments/assets/76b3c722-1c09-4a5a-82b3-e553a056467c
