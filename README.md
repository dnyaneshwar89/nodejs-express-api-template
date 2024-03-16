# Node.js Express API Template

This repository provides a basic template for building APIs using Node.js and Express.js. This README will guide you through the folder structure and file organization of this template.

## Folder Structure

The folder structure is designed to organize the codebase logically, separating concerns and facilitating scalability and maintainability.

```sh
.
├── src
├──├── controllers # Request handlers for each route
├──├── middleware # Custom middleware functions
├──├── db # Folders related to db
├──├──├── models # Data models and database schemas
├──├── routes # Route definitions
├──├── helpers # Helper functions for business logic and services
├──├── utils # Utility functions
├──├──├── config.js # Configuration files (e.g., environment variables)
├──├──├── response.js # Abstraction for http responses
├── app.js # To setup express application
├── index.js # Entry point of the application
├── Dockerfile # Dockerfile
├── .env.sample # Sample file for .env
└── README.md # Instructions and overview of the project
```

### Explanation

1. **controllers**: Each route in the API has its own controller, which handles the incoming requests, processes data, and sends responses.

2. **middleware**: Custom middleware functions that intercept incoming requests before they reach the route handlers. Middleware can be used for tasks such as authentication, logging, error handling, etc.

3. **db**: Contains everything related to db like schemas, connection file, repository files etc.

   1. **models**: Data models and database schemas using ORMs (Object-Relational Mapping) or other database libraries.

   2. **repository**: Contains repository function for db. You can create multiple files inside this where each file deals with operation related to that db entity

4. **routes**: Defines the routes of the API, mapping URLs to their respective middlewares and controller functions. Separating routes from controllers promotes better code organization and maintainability.

5. **helpers**: Contains helper functions to perform business logic, functionalies specific to resources existing in your project, etc. You can also define services here that are utilized by the controllers or create a folder named `services` which will contain functions related to third party servies used in your project. Helpers/Services abstract complex operations and promote reusability.

6. **utils**: Utility functions that are used across different parts of the application. These can include helper functions for validation, formatting, error handling, etc.

   1. **config.js**: Contains configuration files such as environment variables, database configurations, etc.

   2. **response.js**: Creates abstraction for http responses

7. **app.js**: Sets up the express application where middlewares are applied, routes are mounted.

8. **index.js**: Main entry point for your application where server is started and other necessary connections are established for e.g. db / other third party services( Redis, RabbitMQ etc.) essential for your application.

9. **Dockerfile**: Dockerfile for application

10. **.env.sample**: Sample file for `.env`.

11. **README.md**: Instructions and overview of the project.

## Getting Started

1. Clone this repository: `git clone https://github.com/dnyaneshwar89/nodejs-express-api-template`
2. Install dependencies: `npm install`
3. Set up your environment variables: Create a copy of `.env.sample` file and name it `.env.development`( use `.env.production` or `.env` on production) and define your environment variables.
4. Run the application: `npm start`

## Patterns followed

1. **Try - Catch** - For every function you define, it is better to create it in a `try-catch` format( Refer controllers,helpers, etc.). It prevents your app from crashing even if your code fails in any manner.

2. **Format for Return** - Every function should return in the format of [data,err] which helps in handling errors in case of failure of function as well as data in case of successfull execution of function.

3. **Import pattern** - You can import a function in several ways. One is you import it directly from the file ( Refer import of `userController` in `src/routes/v1/index.js`), import from `index.js` of the folder ( Refer to `UserHelper` in `src/controllers/v1/user/user.controllers.js` which is actually an import from `src/helpers/user/index.js`). If you are importing from a folder then by default it imports from index.js in that folder. You can choose how you want to import files from your folder.

4. **Group your imports** - You should follow a specific order for imports in your file which maintains tidyness in your code and makes it easy to read. For e.g. you can follow the order Utility functions, Packages, Repository functions, Helpers or Services etc

5. **JSDoc comments** - Try to provide JSDoc comments for every function from the start of the project and try to include all information like the description of function indicating what it does, definition of the params, what it returns, anything to keep in mind when using the function or when modifying the function, Reference to any article or so from which any logic in the function was inspired. This helps other developers to understand the function better ( This will be THE most important thing as your codebase grows :\) ).
