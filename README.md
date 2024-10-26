
# Test Country Info Project

This project consists of two main applications:
1. **Backend** - A NestJS API (`test-country-info-api`) that provides country information.
2. **Frontend** - A Vite-powered frontend (`test-country-info-client`) for displaying country information.

I additionally included `Dockerfile`s for both the React app and the Nest app for containerizing the applications and eventually running them in a AWS EC2 instance and make it accessible trough the internet, all of this using the make targets provided in the `Makefile` which in turn run docker swarm to manage the containers remotely.

On the other hand, I added a github action for building the app and deploy docker images to Docker Hub on every Pull Request, so the process gets automatized. A next step would involve deploying the app to AWS EC2 instance on another job. 

## Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [Docker](https://www.docker.com/) (if using Docker for containerized deployment)

## Project Structure

```plaintext
test-country-info/
├── test-country-info-api        # Backend NestJS API
│   ├── .env                      # Environment variables for the backend
│   ├── src/                      # Source files for the backend
│   └── ...
└── test-country-info-client      # Frontend Vite project
    ├── public/                   # Public assets for the frontend
    ├── src/                      # Source files for the frontend
    └── ...
```

---

## Setting Up the Backend (NestJS API)

### 1. Navigate to the Backend Directory

```bash
cd test-country-info-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `test-country-info-api` directory with the necessary variables. For example:

```plaintext
PORT=5000
DATABASE_URL=your_database_url_here
```

### 4. Run the Backend

#### Development Mode

```bash
npm run start:dev
```

The server should start on `http://localhost:5000`.

---

## Setting Up the Frontend (Vite)

### 1. Navigate to the Frontend Directory

```bash
cd test-country-info-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

In the `test-country-info-client` directory, create a `.env` file with the necessary variables. For example:

```plaintext
VITE_API_URL=http://localhost:5000
```

### 4. Run the Frontend

#### Development Mode

```bash
npm run dev
```

The frontend will start on `http://localhost:3000` by default.

---


## Makefile Commands

The `Makefile` includes commands for common operations:

- **Install dependencies**: `make install`
- **Run backend**: `make run-backend`
- **Run frontend**: `make run-frontend`

---

## Additional Scripts

### Backend (NestJS API)
- **Lint**: `npm run lint`
- **Test**: `npm run test`

### Frontend (Vite)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

---

## Troubleshooting

If you encounter any issues, please check:
- Your environment variables are correctly configured.
- All dependencies are installed.
- Docker is running (if using Docker).

---