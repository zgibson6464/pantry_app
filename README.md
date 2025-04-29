Pantry App - An inventory management app to keep track of pantry items.

Features:

- Add, update, and delete items
- Adjust item quantities
- Persistent data storage with PostgreSQL & Prisma
- Modularized backend and frontend code for better maintainability

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
