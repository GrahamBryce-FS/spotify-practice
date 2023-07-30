import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/header';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import SearchPage from './pages/Search/search';


function App() {
  const accessToken = localStorage.getItem("accessToken");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(accessToken);
    if (!token && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [accessToken, token, navigate]);
  return (
    <div>
      <Header />
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
