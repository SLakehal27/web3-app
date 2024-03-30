import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ReviewPage } from "./pages/ReviewPage";
import { MovieListPage } from "./pages/MovieListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/movielist" element={<MovieListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
