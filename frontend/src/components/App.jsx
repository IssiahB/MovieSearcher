import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

const SearchContext = React.createContext();
export {SearchContext};

import HomePage from './HomePage';
import SearchPage from './SearchPage';

function App() {
    const [searchData, setSearchData] = useState({});

    const contextData = React.useMemo(() => ({
        searchData,
        setSearchData
    }), [searchData]);

    return (
        <div className="App">
            <SearchContext.Provider value={contextData}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                </Routes>
            </SearchContext.Provider>
        </div>
    )
}

export default App
