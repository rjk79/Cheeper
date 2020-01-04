const passport = require('passport');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const express = require("express"); //create server
const app = express();

const users = require("./routes/api/users"); // import routes
const tweets = require("./routes/api/tweets");

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World")); //create route
app.use(passport.initialize());
require('./config/passport')(passport);


const port = process.env.PORT || 5000; //choose port

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users); //use routes
app.use("/api/tweets", tweets);

app.use(bodyParser.urlencoded({ extended: false })); //middleware
app.use(bodyParser.json());