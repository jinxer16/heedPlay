import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHome from "./AppHome";
import Appstake from "./Appstake";
import AppPresale from "./Presales/Presales"
import NavbarStaking from './Staking/navbar';
import Footer from "./Staking/footer";
import Home from "./Home";
function App() {
  return (

    <div className="App">
      {/* <AppPresale/> */}

      <BrowserRouter>
      <ToastContainer />
        <NavbarStaking/>
        <Routes>
          {/* <Route exact path="/" element={<AppHome />} /> */}
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/presale" element={<AppPresale/>} />
          {/* <Route exact path="/Stake" element={<Appstake />} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
