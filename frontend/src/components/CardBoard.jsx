import React from "react";

import ImageNotFound from "../images/NotFound.jpg";

import "../styles/cards.css";

function CardBoard(props) {
    const responses = props.cardItems;

    function handleClick(event) {
        const cardId = event.target.id;
        const cardData = responses[cardId];

        console.log(cardData);
    }

    return (
        <div className="board-container">
            {responses.map((reply, index) => (
                <article key={index} className="card">
                    <div className="card-image">
                        <img src={(reply.Poster === "N/A") ? ImageNotFound : reply.Poster} />
                    </div>
                    <h3>{reply.Title}</h3>
                    <div>
                        <p>Year: {reply.Year}</p>
                        <button onClick={handleClick} id={index}>Select</button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default CardBoard;