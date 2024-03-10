<div align="center">
  <h1 align="center">Full Stack Development</h1>
</div>

# Rugby Game POI

## About The Project

RugbyClubPOI is my submission for my Full Stack Development Assignment 1 which was to develop A point of interest (POI) web application. This document outlines my submission for this Assignment.

## Project Features

### Features for POI

#### Supports the following User Management Features:

- Sign up / Login in / Delete Account via the application or API
- User Admin Dashboard with simple analytics
- SuperAdmin & Admin can update, delete and change account types

#### Support the following POI Characteristics:

- Create, view and update Rugby Clubs via the application or API
- Add, Update and Delete Club image.

<!-- LIVE DEMO -->

## Live Demo

Heroku Link: [https://rugbyclubpoi-f3ce2fe5ab82.herokuapp.com/](https://rugbyclubpoi-f3ce2fe5ab82.herokuapp.com/)

Glitch Link: [https://rugby-club-poi.glitch.me/](https://rugby-club-poi.glitch.me/)

## Technology Stack

- Backend: Node.js, Hapi.js
- Database: Mongo (Cloud Atlas)
- Hosting: Heroku & Glitch
- Templating: Handlebars
- API Validation: Joi
- API Documentation: OpenAI / Swagger
- Authentication: JSON Web Tokens (JWT)
- Styling: Bulma CSS
- Testing: Mocha, Chai

## Dependencies

- `@hapi/boom`: Creates HTTP-friendly error objects.
- `@hapi/cookie`: Cookie-based session management for Hapi.js.
- `@hapi/hapi`: A rich framework for building applications and services (server).
- `@hapi/inert`: Static file and directory handlers for Hapi.js.
- `@hapi/vision`: Templates rendering support for Hapi.js.
- `chai`: A BDD / TDD assertion library for node and the browser.
- `cloudinary`: Provides API for image and video upload, manipulation, optimization, and delivery.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `handlebars`: A simple templating language.
- `hapi-auth-jwt2`: JWT authentication for Hapi.js applications.
- `hapi-swagger`: A Swagger interface for Hapi.js applications.
- `joi`: Object schema description language and validator for JavaScript objects.
- `jsonwebtoken`: An implementation of JSON Web Tokens.
- `lowdb`: Small local JSON database powered by Lodash (supports Node, Electron and the browser).
- `mais-mongoose-seeder`: Mongoose seeder allows you to seed your MongoDB database with JavaScript objects.
- `mongodb`: The official MongoDB driver for Node.js.
- `mongoose`: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- `uuid`: Simple, fast generation of RFC4122 UUIDS.

## DevDependencies:

- `axios`: Promise based HTTP client for the browser and node.js.
- `eslint`: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- `eslint-config-airbnb-base`: This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
- `eslint-config-prettier`: Turns off all rules that are unnecessary or might conflict with Prettier.
- `eslint-plugin-import`: ESLint plugin with rules that help validate proper imports.
- `mocha`: A feature-rich JavaScript test framework running on Node.js and in the browser.
- `nodemon`: A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- `prettier`: An opinionated code formatter.

### Installation

Clone this Repository

```
  git clone https://github.com/ki321g/Rugby-Club-POI.git
```

To get a copy of the project running on your system, navigate to the project directory in a command prompt/shell and run the following:

```
  npm install
```

This will install all dependencies in package-lock.json

After dependency installation has completed run

```
npm run start
```

This will load the application and start a local server on port 3000.

```
http://localhost:3000/
```

<!-- CONTACT -->

## Contact

Your Name - Kieron Garvey

Project Link: [https://github.com/ki321g/Rugby-Club-POI](https://github.com/ki321g/Rugby-Club-POI)
