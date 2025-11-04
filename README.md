Welcome to my Pantry App!

#Purpose of the app

#Stacks and technologies used

#Local machine

- Please install Docker Desktop
  In the root CLI for pantry_app, run

```bash
Docker compose up --build -d
```

This command will:

- Create the PostgreSQL database
- Run the database migrations
- Start the backend API server on `http://localhost:3000`
- Build the react using Nginx

Once all containers are running, you can access the application in your web browser at:
http:/localhost:80
