import React, { useEffect, useState } from "react";
import containerImage from "../media/Group 48.png";
import Twitter from "../media/twitter.png";
import Telegram from "../media/telegram.png";
import Kakao from "../media/kakao.png";
import Discord from "../media/discord.png";
import Logo from "../media/logo.png";
import Doc from "../media/D.svg";
import Whitepaper from "../media/Whitepaper.svg";
import { useTranslation } from "react-i18next";
import { Navbar, Nav } from "react-bootstrap";
import { SiReddit } from 'react-icons/si';
import { BsFacebook } from "react-icons/bs";
import { AiFillMediumCircle } from "react-icons/ai"
import "./Staking.css";
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'
import Whitepaperone from "../documment/Whitepaper.pdf"
export default function NavbarStaking({
  changeMain,
  changeStake,
  changePresale,
}) {
  const { t, i18n } = useTranslation();
  const [green, isGreen] = useState("en");

  const handleChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    console.log(i18n, ":i18n");
    isGreen(lang);
  };
  return (
    <>
      <section id="topbar" className="stakingTopbar d-flex align-items-center" style={{ backgroundColor: "rgba(15, 15, 52, 0.723)" }}>
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center"></div>
          <div className="social-links" data-aos="fade-down">

            <a
              href="https://twitter.com/Heed2play"
              target="_blank"
              rel="noreferrer"
              className="twitter"
            >
              <img src={Twitter} alt="" />
            </a>
            <a
              href="https://t.me/Heed2play"
              target="_blank"
              rel="noreferrer"
              className="telegram"
            >
              <img src={Telegram} alt="" />
            </a>
            <a
              href="https://www.reddit.com/user/Heed2play"
              target="_blank"
              rel="noreferrer"
              className="kakao"
            >
              <SiReddit size={18} />
            </a>
            <a
              href="https://discord.gg/xYexCvXy"
              target="_blank"
              rel="noreferrer"
              className="discord"
            >
              <img src={Discord} alt="" />
            </a>

            <a
              href=" https://medium.com/@heed2play"
              target="_blank"
              rel="noreferrer"
              className="discord pe-1"
            >
              <AiFillMediumCircle size={20} />
            </a>

            <a
              href="https://www.facebook.com/Heed2play/"
              target="_blank"
              rel="noreferrer"
              className="discord pe-1"
            >
              <BsFacebook size={18} />
            </a>


          </div>
        </div>
      </section>

      <div className="navbarContainer">
        <Navbar collapseOnSelect expand="lg" variant="dark" className="headerContainerStaking" style={{ backgroundColor: "rgba(11, 11, 61, 0.979)" }}>
         
          <Navbar.Brand href="#home"><img src={Logo} className="goongyeLogo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <Nav.Link href="#story">
                <HashLink to="/#story">
                  About
                </HashLink>
              </Nav.Link>
              <Nav.Link href="#tokenomics">
                <HashLink to="/#tokenomics">
                  Story
                </HashLink>
              </Nav.Link>
              <Nav.Link href="#nft">
                <HashLink to="/#nft">
                  NFT
                </HashLink>
              </Nav.Link>
              <Nav.Link href="#story">
                <Link to="/presale">
                  {t("navbar.presale")}
                </Link>
              </Nav.Link>
              <Nav.Link href="#team">
                <HashLink to="/#team">
                  Team
                </HashLink>
              </Nav.Link>
              <Nav.Link href="#faq">
                <HashLink to="/#faq">FAQ</HashLink>
              </Nav.Link>
              <Nav.Link href="#faq">
                <a href={Whitepaperone} target="_blank">Whitepaper</a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          
        </Navbar>
      </div>
    </>
  );
}
