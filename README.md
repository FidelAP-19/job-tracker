# Job Tracker

A full-stack web application for managing job applications and analyzing job search progress. Built to demonstrate a production-grade three-layer backend architecture with a modern React frontend.

**Live Demo:** https://job-tracker-omega-six.vercel.app

---

## Features

- Track job applications with status, salary estimate, date applied, and notes
- Log interview rounds per application with type and outcome
- Manage companies and professional contacts
- Analytics dashboard showing success rate, response rate, applications per week, top industries, and upcoming interviews
- Dark and light mode with persistent theme toggle

---

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, Recharts

**Backend:** Node.js, Express

**Database:** PostgreSQL

**ORM:** Sequelize

**Deployment:** Vercel (frontend), Railway (backend + database)

---

## Architecture

The backend is built around a strict three-layer separation of concerns:
```
Routes → Service → Repository
```

- **Routes** (`/routes`) — HTTP request and response handling only. No business logic.
- **Services** (`/services`) — All business logic, validation, and analytics calculations.
- **Repositories** (`/repositories`) — All database queries via Sequelize. Services never touch Sequelize directly.

This pattern keeps each layer focused on a single responsibility, makes the codebase easy to navigate, and isolates changes — adding a new analytics feature only requires touching the service layer.

---

## Data Models

- **User** — id, name, email
- **Company** — id, name, industry, website, notes
- **Application** — id, user_id, company_id, role_title, status, date_applied, notes, salary_estimate
- **InterviewRound** — id, application_id, round_type, scheduled_date, outcome, notes
- **Contact** — id, company_id, name, role, email, linkedin_url, notes

---

## Analytics

All analytics are computed server-side in the service layer:

- Application success rate (offers / total applications)
- Response rate (applications that progressed past Applied status)
- Status breakdown across all applications
- Applications submitted per week over time
- Most applied-to industries
- Upcoming interviews within the next 7 days
- Average interview rounds before receiving an offer

---

## Local Setup

**Prerequisites:** Node.js, PostgreSQL

**1. Clone the repository**
```bash
git clone https://github.com/FidelAP-19/job-tracker.git
cd job-tracker
```

**2. Install server dependencies**
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=job_tracker
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
PORT=3001
```

**3. Seed the database**
```bash
npm run seed
```

**4. Start the server**
```bash
npm run dev
```

**5. Install client dependencies**
```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client` folder:
```
VITE_API_URL=http://localhost:3001
```

**6. Start the client**
```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project Structure
```
/server
  /config        → Sequelize database connection
  /models        → Sequelize models and associations
  /repositories  → All database queries
  /services      → Business logic and analytics
  /routes        → Express route handlers
  /seeders       → Faker.js seed script
  server.js      → Entry point

/client
  /src
    /components  → Reusable UI components
    /pages       → Page-level components
    /services    → Axios API functions
  App.jsx        → React Router and layout
  App.css        → CSS custom properties for dark/light theming
```

---

## Deployment

- Frontend on **Vercel** — auto-deploys on push to main
- Backend and PostgreSQL on **Railway** — auto-deploys on push to main
- Environment variables managed through platform dashboards
- CORS restricted to the production frontend URL