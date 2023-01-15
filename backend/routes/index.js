const express = require("express");
const controller = require("../controllers/main.controller");
const router = express.Router();

router.post("/search", (req, res) => {
    const searchData = req.body;

    if (!searchData.search) {
        res.status(400).json("The request reqires a search field");
    }

    controller.searchMovie(searchData)
        .then((results) => {
            res.json(results);
        }, (err) => {
            console.log(err);
            res.status(500).json("Something Went Wrong");
        });
});

router.post("/searchone", (req, res) => {

});

router.get("/history", (req, res) => {
    controller.queryHistory()
        .then((history) => {
            res.json(history);
        }, (err) => {
            res.status(500).json("There was an error finding history");
        });
    
});

router.all("/*", (req, res) => {
    res.status(404).json("Sorry Page Could Not Be Found");
});

module.exports = router;