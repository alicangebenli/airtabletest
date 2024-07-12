This project was developed using Vue.js 3, Vite, and Docker. To run the project in a production environment, run the
following commands:

docker build -t app .
docker run -dp 3000:3000 app
To run the project in a development environment, run the following commands:

yarn
yarn dev