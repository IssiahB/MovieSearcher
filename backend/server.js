require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/movies", routes);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log("Error connecting to database!");
        console.log(err);
        return;
    }

    console.log("Successfully Connected To Database!");
})

mongoose.connection.on("error", (err) => {
    console.log("There was an error with the database connection!");
    console.log(err);
});

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server!");
        console.log(err);
        return;
    }

    console.log("Server Started Successfully!");
});