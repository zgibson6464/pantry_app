Pantry App - An inventory management app to keep track of pantry items.
Register or log in to your own saved pantry where you can add items and their quantities and adjust as theyre used or purchased.

Features:

- Login and Register your own account
- Add, update, and delete items
- Adjust item quantities
- Persistent data storage with PostgreSQL & Prisma
- Modularized backend and frontend code for better maintainability

Technologies Used:
Backend:

- Node.js: Cross platform, open-source JavaScript runtime environment for building the backend server.
- Express.js: back-end web application framework for building RESTful APIs with Node.js
- Prisma: ORM designed for Node.js for database management
- PostgreSQL: Relational Database for data storage
- Nodemon: Development tool used for automatic server restarting on file changes.
- bcrypt: Library for password hashing
- jsonwebtoken: Library for authentication using JSON Web Tokens
- dotenv: Library for managing environment variables, storing them so they are not hardcoded into the application.

Frontend:

- React.js: Javascript library for building the user interface
- Vite: Build tool for fast development and bundling
- Axios: Promise based HTTP client for making REST API calls
- Bootstrap: CSS framework for styling and responsive design
- React Router: Library for handling routing in the React application

================================================
Installation

- Clone repository:
  in bash terminal run:
  """
  git clone https://github.com/zgibson6464/pantry-app.git
  cd pantry-app
  """

- Backend Set up:
  Requires Node.js & PostgreSQL
  in bash terminal run:
  """
  cd ../pantry_app_server
  npm install
  """

- in the '.env' file modify the 'DATABASE_URL' line to match your PostgreSQL account:
  'DATABASE_URL=postgresql://user:password@localhost:5432/pantrydb

-Run database migrations:
in the bash terminal run:
"""
npx prisma migrate dev --name init
"""

- Start the backend server by running 'npm run dev' in the bash terminal.

- Setting up the front end requires React.js & Vite
  in the bash terminal run:
  """
  cd ../pantry_app_client
  npm install
  npm run dev
  """
