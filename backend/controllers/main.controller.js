const axios = require("axios");
const History = require("../models/history.model");

module.exports.searchMovie = async (data) => {
    const apiKey = process.env.OMDb_KEY;
    data.search = data.search.replace(" ", "+");
    let searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${data.search}`;

    if (data.type !== "none") {
        const validTypes = ["movie", "series", "episode"];

        if (validTypes.includes(data.type)) {
            searchUrl += `&type=${data.type}`;
        }
    }

    if (data.year !== "none") {
        searchUrl += `&y=${data.year}`;
    }

    let reply = await handleRealRequest(searchUrl);
    if (data.shouldSave === "true") {
        saveHistory(reply);
    }

    return reply;
}

module.exports.queryHistory = () => {
    return new Promise((res, rej) => {
        History.find({}).then((data) => {
            res(data);
        }, (err) => {
            rej(err);
        });
    });
}

function handleRealRequest(url) {
    return new Promise((res, rej) => {
        axios.get(url).then((reply) => {
            res(reply.data);
        }, (err) => {
            rej(err);
        })
    });
}

function saveHistory(apiData) {
    if (!("Search" in apiData)) { return; }
    let firstMovie = apiData.Search[0];

    try {
        var newHistory = new History({
            storedReply: {
                title: firstMovie.Title,
                year: firstMovie.Year,
                poster_url: firstMovie.Poster
            }
        });
    } catch (err) {
        console.log(err);
    }

    newHistory.save()
        .catch((err) => {
            console.log(err);
        });
}
