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
        {window.location.pathname !== "/" && <Header />}
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/movielist" element={<MovieListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
