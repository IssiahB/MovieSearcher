import React from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { useSearchResponseContext } from '../contexts/SearchResponseContext';

import Heading from '../components/Heading';
import CardBoard from '../components/CardBoard';
import SearchBar from '../components/SearchBar';

function SearchPage() {
    const [search, setSearch] = useSearchContext();
    const [response, setResponse] = useSearchResponseContext();

    return (
        <div className="search-page">
            <Heading title={`"${search.search}"`} />
            <SearchBar />
            <CardBoard />
        </div>
    )
}

export default SearchPage;