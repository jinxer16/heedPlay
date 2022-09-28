import React, { useEffect, useState } from "react";
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
import game from "../src/media/game.jpg"
import Modal from 'react-bootstrap/Modal';
import { IoMdClose } from "react-icons/io";
function App() {
  const [modalShow, setModalShow] = useState(false);
  setTimeout(() => {

  }, 1000)
  useEffect(() => {
    setModalShow(true)
  }, [])
  return (

    <div className="App">
      {
        modalShow ? (<Modal
          show={modalShow}
          onHide={() => setModalShow(false)}

          style={{ backgroundColor: 'transparent' }}
          centered
        >
          <Modal.Body style={{ backgroundColor: '#21353b' }}>

            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <IoMdClose
                  onClick={() => setModalShow(false)}
                  size={28}
                  style={{ color: "white", cursor: "pointer", }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-2">

              <a href="https://play.google.com/store/apps/details?id=com.heedplay.multipleheedrobot.storehyd" target="_blank"><img src={game} className="img-fluid" width="450px" /></a>
            </div>
          </Modal.Body>

        </Modal>) :
          (
            <></>
          )
      }

      <BrowserRouter>
        <ToastContainer />
        <NavbarStaking />
        <Routes>
          {/* <Route exact path="/" element={<AppHome />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/presale" element={<AppPresale />} />
          {/* <Route exact path="/Stake" element={<Appstake />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
