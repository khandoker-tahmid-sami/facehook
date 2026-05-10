# Facehook

A social media web app built with React.

## Features

- Register and log in
- Forgot / reset password
- Create, edit, and delete posts
- Comment on posts
- View and edit your profile

## Tech Stack

- React 19
- TypeScript
- React Router v7
- React Hook Form
- Axios
- Tailwind CSS
- Vite

## Getting Started

1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root and add:

```
VITE_SERVER_BASE_URL=http://localhost:3000
```

4. Start the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend API at `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
