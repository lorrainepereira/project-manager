<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Project setup

- Postgres: 
```bash
  $ docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
- link file script: [script.sql](script.sql)
- npm:      10.5.0
- node:     20.12.2

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

Open [http://localhost:3000/swagger](http://localhost:3000/swagger) to view it in your browser.

