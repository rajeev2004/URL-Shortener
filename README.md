# URL Shortener Project

This project allows users to shorten long URLs using a simple and intuitive interface. It includes a front-end that interacts with the back-end to generate shortened URLs, track the number of clicks, and provide expiration dates for shortened URLs.

## Table of Contents

- [Project Setup](#project-setup)
- [Installation](#installation)
- [Testing Credentials](#testing-credentials)
- [Back-end Repository](#back-end-repository)

## Project Setup

### Front-end
This is the client-side part of the URL shortener. The front-end is built using **React.js** and communicates with the back-end to shorten URLs. The front-end allows users to input a long URL, create a custom alias (optional), and set an expiration date for the shortened URL.

### Back-end
The back-end handles the logic for shortening URLs, saving the shortened links in a database, and redirecting users when they visit the shortened link. It is built using **Node.js** and **Express**.

### Folder Structure
To better maintain the project and make it easier to manage both the front-end and back-end, it is recommended to store both the **front-end** and **back-end** code within a single parent folder.


## Installation

### Front-end

1. Clone the front-end repository:
   ```bash
   git clone https://github.com/rajeev2004/URL-Shortener.git
   cd URL-Shortener

2. Install the required dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and set the VITE_BASE_URL to your back-end URL (either local or deployed). Example:
    ```bash
    VITE_BASE_URL=http://localhost:5000/

4. Start the development server:
    ```bash
    npm run dev

### Back-end

1. Clone the back-end repository:
    ```bash
    git clone https://github.com/rajeev2004/URL-Shortener-backend.git
    cd URL-Shortener-backend

2. Install the required dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and configure your environment variables such as BASE_URL, DATABASE_URL, and SECRET_KEY:
    ```bash
    DATABASE_URL=postgres://neondb_owner:npg_ImSl6CiqhD9Y@ep-wandering-surf-a1ccevt9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
    SECRET_KEY=your_jwt_secret_key
    BASE_URL=http://localhost:5000 (locally)

4. Start the back-end server:
    ```bash
    nodemon server.js

5. Visit the application at:
    ```bash
    http://localhost:5173

## Testing Credentials

Email: intern@dacoid.com

Password: Test123

## Back-end Repository

The back-end code can be found here: https://github.com/rajeev2004/URL-Shortener-backend

## Demo

You can check out the live website [here](https://rajeev2004.github.io/URL-Shortener/)