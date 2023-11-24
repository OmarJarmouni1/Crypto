#Use an offical Node.js LTS (Long Term Support) image as base
FROM node:lts-alpine as build

#Set the working directory in the container
WORKDIR /app

#Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

#Install project dependencies
RUN npm install

#Copy the entire project to the working directory
COPY . .

#Build the entire React app for production
RUN npm run build

#Use a smaller, lightweight base image for serving the app
FROM nginx:alpine

#Copy the build files from the previous stage to the NGINX sever directory
COPY --from=build /app/build /usr/share/nginx/html

#Expose port 80 to the outside world 
EXPOSE 80

#Start NGINX server when the container starts 

CMD ["nginx", "-g", "daemon off;"]