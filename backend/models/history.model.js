const mongoose = require("mongoose");

const historyShema = new mongoose.Schema({
    storedReply: {
        title: String,
        year: String,
        poster_url: String
    }
}, {timestamps: true});

module.exports = mongoose.model("history", historyShema);