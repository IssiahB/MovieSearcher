import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import SearchPage from './SearchPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  )
}

export default App
