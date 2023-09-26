# TS-DB-Mongo
A project create with TypeScript with connection to a Mongo DB.


## Run project

Please add your postgres db credentials to `.env` file based on the enviroment that you are going to run, for example:

```
ENVIRONMENT=Development

ENV_HOST='localhost'
ENV_USER='dev_user'
ENV_PASSWORD='dev_password'
ENV_DB='db_dev'
ENV_DIALECT='postgres'
ENV_PORT=5454
```

Then run this command `npm run start` to run the project, if you want to run qa env run this other command `npm run start:stage`, that is going to run the project with the `.env.stage` file.
