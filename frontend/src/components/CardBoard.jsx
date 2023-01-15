import React from "react";

import ImageNotFound from "../images/NotFound.jpg";

import "../styles/cards.css";

function CardBoard(props) {
    const responses = props.cardItems;
    return (
        <div className="board-container">
            {responses.map((reply, index) => (
                <article key={index} className="card">
                    <img src={(reply.Poster === "N/A") ? ImageNotFound : reply.Poster} />
                    <h3>{reply.Title}</h3>
                    <div>
                        <p>Year: {reply.Year}</p>
                        <button>Select</button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default CardBoard;