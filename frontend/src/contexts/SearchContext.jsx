import React, { useContext, useState } from "react";

const SearchContext = React.createContext();
const SearchUpdateContext = React.createContext();

/**
 * Used to create a context for the search data
 */
export function SearchProvider({ children }) {
    const [searchData, setSearchData] = useState({});

    function handleSetSearch(data) {
        // let updatedKeys = Object.keys(data);
        // let newSearchData = {...searchData};

        // updatedKeys.forEach((key) => {
        //     if (key in newSearchData) {
        //         newSearchData[key] = data[key];
        //     }
        // })
        
        setSearchData(data);
    }

    return (
        <SearchContext.Provider value={searchData}>
            <SearchUpdateContext.Provider value={handleSetSearch}>
                {children}
            </SearchUpdateContext.Provider>
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    return [
        useContext(SearchContext),
        useContext(SearchUpdateContext)
    ];
}