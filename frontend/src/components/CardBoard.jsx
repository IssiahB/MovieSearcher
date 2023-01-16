import React from "react";
import { useNavigate } from "react-router";

import ImageNotFound from "../images/NotFound.jpg";
import { useSearchContext } from "../contexts/SearchContext";
import { useSearchResponseContext } from "../contexts/SearchResponseContext";

import "../styles/cards.css";

function CardBoard(props) {
    const responses = props.cardItems;
    const navigate = useNavigate();
    const [search, setSearch] = useSearchContext();
    const [response, setResponse] = useSearchResponseContext();

    function handleClick(event) {
        const cardData = responses[event.target.id];
        const imdbId = {dbid: cardData.imdbID}
        setSearch(imdbId);

        fetch('http://localhost:3000/movies/searchone', {
            method: "post",
            body: JSON.stringify(imdbId),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((reply) => {
            async function parseReply() {
                const jsonReply = await reply.json();
                setResponse(jsonReply);
                navigate('/detail');
            }
            
            parseReply();
        })
    }

    return (
        <div className="board-container">
            {responses.map((reply, index) => (
                <section key={index} className="card">
                    <div className="card-image">
                        <img src={(reply.Poster === "N/A") ? ImageNotFound : reply.Poster} />
                    </div>
                    <h3>{reply.Title}</h3>
                    <div>
                        <p>Year: {reply.Year}</p>
                        <button onClick={handleClick} id={index}>Select</button>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default CardBoard;