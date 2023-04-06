# Express.js Webshop API with MongoDB and Authorization

This is a simple Express.js app that uses MongoDB for data storage and implements user authorization with roles. The app is designed to run in a Docker container, with live updates when source code changes. This api is a small demo and work in progress. This README helps with setting everything up.

## Features

- Express.js server with MongoDB for data storage
- User authentication and authorization with roles
- Default admin user automatically added to the database (email: admin@shop.com, password: admin)
- Dockerized setup with live updates on code changes
- Data persistence across container restarts
- Express.js logs visible in the terminal (when using Visual Studio Code)

## Prerequisites

- Docker
- Docker Compose
- Visual Studio Code (optional)

## Getting Started

1. Clone the repository:

- `git clone https://github.com/yourusername/your-repo.git`
- `cd your-repo`


2. Build and start the Docker containers:

- `docker-compose up --build`

This command builds the Docker images and starts the containers. The app will be accessible on port 3000, and the MongoDB server will be accessible on port 27017.

3. Open the project in Visual Studio Code (optional) to get full IntelliSense support and see the logs in the terminal:

- `code .`


## How to Use

- There is another repository of mine with a React app that directly communicates with this API [https://github.com/OstojicMilos/react-TS-SCSS-webshop](https://github.com/OstojicMilos/react-TS-SCSS-webshop). Alternatively, you can use Postman, curl, or develop your own app to call these APIs.



## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.


