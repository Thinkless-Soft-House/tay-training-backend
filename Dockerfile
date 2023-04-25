# # Base image
# FROM node:18

# # Create app directory
# WORKDIR /usr/src/app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Bundle app source
# COPY . .

# # Creates a "dist" folder with the production build
# RUN npm run build

# # Start the server using the production build
# CMD [ "node", "dist/main.js" ]


# Stage 1 - Build
FROM node:18.12.1-alpine3.17 AS backend-build

WORKDIR /api
COPY . .
RUN npm i && npm run build

# Stage 2 - Run
FROM node:18.12.1-alpine3.17

WORKDIR /app
COPY --from=backend-build /api/dist/ ./dist/
COPY --from=backend-build /api/package.json .
COPY --from=backend-build /api/package-lock.json .
COPY --from=backend-build /api/node_modules/ ./node_modules/

CMD [ "node", "dist/main.js" ]