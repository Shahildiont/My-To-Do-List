# My Todo App

A full-stack todo application with separate client and server.

## Project Structure

- `client/` - React frontend
- `server/` - Node.js/Express backend

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend (in a new terminal):
```bash
cd client
npm start
```

The app will be available at `http://localhost:3000` with the backend at `http://localhost:5000`.

## Features

- Add, toggle, and delete todos
- Persistent storage
- User authentication (mock)
- Responsive design