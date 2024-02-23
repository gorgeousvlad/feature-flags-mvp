## Description

Feature flags [Nest](https://github.com/nestjs/nest) MVP.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Client

### Dev

```bash
cd client

npm ci

npm run dev
```

### Build

```bash
cd client

npm ci

npm run build
```


## DB

### Local launch 

To run Postgres in docker execute:

```bash
docker run --name postgres_container -e POSTGRES_PASSWORD=<my-password> -d -p 5432:5432 postgres
```

Then add your credentials to `src/modules/feature-flags/data-source.ts`

### Migrations

Generate migration with current entity models changes

```bash
    npm run typeorm -- migration:generate -d ./src/modules/feature-flags/data-source.ts ./src/modules/feature-flags/migrations/<YourMigrationName>
```

Run migrations:

```bash
    npm run typeorm -- migration:run -d ./src/modules/feature-flags/data-source.ts
```