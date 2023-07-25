import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Search from './pages/Search/search';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </div>
  );
}

export default App;
