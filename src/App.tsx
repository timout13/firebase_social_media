import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Login } from "./pages/login";
import "./App.css";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/createPost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
