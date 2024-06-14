/*db.js is a file that creates connection between node.js server(backend server) and
database server(mongoDb server)
Mongoose helps in making connection between those two servers */

const mongoose = require('mongoose')
require('dotenv').config()

//Define mongoDB connection URL
//local Database connection
// const mongoDbUrl = process.env.MONGODB_URL_LOCAL 

//Global Database connection => never use @ in password
const mongoDbUrl = process.env.MONGODB_URL

//Setup MongoDb connection
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get default connection
//Mongoose maintains a default connection Object representing MongoDb connection
//This is the object which is used to interact to database
//Db object represents mongoDB connection
const db = mongoose.connection


//Define event listeners for database connection
db.on('connected', () => {
    console.log("Connected to MongoDB server")
})

db.on('error', (err) => {
    console.log("Error while connecting to MongoDB server:",err)
})

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB server")
})


//Export the database connection
module.exports = db