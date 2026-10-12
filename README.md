# Event Management App

A full stack app for planning events, built during my M.Sc. Computer Science studies. Users register, log in and manage their events with a date, location and description, then track which events are still upcoming and which are done.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)

## Features

- Registration and login with **JWT** authentication and **bcrypt** password hashing
- Create, edit and delete events (name, description, date, location)
- Events are linked to their organiser, with support for attendees
- Separate views for all, remaining and completed events

## Architecture

```
frontend/   React 18 + Vite, React Router, MUI, Tailwind CSS
backend/    Node.js + Express REST API, Mongoose models, JWT middleware
            MongoDB for users and events
```

### API endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/register` · `/login` | Create an account / log in |
| GET | `/validate-token` | Check the current session |
| GET | `/events` · `/events/:eventId` | List events / get one event |
| GET | `/remaining` · `/completed` | Filter by status |
| POST | `/events` | Create an event |
| PUT | `/events/edit/:eventId` | Edit an event |
| POST | `/events/delete` | Delete an event |

## Configure your credentials

The app needs a MongoDB database and a secret for login tokens. No credentials are stored in this repository.

1. Create a free cluster in [MongoDB Atlas](https://www.mongodb.com/atlas) and add a database user.
2. Copy `backend/.env.example` to `backend/.env`.
3. Replace every `YOUR_...` value in `backend/.env` with your own connection string and a long random secret.

The `.env` file is ignored by Git, so your credentials stay on your machine.

## Run it locally

```bash
# Backend
cd backend
cp .env.example .env      # then fill in your own values
npm install
npm start                 # http://localhost:4000

# Frontend (second terminal)
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## Author

**Manicharan Ravi** · Software Engineer, Cloud & Full Stack · Mainz, Germany
[LinkedIn](https://linkedin.com/in/manicharan-ravi) · [GitHub](https://github.com/manicharan0485)
