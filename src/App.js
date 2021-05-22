import React, { useEffect, useState } from "react";
import SpacexAPI from "./api/SpacexApi";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
// import {BrowserRouter, } 'react-router-dom';

function App() {
  const [spaceData, setSpaceData] = useState([]);

  useEffect(() => {
    SpacexAPI.get("/launches")
      .then((res) => {
        // console.log(res.data);
        setSpaceData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="app">
      <Header />
      <MainPage spaceData={spaceData} />
    </div>
  );
}

export default App;
