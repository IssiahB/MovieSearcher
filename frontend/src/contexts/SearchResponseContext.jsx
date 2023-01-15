import React, { useContext, useState } from "react";

const SearchResponseContext = React.createContext();
const SearchResponseUpdateContext = React.createContext();

/**
 * Used to create a context for the search response data
 */
export function SearchResponseProvider({ children }) {
    const [searchResponseData, setSearchResponseData] = useState({});

    function handleSetSearch(data) {
        setSearchResponseData(data);
    }

    return (
        <SearchResponseContext.Provider value={searchResponseData}>
            <SearchResponseUpdateContext.Provider value={handleSetSearch}>
                {children}
            </SearchResponseUpdateContext.Provider>
        </SearchResponseContext.Provider>
    );
}

export function useSearchResponseContext() {
    return [
        useContext(SearchResponseContext),
        useContext(SearchResponseUpdateContext)
    ];
}