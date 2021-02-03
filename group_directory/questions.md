- Can we have a PUT object that just updates part of the information and the existing info will already be there?
~~in router.get for users/register.....why do we need `user` here (in users.js file)~~


## Install these dependencies
- npm install bcryptjs express-validator csurf

## Create a .env file in the root directory with this info:
DB_USERNAME=favoreats_app

DB_PASSWORD=password

DB_DATABASE=favoreats

DB_HOST=localhost


```npx sequelize-cli db:create```

```npx dotenv sequelize db:migrate```
