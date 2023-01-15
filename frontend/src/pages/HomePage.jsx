import React from 'react'

import Heading from '../components/Heading';
import SearchBar from '../components/SearchBar';

function HomePage() {
    return (
        <div className="home-page">
            <Heading title="React Movies" />
            <SearchBar />
        </div>
    )
}

export default HomePage;