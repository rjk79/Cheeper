const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false })); //middleware. needs to be above setting up routes with ".use"
app.use(bodyParser.json());

app.use("/api/users", users); //use routes
app.use("/api/tweets", tweets);

