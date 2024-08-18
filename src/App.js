import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from './NavBar';
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import AllCards from "./AllCards"
import NotFound from "./NotFound";
import Api from "./Api";
function App() {
  const [user, setUser] = useState(() => {
    // Load user from local storage on initial load
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to local storage whenever it changes
    if (user && user.token) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (user && user.token) {
      Api.token = user.token;
    }
  }, [user]);

  return (
    <div className="App">
       <main className="container">
        <BrowserRouter>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route exact path="/" element={<Home user={user}/>} />
            <Route exact path="/login" element={<Login user={user} setUser={setUser}/>} />
            <Route exact path="/register" element={<Register user={user} setUser={setUser}/>} />
            <Route exact path="/profile" element={<Profile user={user} setUser={setUser}/>} />
            <Route exact path="/cards" element={<AllCards user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </main>
    </div>
  );
}

export default App;
