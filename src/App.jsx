import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Match from "./pages/Match/Match";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/match/:matchID" element={<Match></Match>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
