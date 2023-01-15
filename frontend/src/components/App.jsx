import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { SearchProvider } from '../contexts/SearchContext';
import { SearchResponseProvider } from '../contexts/SearchResponseContext';

import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';

function App() {

  return (
    <div className="App">
      <SearchProvider>
        <SearchResponseProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/detail" element={<DetailPage />} />
          </Routes>
        </SearchResponseProvider>
      </SearchProvider>
    </div>
  )
}

export default App
