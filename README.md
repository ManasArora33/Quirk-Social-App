<div align="center">

# 🐦 Quirk — X/Twitter‑like Social App (Monorepo)

[![Monorepo](https://img.shields.io/badge/monorepo-Turborepo-000?logo=vercel&logoColor=white)](https://turbo.build/repo)
[![Node](https://img.shields.io/badge/node-%3E=18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)

</div>

Quirk is a modern, full‑stack social app inspired by X/Twitter. It features a responsive React frontend and an Express + MongoDB backend, bundled in a Turborepo monorepo. Users can register, log in, post tweets, like, follow, and browse timelines — all with secure cookie‑based auth.

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

- React 19, Vite 7, TypeScript
- Tailwind CSS 4, Framer Motion, React Router 7
- Context API, Axios

**Backend**

- Node.js, Express 4
- MongoDB + Mongoose 8
- Zod for validation, JSON Web Tokens, cookie‑parser, CORS

**Monorepo & Tooling**

- Turborepo, TypeScript project references
- ESLint, Prettier

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

## 🤝 Contributing

Contributions welcome! Please:

- Open an issue for bugs/feature requests.
- Use conventional commits if possible.
- Run `npm run lint` before pushing.

## 🗺️ Roadmap / TODO

- [ ] Tests (unit/integration) and CI
- [ ] Production deployment guide and Dockerfile
- [ ] Messages & Notifications backend endpoints (UI exists)
- [ ] Optional: remove any remaining OAuth-related dependencies if present
- [ ] Improved error handling and logging

---

Made with ❤️ using TypeScript, React, and Express.
