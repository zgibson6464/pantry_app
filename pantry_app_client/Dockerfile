# Build React app
FROM node:22-slim AS build
WORKDIR /app
# - Sets the working directory so all next commands run from /app.

COPY package*.json ./
# - Copy package files first and run `npm ci` to install exact deps from package-lock.json.

RUN npm ci
# ci more suitable for build environments over npm install due to its ability to create a clean and reproducible node_modules tree.

COPY . .
RUN npm run build
#    - Copies source files and runs the build command which outputs the production files to the build directory.

# Serve the build using nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
#    - Uses nginx to serve the built static files. COPY pulls the files from the "build"
#      stage into nginx's web root so nginx can serve them.

EXPOSE 80
#    - Documents that the container serves HTTP on port 80. When you run the container,
#      map this to a host port (e.g., `-p 80:80`).

CMD ["nginx", "-g", "daemon off;"]
# commands the program to run a web server using nginx and keeps the process running in the foreground with -g, daemon off so that the container does not stop running.


