# Furniro E-Commerce | Compass UOL Challenge 3

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

<br/>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeORM](https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## About The Project

This project was developed as part of the **Challenge 3** for the Compass UOL Fellowship Program. It consists of a pixel-perfect recreation of **Furniro**, a modern e-commerce furniture interface, fully integrated with a custom RESTful API.

The goal was to deliver a robust, scalable, and responsive full-stack application, ensuring high performance and an intuitive user experience while adhering strictly to the provided Figma prototypes and business rules.

---

## Features

- **Dynamic Product Listing:** Server-side pagination, category filtering, and price sorting.
- **Single Product Page:** Detailed product views with dynamic pricing calculation based on user selection (size and color variations).
- **Advanced State Management:** A fully functional Shopping Cart handled globally via Zustand, persisting data in Local Storage.
- **Checkout Simulation:** Cart manipulation (add, update quantity, remove) and checkout feedback using custom Toasts.
- **Custom REST API:** Built from scratch using Node.js and TypeORM, seeding the SQLite database automatically upon startup.
- **Fully Responsive:** Mobile-first approach tailored with Tailwind CSS for seamless navigation across all devices.
- **Secure Authentication (JWT):** Full Login and Registration flow generating JSON Web Tokens to protect private routes (Checkout and Contact).
- **Strict Form Validation:** Complex real-time data validation and error handling using React Hook Form and Zod schemas (No native HTML alerts used).
- **Smart Checkout & Third-party APIs:** Automated address autofill via ViaCEP API integration, dynamic total calculations, and empty-cart route locking.

---

## Architecture & Technologies

The repository is structured as a monorepo containing two main directories:

### Front-end (`/front-end`)

Built for speed and developer experience.

- React.js (via Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- Splide.js
- React Hot Toast
- Zod
- React Hook Form

### Back-end (`/back-end`)

A scalable backend architecture replacing the standard `json-server` requirement to provide robust filtering and real relational data.

- Node.js
- Express.js
- TypeScript
- TypeORM
- SQLite
- Swagger

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have **Node.js (v18 or higher)** and **npm** installed on your machine.

### 1. Clone the Repository

```bash
https://github.com/brunnofdev/Furniro-web---Desafio-3-Sprint-4---Compass-2026-FullStack.git

```

### 2. Running the Back-end (API)

The backend utilizes an SQLite database. When starting the server in development mode, it will automatically parse the `db.json` file and seed the database with the initial products.

Run the following commands:

```bash
cd back-end
npm install
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### 3. Running the Front-end

Open a new terminal window in the project root and run:

```bash
cd front-end
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Open this URL in your browser to explore **Furniro**.

---

API Documentation: The backend API is documented using Swagger UI, which can be accessed interactively at

```text
http://localhost:3000/docs
```

---

📁 Project Structure

To ensure long-term maintainability, the project follows a strict architectural pattern:

```
📦 back-end
┣ 📂 public # Images used on products
┣ 📂 src
    ┣ 📂 controllers # Request handlers (products.controller.ts)
    ┣ 📂 database # Database configuration and seeding scripts (data-source.ts, seed.ts)
    ┣ 📂 docs # Swagger API documentation configuration (swagger.ts)
    ┣ 📂 dtos # Data Transfer Objects for request validation and response typing
    ┣ 📂 entities # TypeORM database models (product.entity.ts)
    ┣ 📂 routes # API route definitions (products.routes.ts)
    ┣ 📂 services # Business logic and database interactions (products.service.ts)
    ┣ 📂 shared # Shared resources, middlewares, and utility functions
    ┣ 🗄️ furniro.sqlite # Local SQLite database file
    ┗ 📜 server.ts # Main server entry point and application setup
┗ 📜 db.json # Products info used on db seeding

📦 front-end
┣ 📂 src
    ┣ 📂 api # API integration and HTTP client configuration
    ┣ 📂 assets # Static design images and visual assets from the frontend design
    ┣ 📂 components # Reusable UI sections (Header, Footer, ProductCard, etc.)
    ┣ 📂 contexts # Session contexts
    ┣ 📂 pages # Page-level components (Cart, Home, ProductDetail, Shop)
    ┣ 📂 schemas # Zod validation schemas
    ┣ 📂 store # Global state management
    ┣ 📂 types # Type definitions and interfaces
    ┣ 📂 utils # Helper functions and formatters
    ┣ 📜 App.tsx # Main application routing and layout
    ┣ 📜 index.css # Global styles
    ┗ 📜 main.tsx # Main React application entry point
```

---

## The Team

This project was brought to life by (Challenge 3):

- Brunno Felipe Bezerra

---

Workflow & Organization: We adopted a structured Git Flow using Conventional Commits for clear version control.

---

## Acknowledgements

Developed with dedication for the **Compass UOL Fellowship Program**.
