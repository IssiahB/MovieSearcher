import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useSearchContext } from '../contexts/SearchContext';
import { useSearchResponseContext } from '../contexts/SearchResponseContext';

import "../styles/searchBar.css";

function SearchBar(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useSearchContext();
    const [response, setResponse] = useSearchResponseContext();

    const [searchInput, setSearchInput] = useState("");
    const [typeInput, setTypeInput] = useState("any");
    const [yearInput, setYearInput] = useState("");
    const updateSearchInput = (event) => setSearchInput(event.target.value);
    const updateTypeInput = (event) => setTypeInput(event.target.value);
    const updateYearInput = (event) => setYearInput(event.target.value);


    function handleSearch(event) {
        event.preventDefault();
        const searchBody = {
            search: searchInput,
            year: (!yearInput) ? "none" : yearInput,
            type: (typeInput === "any") ? "none" : typeInput,
            shouldSave: true
        }
        setSearch(searchBody);

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
        });
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
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
            </form>
        </div>
    );
}

export default SearchBar;