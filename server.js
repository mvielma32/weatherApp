// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening (){
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
};

//Zipcode POST Route
app.post("/addWeather", (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.newFeels = req.body.feelings;
    console.log(projectData);
});

// Zipcode GET Route
app.get("/getWeather", (req, res)=>{
    res.send(projectData);
});

