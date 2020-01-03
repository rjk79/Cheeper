const mongoose = require('mongoose');
const express = require("express"); //create server
const app = express();

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    
app.get("/", (req, res) => res.send("Hello World")); //create route

const port = process.env.PORT || 5000; //choose port

app.listen(port, () => console.log(`Server is running on port ${port}`));
