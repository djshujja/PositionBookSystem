# Position Book

This repository contains two separate applications:

1. **Backend** (`position-book-java`)  
   A Spring Boot service that exposes a REST API for recording trade events and aggregated positions.

2. **Frontend** (`position-book-react`)  
   A React/TypeScript single-page app that lets users create, preview, and submit trade events and positions.

---

## Features

### Backend

- **Trade event ingestion**  
  Supports BUY, SELL, and CANCEL events.
- **Validation**  
  Ensures required fields, non-negative quantities, no double-cancels, and no overdrafts.
- **In-memory store**  
  Tracks positions by account+security and reverses canceled trades.
- **REST API**
  - `POST /api/trades` accepts a batch of trade events
  - `GET  /api/trades/positions` returns current positions with event histories

### Frontend

- **Create trade events**  
  Build one or more BUY/SELL/CANCEL rows in a form
- **Preview & confirm**  
  Review all pending events in a modal before submitting
- **Real-time positions**  
  View aggregated positions in a table with expandable event details
- **Error handling & toasts**  
  Instant feedback for validation errors or API failures
- **Theming & responsiveness**  
  Built with Material UI for a clean, adaptable interface

---

## Getting Started

### Prerequisites

- Java 17+ & Maven
- Node.js 16+ & npm (or Yarn)

### Backend

I would prefer using an IDE to build the backend.

The service will start on `http://localhost:8080/api`.

### Frontend

1. Copy `.env.example` → `.env` and set your API base URL:

   ```
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

2. Install and start:

   ```bash
   cd position-book-react
   npm install
   npm start
   ```

The app will open at `http://localhost:3000`.

---

## Project Structure

```
/
├─ position-book-java/     # Spring Boot backend
│  ├─ src/main/java/…       # controllers, services, models, repository
│  └─ src/test/java/…       # unit & integration tests
│
└─ position-book-react/    # React TS frontend
   ├─ src/
   │  ├─ api/               # Axios instance
   │  ├─ components/        # reusable UI pieces
   │  ├─ pages/             # views: EventPage, PositionPage
   │  ├─ store/             # Redux Toolkit slices & hooks
   │  ├─ utils/             # validation helpers
   └─ └─ types/             # shared TypeScript interfaces
```

---

Many thanks,
Shujja
