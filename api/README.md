# API

Qué es API?

## Endpoints

| action            | method | path        | body                                                 | status |
| ----------------- | ------ | ----------- | ---------------------------------------------------- | ------ |
| register user     | POST   | /users      |  { "name": "...", "email": "...", "password": "..."} | 200    |
| authenticate user | POST   | /users/auth |  {"email": "...", "password": "..."}                 | 201    |

## Install

```sh
$ npm i
```

## Run

```sh
$ npm run start
```

## Inspect

```sh
$ npm run inspect
```

## Watch

```sh
$ npm run watch
```
