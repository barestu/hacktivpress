# hacktivpress
Hacktivpress is a community based blog for posting IT news

## REST API
List of user API routes:

Route | HTTP | Description
--- | --- | ---
`/api/user/register` | POST | Register new account
`/api/user/login` | POST | Login and get access token

List of article API routes:

Route | HTTP | Description
--- | --- | ---
`/api/article` | GET | Get all article
`/api/article/:id` | GET | Get article by id
`/api/article/author/:query` | GET | Get article by author
`/api/article/category/:query` | GET | Ger article by category
`/api/article/create` | POST | Post new article
`/api/article/update/:id` | PUT | Update one existing article
`/api/article/delete/:id` | DELETE | Delete one existing article

### How to run the server
- On folder server
- Run these steps on the terminal
```
npm install
// to install all dependencies needed for the program to run
npm start
// to run the program with nodemon
or
node app.js
// to run the program without nodemon
```

### How to run the client
- On folder client
- Run these steps on the terminal
```
npm install
// to install all dependencies needed for the program to run
npm run serve
// to run the program on development environtment
npm run build
// to build the file ready for production
```