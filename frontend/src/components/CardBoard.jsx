import React, { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import ImageNotFound from "../images/NotFound.jpg";
import { useSearchContext } from "../contexts/SearchContext";
import { useSearchResponseContext } from "../contexts/SearchResponseContext";

import "../styles/cards.css";

function CardBoard(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useSearchContext();
    const [response, setResponse] = useSearchResponseContext();

    const [isLoading, setIsLoading] = useState((!response.Search) ? true : false);
    const [isError, setIsError] = useState(false);

    if (!response.Search) {
        const searchCookie = Cookies.get('moviesearch');
        if (searchCookie) {
            fetch('http://localhost:3000/movies/search', {
                method: "post",
                body: searchCookie,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((reply) => {
                async function parseReply() {
                    const jsonReply = await reply.json();
                    setResponse(jsonReply);
                    // setSearch here so that the searchPage can use the title
                    // also placed here to allow this component to render before
                    // setting state
                    setSearch(JSON.parse(searchCookie));

                    setIsLoading(false);
                }

                parseReply();
            }, (err) => {
                setIsError(true);
            });
        } else {
            setIsError(true);
        }
    }

    function handleClick(event) {
        const cardData = response.Search[event.target.id];
        const imdbId = { dbid: cardData.imdbID }
        
        // Add the new search field
        const tempSearch = {... search};
        tempSearch.dbid = cardData.imdbID;
        setSearch(tempSearch);

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
            {isLoading ? <p style={{textAlign: "center"}}>Loading...</p> : 
                response.Search.map((reply, index) => (
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