# Bandy

Bandy is a Progressive Web App (PWA) designed for managing bands, artists, and musicians. This project is intended for personal development and experimentation. Not all functionalities are implemented yet.

## Features

- Add and manage bands
- Band members can join the platform and their profiles are public so they can be assigned as band substitute members
- Managers can assign members and substitute members to bands
- Managers can create events such as rehearsals and performances
- Events have all the information including date, location, and pay that each member gets
- In-app chat with members and managers, including separate chat for each event

## Stack

- **Frontend:** Vite, TypeScript, Ionic, React, React Router
- **Backend:** Firebase (Firestore, Functions, Hosting, Authentication)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/bandy.git
    cd bandy
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up Firebase:**
    - Ensure you have the Firebase CLI installed and configured.
    - Initialize Firebase in your project:
        ```sh
        firebase init
        ```

4. **Run the development server:**
    ```sh
    npm run dev
    ```

## Scripts

- `dev`: Starts the development server using Vite.
- `build`: Compiles TypeScript and builds the project using Vite.
- `preview`: Previews the built project using Vite.
- `lint`: Runs ESLint on the project.
- `emulators:preserve`: Starts Firebase emulators with data import/export.

## Firebase Configuration

The Firebase emulators are configured to run on the following ports:

- Auth: 8001
- Functions: 8002
- Firestore: 8003
- Hosting: 8004
- Emulator UI: 8000

To start the emulators, run:
```sh
npm run emulators:preserve
