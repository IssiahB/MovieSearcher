import React from 'react';

import { useSearchResponseContext } from "../contexts/SearchResponseContext";
import "../styles/detail.css";

function DetailPage(props) {
    const [response, setResponse] = useSearchResponseContext();
    console.log(response);

    function getActors() {
        const actorList = response.Actors.split(', ');
        return actorList;
    }
    
    return (
        <div className="detail-page">
            <figure>
                <figcaption>{response.Title}</figcaption>
                <img src={response.Poster} />
                <p>Rated {response.Rated}</p>
                <p>{response.Released}</p>
            </figure>
            <main>
                <div className="detail-content">
                    <article>
                        <h2>Plot</h2>
                        <p>{response.Plot}</p>
                    </article>
                    <article>
                        <h2>Stars</h2>
                        <h3>Director</h3>
                        <p>{response.Director}</p>
                        <h3>Actors</h3>
                        <ul>
                            {getActors().map((actor, index) => (
                                <li key={index}>{actor}</li>
                            ))}
                        </ul>
                    </article>
                    <article>
                        <h2>Ratings</h2>
                        {response.Ratings.map((critic, index) => (
                            <div key={index}>
                                <h3>{critic.Source}</h3>
                                <p>{critic.Value}</p>
                            </div>
                        ))}
                    </article>
                    <article>
                        <h2>Earnings</h2>
                        <p><span>Awards: </span>{response.Awards}</p>
                        <p><span>Box Office: </span>{response.BoxOffice}</p>
                    </article>
                    <article>
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