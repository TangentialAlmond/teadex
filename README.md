<h1 align="center"> 🌱 TeaDex 🌱</h1>

![License](https://img.shields.io/badge/license-AGPL-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue)
![Stack](https://img.shields.io/badge/stack-MERN-red)
![Style](https://img.shields.io/badge/code%20style-no--semis-orange)
[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

The TeaDex is a "Pokedex" for tea that aims to catalog information on tea through community contributions of photos and their knowledge on the cultivation and processing workflow.

Tea session count: 17 🍵

> ## ⚠️ Defunct TeaDex v1
> The first version of TeaDex was made publicly accessible via Render from early January 2026. A bug has appeared in TeaDex v1 which I first noticed in April 2026. As I'm overhauling the tech stack for TeaDex in the second version, I will not be addressing this bug. TeaDex v1 is, thus, no longer publicly accessible. Stay tuned for updates when TeaDex v2 is up!

## 📋 Table of Contents
- [📋 Table of Contents](#-table-of-contents)
- [🌟 Project Overview](#-project-overview)
- [🔮 Preview](#-preview)
- [💻 Tech Stack](#-tech-stack)
- [🗂️ Project Structure](#️-project-structure)
- [📜 Coding style](#-coding-style)
- [🛠️ Getting Started](#️-getting-started)
- [📍 Roadmap](#-roadmap)

## 🌟 Project Overview
TeaDex is a visual database designed for tea enthusiasts and researchers. It focuses on the aesthetic and technical details of dry tea leaves.

The project features a split-client architecture:
* **Admin Client:** A CRUD application for managing, suggesting, and editing tea entries.
* **Public Client:** A read-only gallery for users.
* **Shared:** A core directory for components and logic used by both clients to maintain DRY principles.

## 🔮 Preview
Currently, only the public-client is live at https://teadex.onrender.com/. Here's a sneak peek of the early version of the admin-client with the minimum CRUD application features.

<div align="center">
  <video src="https://github.com/user-attachments/assets/6306a481-1079-42a9-b658-7008a904324a" width="80%" muted autoplay loop>
    Your browser does not support the video tag.
  </video>
</div>

## 💻 Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, DaisyUI
* **Backend:** Node.js, Express
* **Database:** MongoDB (via Mongoose ODM), AWS S3
* **State Management:** Custom React Hooks
* **API Client:** Axios

## 🗂️ Project Structure

```text
├── backend/
│   ├── scripts/         # One-off maintenance & migration scripts
│   └── src/             # Core application logic
│       ├── config/      # DB, AWS-S3, and Rate Limiter configurations
│       ├── controllers/ # Request handling logic
│       ├── middleware/  # Custom middleware (Rate limiting)
│       ├── models/      # Mongoose schemas and logic
│       ├── routes/      # API route definitions
│       ├── services/    # External integrations (e.g., S3 Service)
│       ├── tests/       # Unit and integration tests
│       ├── utils/       # Server-side helper functions
│       └── server.js    # Entry point for the Express app
└── client/
    ├── admin-client/    # CRUD application (Vite + Tailwind)
    ├── public-client/   # Read-only gallery (Vite + Tailwind)
    └── shared/          # UI components and utils used by both clients
```

## 📜 Coding style
To ensure maintainability, this project follows a style guide:
- **Indentation:**
  - JSX/Components: 2 tabs
  - JS/Logic: 4 tabs
- **Formatting:**
  - No semicolons at line endings.
  - Max line length of 80 characters.
- **Practices:**
  - Use functional components and custom hooks.
  - State must be sanitized via `loadEntryData` to handle database `null` values.

## 🛠️ Getting Started
**Prerequisites**
- Node.js (v18+)
- MongoDB (Local or Atlas)
- AWS S3 bucket

**Installation**
1. Clone the repository:
    ```bash
    git clone https://github.com/TangentialAlmond/teadex
    cd teadex
    ```
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend && npm install

   # Install admin-client dependencies
   cd ../client/admin-client && npm install

   # Install public-client dependencies
   cd ../public-client && npm install 
   ```
3. Create a `.env` file under the `/backend`:
   ```text
   NODE_ENV=development

   MONGO_URI=<your_mongo_uri>
   PORT=<your_port>

   UPSTASH_REDIS_REST_URL=<your_resid_rest_url>
   UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>

   AWS_BUCKET_NAME=<your_aws_bucket_name>
   AWS_REGION=<your_region>
   AWS_ACCESS_KEY_ID=<your_aws_access_key>
   AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
   ```
4. Run the backend server (from `/backend`):
    ```bash
    npm run dev
    ```
5. Run the admin- or public- client server (from `/client/admin-client` or `/client/public-client`):
   ```bash
   npm run dev
   ```
6. View the locally-hosted severs in your browser via `localhost:YOUR-PORT` (replace `YOUR-PORT` with the port you've set e.g. `5001`).

## 📍 Roadmap
