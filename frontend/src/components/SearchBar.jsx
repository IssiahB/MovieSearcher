import React, { useState, useEffect } from 'react';

import { SearchContext } from './App';

import "../styles/searchBar.css";

function SearchBar(props) {
    const [searchInput, setSearchInput] = useState("");
    const [typeInput, setTypeInput] = useState("none");
    const [yearInput, setYearInput] = useState(new Date().getFullYear());
    const updateSearchInput = (event) => setSearchInput(event.target.value);
    const updateTypeInput = (event) => setTypeInput(event.target.value);
    const updateYearInput = (event) => setYearInput(event.target.value);


    function handleSearch(event) {
        event.preventDefault();
        const searchBody = JSON.stringify({
            search: searchInput,
            year: yearInput,
            type: typeInput,
            shouldSave: true
        });

        fetch('http://localhost:3000/movies/search', {
            method: "post",
            body: searchBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((reply) => {
            async function parseReply() {
                const jsonReply = await(reply.json());
                console.log(jsonReply);
            }

            parseReply();
        });
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    name="searchInput"
                    type="text"
                    value={searchInput}
                    onChange={updateSearchInput}
                    placeholder="Search Title"
                    autoComplete='false'
                    required
                    />
                <input
                    name="yearInput"
                    type="year"
                    value={yearInput}
                    onChange={updateYearInput}
                    />
                <select name="typeInput" value={typeInput} onChange={updateTypeInput}>
                    <option>none</option>
                    <option>movie</option>
                    <option>series</option>
                    <option>episode</option>
                </select>
                
                <button type="submit" >Search</button>
            </form>
        </div>
    );
}

export default SearchBar;