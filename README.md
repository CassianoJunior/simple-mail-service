<div align="center">
  <img src="https://raw.githubusercontent.com/gist/CassianoJunior/2c1476ec57e90e894e37075b6e7b6a1d/raw/4e8bdb21f474a57a45c526a1c003189ada14ce68/mail-ios.svg" width="25%" />
</div>

<h1 align="center">Simple mail service</h1>

<p align="center">An simple webservice built for practical work of Distributed Systems Class at UFPI</p>
<p align="center">
  <a href="https://github.com/CassianoJunior"><img src="https://img.shields.io/badge/created%20by-CassianoJunior-4BBAAB" alt="Creator badge" /></a>
</p>

## Table of contents
  
- [Preview](#preview)
- [Instalation](#instalation)
- [Stack](#stack)
  - [Client](#client)
  - [Server](#server)

## Preview

![Demo video](https://gist.githubusercontent.com/CassianoJunior/2c1476ec57e90e894e37075b6e7b6a1d/raw/5988e51e6de35ee1c482236080547ffe2b078091/demo-gif.gif)

## Installation

### Requirements

- [Node](https://nodejs.org) - Node.js is an open-source, cross-platform JavaScript runtime environment.
- [Git](https://git-scm.com) - Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Clone this repository using:

```bash
  git clone https://github.com/CassianoJunior/simple-mail-service
```

In directory created, open terminal and run these commands

```bash
  npm run add-env-win      # Add required .env file in server in Windows OS
  npm run add-env-linux    # Add required .env file in server in Linux OS
  npm run dependencies     # install all project dependencies
  npm start                # start server and client in developer mode
```

Open your preferred browser and go to ```http://localhost:5173``` or click on the link that appeared in the terminal.

>If you want to see the database, enter the server folder and type the command below in the terminal

```bash
 npx prisma studio
```

Enjoy the app.

## Stack
  
- #### Client
  - [Vite](https://vitejs.dev) - Next Generation Frontend Tooling
  - [React](https://reactjs.org) - A JavaScript library for building user interfaces
  - [TypeScript](https://www.typescriptlang.org) - TypeScript is JavaScript with syntax for types.
  - [Axios](https://axios-http.com) - Cliente HTTP baseado em promessas para o navegador e Node.js
  - [Lucide](https://lucide.dev) - Beautiful & consistent icon toolkit made by the community.
  - [Radix UI](https://www.radix-ui.com) - Unstyled, accessible components for building high‑quality design systems and web apps in React.
  - [React Toastify](https://github.com/fkhadra/react-toastify) - React-Toastify allows you to add notifications to your app with ease. No more nonsense!
  - [React Content Loader](https://github.com/danilowoz/react-content-loader) - SVG-Powered component to easily create placeholder loadings (like Facebook's cards loading).
  - [Moment](https://momentjs.com) - Parse, validate, manipulate,
and display dates and times in JavaScript.
  - [Tailwindcss](https://tailwindcss.com) - A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

- #### Server

  - [SQLite](https://www.sqlite.org/index.html) - SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine
  - [Prisma ORM](https://www.prisma.io) - Next-generation Node.js and TypeScript ORM
  - [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
  - [Dotenv](https://github.com/motdotla/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
  - [TypeScript](https://www.typescriptlang.org) - TypeScript is JavaScript with syntax for types.
  - [ShortID](https://www.npmjs.com/package/shortid) - Amazingly short non-sequential url-friendly unique id generator.

## Project structure

```
  $PROJECT_ROOT
    ├── client                    # Frontend project folder
    │     ├── public              # Vite public folder to simple access to archives
    │     └── src              
    │          ├── assets         # Files, images and videos used
    │          ├── components     # UI Components to built visual of application
    │          ├── contexts       # React contexts to share values for all child components
    │          ├── reducers       # React reducers to complex state logic
    │          ├── styles         # Folder with tailwind global css 
    │          ├── utils          # Folder with some util functions and files
    │          ├── App.tsx        # App
    │          ├── LogIn.tsx      # LogIn page
    │          └── main.tsx       # Vite main script to mount html
    └── server                    # Backend project folder
          ├── prisma              # Prisma folder
          │     ├── migrations    # Prisma generated migrations
          │     ├── dev.db        # SQLite Database
          │     └── schema.prisma # Prisma config file
          └── src
                ├── controllers   # Contollers layer
                ├── entities      # Domain Entities
                ├── errors        # Either error pattern
                ├── factories     # Factories patterns
                ├── repositories  # Repositories layer 
                      └── implementations # Different implementations for respositories
                ├── services      # Services layer
                ├── utils         # Folder with some util functions 
                ├── index.ts      # Server entry point
                └── routes.ts     # Application routes
```
