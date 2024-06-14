const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config()


/* Body Parser: It is a middleware that extracts the JSON data from requests,
parses the data and make it available in req.body for further processing.

bodyparser.json(): It automatically parses the JSON data from request body and
converts it into a Javacript object, which is then stored in req.body 
*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Get route for home page
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});




//Import Person routes for route handlers
const personRoutes = require('./routes/personRoutes')
//Mounting
app.use('/person',personRoutes)

//Import menu routes for route handlers
const menuRoutes = require('./routes/menuRoutes')
//Mounting
app.use('/menuItems',menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Listening at port no.3000");
});

//Comment