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
flowchart TB
    %% Client Layer
    subgraph Client["Client Layer"]
        A[User Browser / React SPA]
    end

    %% Static Hosting
    subgraph Hosting["Static Hosting"]
        B[Vercel / CDN]
    end

    %% API Server
    subgraph API["API Layer"]
        C[SmartBrain Server<br/>Node.js + Express]
    end

    %% Middleware
    subgraph Middleware["Middleware Pipeline"]
        direction LR
        D[Validation<br/>Yup]
        E[Authentication<br/>JWT Verify]
        D --> E
    end

    %% Business Logic
    subgraph Backend["Application Layer"]
        F[Controllers /<br/>Business Logic]
    end

    %% External Services & Data
    subgraph Services["External Services"]
        H[Clarifai API<br/>AI Inference]
    end

    subgraph Data["Data Layer"]
        G[Prisma ORM]
        J[(PostgreSQL<br/>Database)]
    end

    %% Connections
    A -->|HTTPS| B
    B -->|API Calls| C
    C --> Middleware
    Middleware --> F
    F --> G
    F --> H
    G <--> J
    H -->|AI Results| F
    F -->|JSON Response| C
    C -->|Response| B
    B -->|Data| A
```

## 🎬 Demo Video

https://github.com/user-attachments/assets/76b3c722-1c09-4a5a-82b3-e553a056467c
