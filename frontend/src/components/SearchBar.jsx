import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

import { useNavigate } from 'react-router';
import { useSearchContext } from '../contexts/SearchContext';
import { useSearchResponseContext } from '../contexts/SearchResponseContext';

import ClipLoader from 'react-spinners/ClipLoader';

import "../styles/searchBar.css";

export default function SearchBar(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useSearchContext();
    const [response, setResponse] = useSearchResponseContext();

    // Initial States
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchInput, setSearchInput, updateSearchInput] = useControlledState("");
    const [typeInput, setTypeInput, updateTypeInput] = useControlledState("any");
    const [yearInput, setYearInput, updateYearInput] = useControlledState("");

    function handleSearch(event) {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        // Create Search Body
        const searchBody = {
            search: searchInput,
            year: (!yearInput) ? "none" : yearInput,
            type: (typeInput === "any") ? "none" : typeInput,
            shouldSave: true
        }
        setSearch(searchBody);
        // Create cookie
        Cookies.set('moviesearch', JSON.stringify(searchBody), {expires: 2});

        // Make request
        fetch('http://localhost:3000/movies/search', {
            method: "post",
            body: JSON.stringify(searchBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((reply) => {
            async function parseReply() {
                const jsonReply = await reply.json();
                setResponse(jsonReply);
                navigate('/search');
            }

            parseReply();
            setIsLoading(false);
        }, (err) => {
            setIsError(true);
            setIsLoading(false);
        });
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                {(isLoading) ?
                    <ClipLoader loading={isLoading} color="#fff"/>
                    :
                    <>
                        {isError && <p>There was an error with your search!</p>}
                        <div className="inputs">
                            <input
                                name="searchInput"
                                type="text"
                                value={searchInput}
                                onChange={updateSearchInput}
                                placeholder="Search Title"
                                autoComplete="false"
                                required
                            />
                            <input
                                name="yearInput"
                                type="year"
                                value={yearInput}
                                onChange={updateYearInput}
                                placeholder="Enter Year"
                            />
                        </div>
                        <div className="type">
                            <label>
                                Type:
                                <select name="typeInput" value={typeInput} onChange={updateTypeInput}>
                                    <option>any</option>
                                    <option>movie</option>
                                    <option>series</option>
                                    <option>episode</option>
                                </select>
                            </label>
                        </div>

                        <button type="submit" >Search</button>
                    </>
                }
            </form>

        </div>
    );
}

function useControlledState(value) {
    const [state, setState] = useState(value);
    const updateState = (event) => setState(event.target.value);

    return [state, setState, updateState];
}