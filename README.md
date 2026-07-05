# Health Line Reviews - Fullstack Admin CMS Portal

A modern, high-performance, clinical and lifestyle review blog portal equipped with a secure, responsive, and feature-rich Admin CMS. Built with React, TailwindCSS, Express, Multer, Cloudinary, and Firestore (with local database fallback).

---

## 🚀 Features

- **Clinical Layout Fidelity:** CMS-created blogs render with pixel-perfect consistency, matching the layout, typography, animations, and spacing of existing manual blogs.
- **Double-Safety DB Engine:** Connects to **Google Firebase Firestore** with an automatic fallback to a local JSON database wrapper when keys are unconfigured.
- **Automated Seeding:** On the first server boot, the system parses, extracts, and seeds 232 blog reviews, matching reviewer author profiles, categories, and products.
- **Sleek Workspace Dashboard:** Real-time counter widgets for Published/Draft/Scheduled posts, Category verticals, Unique tags, and an active audit trail log.
- **Rich Blog Editor:** Dynamic form managing Intro, Science, Ingredients, Benefits sections, lists, pros/cons arrays, FAQs list, and affiliate choice product links.
- **Media Manager & Library:** Supports Drag-and-drop file uploads, asset sorting, path clipboard copying, and deletions (works with Cloudinary or local uploads folder).
- **SEO & Clean URL Engine:** Automated clean slug generation, custom Meta Title, Meta Description, Focus Keyword arrays, and page-header injection.

---

## 🛠 Project Structure

```
├── client/                 # React Frontend (Vite, React Router v7, Framer Motion)
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Footer, AdminLayout, Cards)
│   │   ├── pages/          # Pages (Home, Reviews, Admin CMS pages)
│   │   └── services/       # Client API Axios wrappers
│   └── vercel.json         # Client deployment rules
│
├── server/                 # Express Backend API
│   ├── config/             # Cloudinary & Firebase DB initializers
│   ├── controllers/        # Express Route Controllers (Auth, Post, Media, etc.)
│   ├── middleware/         # JWT Verification & Multer Upload handlers
│   ├── routes/             # REST Route mappings
│   ├── utils/              # localFirestore database simulator & seed parser
│   └── server.js           # Server entry point
│
└── vercel.json             # Root Vercel multi-builder configuration
```

---

## ⚙️ Environment Variables

### Backend Server (`server/.env`)

Create a `.env` file in the `server` directory:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Local server port | `5005` |
| `CORS_ORIGIN` | Allowed client origin | `http://localhost:5173` |
| `ADMIN_USERNAME` | Admin CMS portal username | `admin` |
| `ADMIN_PASSWORD` | Admin CMS portal password | `admin123` |
| `JWT_SECRET` | Secret signature key for JWT tokens | `hlr-secret-key-2026` |
| `FIREBASE_PROJECT_ID` | Firestore Project ID | *(Optional fallback enabled)* |
| `FIREBASE_CLIENT_EMAIL`| Firestore Client Service Email | *(Optional fallback enabled)* |
| `FIREBASE_PRIVATE_KEY` | Firestore Private Service Key | *(Optional fallback enabled)* |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary Cloud Name | *(Optional fallback enabled)* |
| `CLOUDINARY_API_KEY`   | Cloudinary API Key | *(Optional fallback enabled)* |
| `CLOUDINARY_API_SECRET`| Cloudinary API Secret Key | *(Optional fallback enabled)* |

### Frontend Client (`client/.env` / Configuration)

Defaults to `http://localhost:5005/api` for API requests. You can customize the base URL using VITE env:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base endpoint URL of the backend API | `http://localhost:5005/api` |

---

## 💻 Local Setup & Execution

### 1. Clone & Install Dependencies

Clone this repository and run the installation commands:

```bash
# Install frontend packages
cd client
npm install

# Install backend packages
cd ../server
npm install
```

### 2. Launch the Application

Start both the backend server and frontend client concurrently:

```bash
# Start backend server (starts on http://localhost:5005, runs db seeder)
cd server
npm start

# Start frontend client (starts on http://localhost:5173)
cd ../client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Navigating to `/admin` opens the CMS Control Panel. Use `admin` and `admin123` to log in.

---

## ☁️ Vercel Deployment Guide

This project is optimized for deployment on Vercel as a single fullstack application:

1. **Push Changes to GitHub:** Commit all local edits and push them to your repository.
2. **Import to Vercel:** Link your repository in Vercel.
3. **Configure Project Build Settings:**
   In your Vercel Project dashboard under **Settings ➔ Build & Development Settings**, configure:
   - **Root Directory:** Keep as default (`./` - repository root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `client/dist`
4. **Configure Environment Variables:**
   Under **Settings ➔ Environment Variables**, configure your backend credentials:
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` (Your CMS panel credentials)
   - `CORS_ORIGIN` (Set to `https://healthlinereviews.com,https://www.healthlinereviews.com`)
   - `JWT_SECRET` (Secure random string)
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (Required for live Firestore database writing)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (Required for live image uploads)
5. **Redeploy:** Trigger a deploy. Vercel will run the client build, compile the static files, and serve `api/index.js` as the serverless endpoint for `/api/*` requests.

