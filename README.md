<div align="center">

  <img src="https://api.iconify.design/lucide:message-square-quote.svg?color=%238B5CF6" alt="Quirk icon" width="80" height="80" />

  <h1>Quirk — X/Twitter‑like Social App (Monorepo)</h1>
  <p><em>Fast. Minimal. Beautiful.</em></p>

  <p>
    <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-000?style=for-the-badge&logo=turborepo&logoColor=white" />
    <img alt="Node" src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  </p>
  <p>
    <img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  </p>

</div>

Quirk is a modern, full‑stack social app inspired by X/Twitter. It features a responsive React frontend and an Express + MongoDB backend, bundled in a Turborepo monorepo. Users can register, log in, post tweets, like, follow, and browse timelines — all with secure cookie‑based auth.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage-api-quickstart)
- [API Endpoints](#-main-api-endpoints)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap--todo)

## ✨ Features

- **Authentication** — Email/password register, login, logout using JWT in httpOnly cookies.
- **Profiles** — Fetch user by username and view profile details.
- **Tweets** — Create tweets, list all tweets, view a user’s tweets.
- **Likes** — Like/unlike tweets.
- **Timelines** — Home timeline feed and per‑user tweets.
- **Social graph** — Follow/unfollow users.
- **Polished UI** — Tailwind CSS 4 + Framer Motion for smooth, responsive UX.
- **State management** — Context API + React Router.

## 🧰 Tech Stack

**Frontend**
- <p>
  <img alt="React" src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img alt="Context API" src="https://img.shields.io/badge/Context%20API-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  </p>
- React 19, Vite 7, TypeScript
- Tailwind CSS 4, Framer Motion, React Router 7
- Context API, Axios

**Backend**
- <p>
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img alt="cookie‑parser" src="https://img.shields.io/badge/cookie--parser-7E57C2?style=for-the-badge&logoColor=white" />
  <img alt="CORS" src="https://img.shields.io/badge/CORS-5C6BC0?style=for-the-badge&logoColor=white" />
  </p>
- Node.js, Express 4
- MongoDB + Mongoose 8
- Zod for validation, JSON Web Tokens, cookie‑parser, CORS

**Monorepo & Tooling**
- <p>
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-000?style=for-the-badge&logo=turborepo&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000" />
  </p>
- Turborepo, TypeScript project references
- ESLint, Prettier

---

## 📁 Project Structure

```
.
├─ apps/
│  ├─ client/            # React + Vite frontend
│  │  └─ src/
│  └─ server/            # Express + Mongoose backend
│     └─ src/
├─ packages/
│  ├─ eslint-config/
│  └─ typescript-config/
├─ turbo.json            # Turborepo pipeline
├─ package.json          # Workspaces + root scripts
└─ README.md
```

## 🚀 Installation & Setup

Prerequisites:

- Node.js >= 18 and npm
- MongoDB connection string

1. Clone the repository

```bash
git clone https://github.com/<your-username>/x-clone.git
cd x-clone
```

2. Install dependencies (workspaces)

```bash
npm install
```

3. Configure environment variables

Create `apps/server/.env`:

```dotenv
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

Create `apps/client/.env` (optional; has a sane default):

```dotenv
VITE_API_URL=http://localhost:3000/api/v1
```

4. Run in development

```bash
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:3000
```

5. Build for production

```bash
npm run build

# Serve backend
npm --workspace apps/server run start

# Preview frontend build
npm --workspace apps/client run preview
```

---

## 📡 Usage (API quickstart)

The server uses cookie‑based auth. Use `-c`/`-b` with curl to persist cookies.

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"displayName":"Ada","username":"ada","email":"ada@example.com","password":"passw0rd"}' -c cookies.txt

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"passw0rd"}' -c cookies.txt

# Me
curl http://localhost:3000/api/v1/auth/me -b cookies.txt

# Create tweet
curl -X POST http://localhost:3000/api/v1/tweets \
  -H "Content-Type: application/json" -d '{"content":"Hello, Quirk!"}' -b cookies.txt

# Home timeline
curl http://localhost:3000/api/v1/tweets/timeline -b cookies.txt
```

---

## 🔗 Main API Endpoints

| Method | Path                          | Auth | Description            |
| -----: | ----------------------------- | :--: | ---------------------- |
|   POST | `/api/v1/auth/register`       |  —   | Register               |
|   POST | `/api/v1/auth/login`          |  —   | Login                  |
|   POST | `/api/v1/auth/logout`         |  —   | Logout (clears cookie) |
|    GET | `/api/v1/auth/me`             |  ✓   | Current user           |
|   POST | `/api/v1/tweets`              |  ✓   | Create tweet           |
|    GET | `/api/v1/tweets`              |  ✓   | All tweets             |
|    GET | `/api/v1/tweets/timeline`     |  ✓   | Home timeline          |
|    GET | `/api/v1/tweets/user/:userId` |  ✓   | Tweets by user         |
|   POST | `/api/v1/tweets/:id/like`     |  ✓   | Like tweet             |
| DELETE | `/api/v1/tweets/:id/like`     |  ✓   | Unlike tweet           |
|   POST | `/api/v1/users/:id/follow`    |  ✓   | Follow user            |
| DELETE | `/api/v1/users/:id/follow`    |  ✓   | Unfollow user          |
|    GET | `/api/v1/users/:username`     |  ✓   | Get user by username   |

---

## 📸 Screenshots

TODO: Add screenshots of the app in action.

---

## 🤝 Contributing

Contributions welcome! Please:

- Open an issue for bugs/feature requests.
- Use conventional commits if possible.
- Run `npm run lint` before pushing.

---

## 🗺️ Roadmap / TODO

- [ ] Tests (unit/integration) and CI
- [ ] Production deployment guide and Dockerfile
- [ ] Messages & Notifications backend endpoints (UI exists)
- [ ] Optional: remove any remaining OAuth-related dependencies if present
- [ ] Improved error handling and logging

---

Made with ❤️ using TypeScript, React, and Express.
