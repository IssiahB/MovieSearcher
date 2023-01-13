import React from 'react'

import Heading from './Heading';
import SearchBar from './SearchBar';

function HomePage() {
    return (
        <div className="home-page">
            <Heading title="React Movies" />
            <SearchBar />
        </div>
    )
}

export default HomePage;