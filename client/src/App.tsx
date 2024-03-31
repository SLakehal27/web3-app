import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ReviewPage } from "./pages/ReviewPage";
import { MovieListPage } from "./pages/MovieListPage";
import { Header } from "./components/Header";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/review/:id" element={<ReviewPage />} />
          <Route path="/main/movielist" element={<MovieListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
