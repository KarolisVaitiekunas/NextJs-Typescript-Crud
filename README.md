# NextJs-Typescript-Auth-Post-App
CRUD App with Typescript.

## To setup the server execute these commands in server directory:
```
mkdir config
cd config
touch default.ts
```
**default.ts**
```
export default {
  port: 3001, //port that will be used to host server side
  clientPort: 3000, //port that will be used to host client side
  host: "localhost",
  db_URI: "mongodb://localhost:27017/EXAMPLE", //Mongo URI
  secret: "secret example",  //secret for hashing
  EMAIL_SERVICE: "SendGrid", //email serive provider for password reseting
  EMAIL_USERNAME: "apikey",  //email serive provider username
  EMAIL_PASSWORD: "EXAMPLE_PASSWORD", //email serive provider username
  EMAIL_FROM: "example@gmail.com", //email which will send the emails
};

```
#### To run server
```
npm install
npm start
```

## To run the client side execute these commands in client directory:
For dev:
```
npm install
npm run dev
```
For build:
```
npm install
npm run build
npm start
```
