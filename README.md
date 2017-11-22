# Roman Numerals

## A web based application that converts numbers to roman numerals and vice-versa

[![Build Status](https://travis-ci.org/jonathas/roman-numerals.svg?branch=master)](https://travis-ci.org/jonathas/roman-numerals) [![Coverage Status](https://coveralls.io/repos/github/jonathas/roman-numerals/badge.svg?branch=master)](https://coveralls.io/github/jonathas/roman-numerals?branch=master)

![alt text](https://github.com/jonathas/roman-numerals/blob/master/roman_numerals.jpg "Roman Numerals Clock")

### Dependencies

- Node.js 7
- npm
- yarn
- Docker
- docker-compose

### Testing the API

In order to run the tests, enter the api directory and run:

```bash
npm test
```

### Generating the documentation for the endpoints

In order to generate the HTML with the documentation, enter the api directory and run:

```bash
npm run docs
```

### Developing

For developing new functionalities, you can use nodemon, pm2 or the pm2 docker image for development. If you choose the docker image, then enter the infra directory and run:

```bash
docker-compose -f docker-dev.yml up
```

This will start the Nginx and pm2 containers. This pm2 container is configured for reloading the code every time it is modified.

### Deploying

In order to run it in production, instead of running the docker-dev.yml file, you can run the docker-compose.yml file:

```bash
docker-compose up
```
