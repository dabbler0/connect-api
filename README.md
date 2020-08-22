Connect API
===

The Connect API written in JavaScript using Node.js.

# Get started

* Please note: This API requires access to another instance of the Letters API. You can use staging but it is preferable to have an instance of the Letters API running locally.

```
npm install
touch .env
```

Use the following for your `.env`...

```
APP_DEBUG=true
APP_PORT=3000

LETTERS_API_URI=http://localhost:8000

DB_NAME=connect_api
DB_USER=username
DB_PASS=password
```

Setup your MySQL database locally and change the DB_NAME, DB_USER and DB_PASS fields in your `.env` to the correct values.

# Run it

```
npx sequelize db:migrate
npx nodemon
```

To make sure it's running, hit `localhost:3000/api/ping` in your browser or using Postman or cURL.
