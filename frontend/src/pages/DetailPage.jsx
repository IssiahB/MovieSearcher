import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import { useSearchResponseContext } from "../contexts/SearchResponseContext";
import "../styles/detail.css";

function DetailPage(props) {
    const navigate = useNavigate();
    const [response, setResponse] = useSearchResponseContext();
    const [isLoaded, setIsLoaded] = useState((response.Title) ? true : false);

    // Used if there is no response object (if refresh).
    // Loads response from the client's cookie
    useEffect(() => {
        window.scrollTo({top: 0}) // Keeps page on top
        if (!response.Title) {
            const idCookie = Cookies.get('movieid');
            if (idCookie) {
                // Make request
                fetch('http://localhost:3000/movies/searchone', {
                    method: "post",
                    body: idCookie,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((reply) => {
                    async function parseReply() {
                        const jsonReply = await reply.json();
                        setResponse(jsonReply);
                        setIsLoaded(true);
                    }
    
                    parseReply();
                })
            }
        }
    });

    function convertFractionToPercentage(rate) {
        if (rate.includes("%")) { return rate; } // Already percentage
        const [numerator, denominator] = rate.split("/");
        const decimal = Number(numerator) / Number(denominator);

        const percentage = Math.floor(decimal * 100);
        return `${percentage}%`;
    }


    function getSplitList(list) {
        if (list === "N/A") { return ["N/A"]; }

        let existingList = (list) ? list : []; // Handles list with no value
        if (existingList && existingList.includes(', ')) {
            existingList = existingList.split(', ');
        }

        // Makes sure returns array
        if (!(existingList instanceof Array)) {return [existingList]}
        return existingList;
    }

    function handleBack() {
        navigate("/search");
    }

    return (
        <div className="detail-page">
            <div>
                <figure>
                    <figcaption>{response.Title}</figcaption>
                    <img src={response.Poster} />
                    <div>
                        <p>Rated {response.Rated}</p>
                        <p>{response.Released}</p>
                        <button onClick={handleBack}>Back</button>
                    </div>
                </figure>
            </div>
            <main>
                <div className="detail-content">
                    <article id="plot">
                        <h2>Plot</h2>
                        <div>
                            <p>{response.Plot}</p>
                        </div>
                    </article>
                    <article id="stars">
                        <h2>Stars</h2>
                        <div className="star-data">
                            <div>
                                <h3>Director</h3>
                                <ul>
                                    {isLoaded && getSplitList(response.Director).map((director, index) => (
                                        <li key={index}>{director}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Actors</h3>
                                <ul>
                                    {isLoaded && getSplitList(response.Actors).map((actor, index) => (
                                        <li key={index}>{actor}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                    <article id="ratings">
                        <h2>Ratings</h2>
                        <div className="critics">
                            {isLoaded && response.Ratings.map((critic, index) => (
                                <div key={index}>
                                    <h3>{critic.Source}</h3>
                                    <p>{convertFractionToPercentage(critic.Value)}</p>
                                </div>
                            ))}
                        </div>
                    </article>
                    <article id="earnings">
                        <h2>Earnings</h2>
                        {response.Awards &&
                            <p><span>Awards: </span>{response.Awards}</p>
                        }
                        {response.BoxOffice && 
                            <p><span>Box Office: </span>{response.BoxOffice}</p>
                        }
                    </article>
                    <article id="misc">
                        <h2>Misc</h2>
                        <p><span>Country: </span>{response.Country}</p>
                        <p><span>Runtime: </span>{response.Runtime}</p>
                        <p><span>Type: </span>{response.Type}</p>
                    </article>
                </div>
            </main>
        </div>
    )
}

export default DetailPage;