import React, { useEffect, useState } from "react";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Twitter from "./media/twitter.png";
import Telegram from "./media/telegram.png";
import Kakao from "./media/kakao.png";
import Discord from "./media/discord.png";
import Logo from "./media/logo.png";
import Doc from "./media/D.svg";
import Whitepaper from "./media/Whitepaper.svg";
import Head from "./media/head2.png";
import Ape1 from "./media/nft-1.png";
import Ape2 from "./media/banner-right-img.png";
import Crazy from "./media/preview.png";
import Crazy1 from "./media/d4835e86370fddbf30a274dc4149d5cb.gif"
import King from "./media/king-goongye.png";
import Breed from "./media/breed.png";
import PSSJ from "./media/team_1_bg.jpeg";
import Zoe from "./media/team_3_bg.jpeg";
import Sophia from "./media/team_5_bg.jpeg";
import Abbey from "./media/splash_2.jpeg";
import NFT1 from "./media/golf.png";
import NFT2 from "./media/grilgolf.png";
import NFT3 from "./media/boxing.png";
import NFT4 from "./media/ufc.png";
import NFT5 from "./media/luddo.png";
import NFT6 from "./media/ldoo.png";
import Scene1 from "./media/vbhbd.png";
import Scene2 from "./media/nvnnu.png";
import Scene3 from "./media/vbhbd.png";
import Scene4 from "./media/vhfbvh.png";
import MintImage from "./media/mint-img.png";
import MintSmImage from "./media/mint-sm-img.png";
import two from "./media/2.png"
import three from "./media/3.png"
import five from "./media/5.png"
import one from "./media/1.png";
import ten from "./media/10.png";
import on from "./media/On.png";
import off from "./media/Line31.png";
import image1 from "./media/Vector3.png";
import containerImage from "./media/Group 48.png";
import light from "./media/light-from-top-background.png";
import Modal from "react-bootstrap/Modal";
import { Navbar, Nav } from "react-bootstrap";
import Caver from "caver-js";
import { connectionAction } from "./Redux/connection/actions";
import { SiReddit } from 'react-icons/si';
import { BsFacebook } from "react-icons/bs";
import { AiFillMediumCircle } from "react-icons/ai"
import { toast } from "react-toastify";
import { googyeContractAddress, goongyeContractAbi } from "./Utils/Goongye.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useAudio from "./useAudio";
import { changeLanguage } from "i18next";
const caver = new Caver(window.klaytn);
const Home = ({ changeMain, changeStake, changePresale }) => {
  const [playing, togglePlaying] = useAudio();
  const [loading, isLoading] = useState(false);
  const [loadingBreed, isLoadingSecond] = useState(false);
  const { t, i18n } = useTranslation();
  const [green, isGreen] = useState("en");
  const [salePrice, setSalePrice] = useState(0.0);
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  let [noMints, setNomints] = useState(1);
  let [ttlKlay, setTtlKlay] = useState(0);
  let [mintArray, setMintArray] = useState([]);
  let [mintCollectionArray, setMintCollectionArray] = useState([]);

  const [collectionModalShow, setCollectionModalShow] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const handleChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);

    isGreen(lang);
  };
  const changeLanguageDouble = (lang) => {
    i18n.changeLanguage(lang);
  };
  const playingSound = () => {
    togglePlaying();
  };
  const options1 = {
    autoplay: true,
    rtl: true,
    autoplayhoverpause: true,
    autoplaytimeout: 100,
    items: 1,
    nav: false,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
        loop: true,
      },
      769: {
        items: 1,
        dots: true,
        loop: true,
      },
      1200: {
        items: 1,
        dots: false,
        loop: false,
      },
    },
  };

  const options2 = {
    autoplay: true,
    autoplayhoverpause: true,
    autoplaytimeout: 100,
    items: 6,
    nav: false,
    dots: true,
    loop: true,
    rtl: true,
    responsive: {
      0: {
        items: 2,
        dots: true,
      },
      769: {
        items: 3,
        dots: true,
      },
      1200: {
        items: 4,
        dots: true,
      },
      1300: {
        items: 6,
        dots: false,
      },
    },
  };

  const options3 = {
    autoplay: true,
    autoplayhoverpause: true,
    autoplaytimeout: 100,
    items: 4,
    nav: false,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 2,
        dots: true,
        loop: true,
      },
      769: {
        items: 3,
        dots: true,
        loop: true,
      },
      1200: {
        items: 4,
        dots: false,
        loop: false,
      },
    },
  };

  const onConnectAccount = () => {
    dispatch(connectionAction());
  };

  const getInitialMintPrice = async () => {
    try {
      let contractOf = new caver.klay.Contract(
        goongyeContractAbi,
        googyeContractAddress
      );
      let publicSale = await contractOf.methods.publicprice().call();
      publicSale = caver.utils.fromPeb(publicSale);
      setTtlKlay(publicSale);
    } catch (e) {
      console.log("Error while getting minting price", e);
    }
  };

  const increment = async () => {
    try {
      if (noMints < 3) {
        let newNum = noMints + 1;
        setNomints(newNum);
        const web3 = window.web3;
        let contractOf = new caver.klay.Contract(
          goongyeContractAbi,
          googyeContractAddress
        );

        let publicSale = await contractOf.methods.publicprice().call();
        publicSale = caver.utils.fromPeb(publicSale);
        publicSale = publicSale * newNum;

        setTtlKlay(publicSale);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const decrement = async () => {
    if (noMints > 1) {
      try {
        let newNum = noMints - 1;

        setNomints(newNum);
        const web3 = window.web3;
        let contractOf = new caver.klay.Contract(
          goongyeContractAbi,
          googyeContractAddress
        );
        let publicSale = await contractOf.methods.publicprice().call();
        publicSale = caver.utils.fromPeb(publicSale);
        publicSale = publicSale * newNum;

        setTtlKlay(publicSale);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const mintAndStake = async () => {
    isLoading(true);
    if (acc == "No Wallet") {
      toast.error(t("NoWallet"));
      isLoading(false);
    } else if (acc == "Wrong Network") {
      toast.error(t("WrongNetwork"));
      isLoading(false);
    } else if (acc == "Connect Wallet") {
      toast.error(t("Connect"));
      isLoading(false);
    } else {
      try {
        const { klaytn } = window;
        let contractOf = new caver.klay.Contract(
          goongyeContractAbi,
          googyeContractAddress
        );
        let balance = await caver.klay.getBalance(acc);
        let ownerList = await contractOf.methods.walletOfOwner(acc).call();
        const length = ownerList.length;

        let publicSaleBool = await contractOf.methods.publicSale().call();

        if (publicSaleBool == true) {
          if (parseFloat(balance) > parseFloat(ttlKlay)) {
            ttlKlay = caver.utils.toPeb(ttlKlay);
            await contractOf.methods.publicMint(noMints).send({
              from: acc,
              value: ttlKlay,
              gas: "5000000",
            });
            isLoading(false);
            toast.success(t("transaction.Successfull"));
            dispalyImage();
            getTotalSupply();
          } else {
            toast.error(t("insufficient.Balance"));
            isLoading(false);
          }
        } else {
          toast.info("Public Minting is not started yet!");
        }
      } catch (e) {
        console.log(" Error while minting", e);
        toast.error(t("minting.Failed"));
        isLoading(false);
      }
      isLoading(false);
    }
  };

  const dispalyImage = async () => {
    try {
      let contractOf = new caver.klay.Contract(
        goongyeContractAbi,
        googyeContractAddress
      );
      if (acc) {
        let totalIDs = await contractOf.methods.walletOfOwner(acc).call();
        totalIDs = totalIDs.slice(-noMints);
        let imagesArray = [];
        totalIDs.forEach(async (ids) => {
          if (ids <= 8000) {
            let imageUrl = `/config/images/${ids}.jpg`;
            let imageName = `Common #${ids}`;
            imagesArray = [...imagesArray, { imageName, imageUrl }];
            setMintArray(imagesArray);
          } else {
            let imageUrl = `/config/images/${ids}.jpg`;
            let imageName = `King #${ids}`;
            imagesArray = [...imagesArray, { imageName, imageUrl }];
            setMintArray(imagesArray);
          }
        });
        setCollectionModalShow(true);
      }
    } catch (e) {
      console.log(" Error while displaying images", e);
    }
  };
  const salePrices = async () => {
    try {
      let contractOf = new caver.klay.Contract(
        goongyeContractAbi,
        googyeContractAddress
      );
      let publicSale = await contractOf.methods.publicprice().call();
      publicSale = caver.utils.fromPeb(publicSale);
      setSalePrice(publicSale);
    } catch (e) {
      console.log("error", e);
    }
  };
  const handleCLodemodal = () => {
    setCollectionModalShow(false);
    isLoading(false);
  };
  const getTotalSupply = async () => {
    try {
      let contractOf = new caver.klay.Contract(
        goongyeContractAbi,
        googyeContractAddress
      );

      let supply = await contractOf.methods.totalSupply().call();
      let publicSaleFlag = await contractOf.methods.publicSale().call();
      if (publicSaleFlag == true) {
        supply = 8000 - supply;
        setTotalSupply(supply);
      } else {
        supply = 8000 - supply;
        setTotalSupply(supply);
      }
    } catch (e) {
      console.log("error in getting supply", e);
    }
  };
  useEffect(() => {
    getInitialMintPrice();
  }, [acc]);
  useEffect(() => {
    salePrices();
    getTotalSupply();
  }, []);

  const array = [
    {
      image: Scene1,
      heading: t("storyCarousel.scene1"),
      heading: 'Ambition meets drive',
      para: 'We’re not afraid to make big plans, because we meet them with diligent effort.Constant optimization and the highest quality standards ensure end to end excellence.',
      // para: t("storyCarousel.para1"),
    },
    {
      image: Scene2,
      // heading: t("storyCarousel.scene2"),
      heading: 'Built for the real world',
      para: 'Ease of use is a significant hurdle in the use case of blockchain and crypto. We’re here to change that. Our games are for everyone, not just industry insiders or early adopters.',
      // para: t("storyCarousel.para2"),
    },
    {
      image: Scene3,
      heading: 'Community owned',
      // heading: t("storyCarousel.scene3"),
      para: 'We are 100% community-owned. Run by our presale of holders who will always keep the community and decentralization at the heart of what we do',
      // para: t("storyCarousel.para3"),
    },
    {
      image: Scene4,
      heading: t("storyCarousel.scene4"),
      para: t("storyCarousel.para4"),
    },
  ];
  useEffect(() => {
  }, [array]);
  return (
    <div className="home" id="home" >


      <section
        id="hero"
        className="d-flex align-items-center"
        data-aos="fade"
        data-aos-delay="0"
      >
        <div className="container position-relative text-center">
          <img
            src={Head}
            className="head-img pb-3 pt-5"
            data-aos="fade-down"
            data-aos-offset="0"
            alt=""
          />
          <h1 data-aos="fade-up" data-aos-offset="0">
            {t("landing.title")}
            <br />
            {/* {t("landing.subtitle")} */}
            future of
            blockchain
            gaming industry!
          </h1>
          <p className="text-light" data-aos="zoom-in" data-aos-offset="0">
            {/* {t("landing.para")} */}
            This is a lifetime opportunity for crypto enthusiasts to really invest in a solid crypto project.


            Let HPG transport you into the Gaming
            Metaverse and enter the future with
            play-to-earn gaming.
          </p>
          <h2 data-aos="fade-up" data-aos-offset="0">
            {t("landing.footerTitle")}
          </h2>
        </div>
      </section>

      <section id="story">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2>About</h2>
          </div>
          <div className="row pt-5">
            <div className="col-lg-6 img-part">
              <img
                src={Ape1}
                className=" img-1 img-fluid"
                data-aos="fade-up"
                data-aos-delay="400"
                alt=""
              />
              <img
                src={Ape2}
                className=" img-fluid img-2"
                data-aos="fade-up"
                data-aos-delay="600"
                alt=""
              />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0">
              <h3
                className="story-heading pb-2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {/* {t("stroy.background")} */}
                Our Mission:
              </h3>
              <p className="text-light" data-aos="fade-up" data-aos-delay="400">
                {/* {t("stroy.paraback1")} */}
                To bridge the gap between gaming and
                blockchain, giving players the ability to
                earn while playing.
              </p>
              <h3
                className="story-heading pb-2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Introduction
              </h3>
              <p className="text-light" data-aos="fade-up" data-aos-delay="600">
                {/* {t("stroy.paraback2")} */}
                Heedplay Gaming is a pioneering gaming company founded by a team of gaming and crypto enthusiasts with years of experience in these fields; passionate about taking the gaming industry to the next level by unleashing the tremendous potential of blockchain upon it.

                What sets HPG Gaming apart? Our richly designed games are set in galaxies and dimensions far from our own, with unique in-game assets our players can actually own. The decentralized Dark Metaverse empowers players and entitles them to in-game revenue.

                Alongside our talented team of in-software house designers, developers, and specialists, HPG Gaming is partnering with some of the world’s best gaming studios to execute a truly state-of-the-art yet accessible experience for gamers around the world.
              </p>
              <h3
                className="story-heading pb-2"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                {/* {t("story.story")} */}
                Marketing Plan
              </h3>
              <p
                className="text-light"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                {/* {t("story.parastory1")} */}
                - Influencers and Bloggers <br />
                - YouTube channels<br />
                - Crypto Channels<br />
                - Crypto Marketing Experts<br />
                - Social media<br />
                - Web Ads<br />
                - PR via Trusted Partners<br />
                - Channels & Influencers<br />
              </p>

            </div>
          </div>
        </div>
      </section>
      {/* jjj/....... */}
      <section id="scene">
        <div className="container">
          <OwlCarousel className="owl-theme" {...options1}>
            {array.map((item) => {
              return (
                <div className="col text-center text-light">
                  <div className="d-flex justify-content-center">
                    <img src={item.image} className="img img-fluid img-size" alt="scenc1" />
                  </div>

                  <div className="scene-text mt-4 d-flex justify-content-space-between flex-column">
                    <h4> {item.heading}</h4>
                    <p>{item.para}</p>
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </section>

      <section id="tokenomics">
        <div className="container">
          {/* <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-light">{t("tokenomics.title")}</h2>
          </div> */}
          <div
            className="row pt-4 top-section "
            data-aos="fade-up"
            data-aos-delay="300"
          // style={{border: "2px solid red"}}
          >
            <div className="col-md-4 img-box pb-4 text-center" >
              <img src={Crazy} alt="" className="img rounded pb-4" />
              <p> THE LIVING NFT</p>
              <p> PLAY & EARN GAME</p>
              {/* <p>
                <span className="blue">{t("tokenomics.card1balance")}</span>
                <span className="green">{t("tokenomics.manguni")}</span>
                {t("tokenomics.perday")}
              </p> */}
            </div>
            <div
              className="col-md-4 py-4 d-flex align-items-center justify-content-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {/* <img src={Breed} alt="" className="w-50" /> */}
            </div>
            <div
              className="col-md-4 img-box pb-4 text-center"
              data-aos="fade-up"
              data-aos-delay="900"
            >
              <img src={Crazy1} alt="" className="img1 pb-4" />
              <p>HeedPlay, is a decentralized deflationary token</p>
              {/* <p> {t("tokenomics.card2subTitle")}</p>
              <p>
                <span className="blue">{t("tokenomics.number2")}</span>
                <span className="green ms-1">{t("tokenomics.manguni")}</span>
                {t("tokenomics.perday")}
              </p> */}
            </div>
          </div>
          <div className="row pt-4 text-light desc" >
            <p>What's <span className="green">HPG</span> Token ?</p>
            <p data-aos="fade-up" data-aos-delay="100">
              <span className="green">HPG</span> Token is our main currency witch can be obtained by playing game modes and participating many other activities.
            </p>
            <ul data-aos="fade-up" data-aos-delay="200">
              <li>Special Events </li>
              <li>Expert Alliance</li>
              <li>Ranked Competition</li>
              <li>Staking</li>
              <li>PLAY TO EARN</li>
            </ul>
            <p data-aos="fade-up" data-aos-delay="200">
              Our goal is to let players enjoy the fun of the game and easily obtain revenue in <span className="green">HPG</span>.players can either earn <span className="green">HPG</span> token while playing or simply trade it and exchange .play to earn</p>
            <p data-aos="fade-up" data-aos-delay="200" className="green" style={{ fontWeight: "bold" }}>
              Blockchain Technology
            </p>
            <p data-aos="fade-up" data-aos-delay="300">
              With blockchain, we can imagine a world in which contracts are embedded in digital code and stored in transparent, shared databases, where they are protected from deletion, tampering, and revision. In this world every agreement, every process, every task, and every payment would have a digital record and signature that could be identified, validated, stored, and shared. Intermediaries like lawyers, brokers, and bankers might no longer be necessary. Individuals, organizations, machines, and algorithms would freely transact and interact with one another with little friction. This is the immense potential of blockchain.
            </p>
            <p data-aos="fade-up" data-aos-delay="400" className="green" style={{ fontWeight: "bold" }}>
              What Is My Risk?
            </p>
            <p data-aos="fade-up" data-aos-delay="500">
              There are risks associated with smart contracts. Please conduct your own research and due diligence before interacting with smart contracts on the Binance Smart Chain (BSC) . <span className="green">HPG</span> tokens are deployed on BSID and risks may include hacking and exploits. <span className="green">HPG</span> is not a registered broker, financial advisor, or analyst. Users should independently verify the information provided in this website. All information provided on this website are purely for educational purposes and does not constitute as any advice. We do not accept any liability for any loss or damages caused in reliance to the information or services provided in this website. There are risks associated trading in all markets. Do not trade or buy with money you cannot afford to lose. Like all other crypto currencies, HPG token may experience periods of volatility. When in doubt, please consult a financial advisor.
            </p>
          </div>
        </div>
      </section>

      {/* <section id="staking">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2> {t("Staking.1")}</h2>
          </div>
          <div className="row pt-4 text-light desc">
            <p data-aos="fade-up" data-aos-delay="100">
              {t("staking.parah1")}
            </p>
            <p data-aos="fade-up" data-aos-delay="200">
              {i18n.language == "en" ? (
                <>
                  {t("staking.parah2")}
                  <span className="blue pe-1 ps-1">
                    {t("tokenomics.card1balance")}
                  </span>
                  <span className="green pe-1"> {t("staking.MAGUNI")}</span>
                  <span className="blue">{t("staking.tokens")} </span>
                  {t("staking.day")}
                </>
              ) : (
                t("staking.parah2")
              )}
            </p>
            <p data-aos="fade-up" data-aos-delay="300">
              {i18n.language == "en" ? (
                <>
                  {t("staking.parah3")}
                  <span className="green ps-1 pe-1">{t("staking.MAGUNI")}</span>
                  <span className="blue pe-1">{t("staking.tokens")}</span>
                  {t("staking.parah4")}
                </>
              ) : (
                t("staking.parah3")
              )}
            </p>
          </div>
        </div>
      </section> */}

      <section id="nft">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-light">  HeedPlay NFT</h2>
            {/* <h2 className="text-light"> {t("nftCarousel.1")}</h2> */}
          </div>

          <OwlCarousel className="owl-theme" {...options2}>
            <div className="slide-img p-2">
              <img src={NFT1} alt="" />
            </div>
            <div className="slide-img p-2">
              <img src={NFT2} alt="" />
            </div>
            <div className="slide-img p-2">
              <img src={NFT3} alt="" />
            </div>
            <div className="slide-img p-2">
              <img src={NFT4} alt="" />
            </div>
            <div className="slide-img p-2">
              <img src={NFT5} alt="" />
            </div>
            <div className="slide-img p-2">
              <img src={NFT6} alt="" />
            </div>
          </OwlCarousel>

          <div
            className="cta text-center py-5"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <a
              // href=""

              className="btn-nft-cta"
            >
              {t("nftCarousel.2")}
            </a>
          </div>
        </div>
      </section>

      {/* <section id="mint">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2> {t("mint.1")}</h2>
          </div>
          <div className="row pt-5">
            <div
              className="col-md-6 px-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="fancy-list p-0">
                <img src={MintImage} alt="" className="img-fluid" />
                <ul className="pt-3">
                  <li>{t("mint.li1")}</li>
                  <li>{t("mint.li2")}</li>
                  <li>{t("mint.li3")}</li>

                </ul>
              </div>
            </div>
            <div
              className="col-md-6 mt-4 mt-md-0 px-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="mint-form">
                <div className="form-head py-3 px-3">
                  <div className="row">
                    <div className="col-9">
                      <h5 className="m-0">{t("mint.h3")}</h5>
                      <span>{t("mint.para1")}</span>
                    </div>
                    <div className="col-3 text-center">
                      <img
                        src={MintSmImage}
                        className="mint-sm-img rounded"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="form-desc p-3">
                  <p className="m-0">{t("mint.price")}</p>
                  <div className="d-flex  justify-content-between">
                    <p className="m-0">
                      <span className="green me-1">{salePrice}</span>
                      {t("mint.Each")}
                    </p>
                    <p className="m-0">
                      <span className="blue me-1">
                        {totalSupply
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      {t("mint.Remaining")}
                    </p>
                  </div>
                  {!playing ? (
                    <img
                      className="offIcon"
                      onClick={playingSound}
                      src={off}
                      alt="Sound Icon"
                    />
                  ) : (
                    <img
                      className="onIcon"
                      onClick={playingSound}
                      src={on}
                      alt="Sound Icon"
                    />
                  )}
                </div>

                <div className="form pt-3 px-3">
                  <div className="input-group p-2">
                    <button
                      className="btn-minus"
                      type="button"
                      id=""
                      onClick={() => decrement()}
                    >
                      <i className="bx bx-minus"></i>
                    </button>

                    <span className="number">{noMints}</span>
                    <button
                      className="btn-plus"
                      type="button"
                      id=""
                      onClick={() => increment()}
                    >
                      <i className="bx bx-plus"></i>
                    </button>
                    <span className="input-group-text form-control">
                      {t("mint.max")}
                    </span>
                  </div>
                  <hr className="my-3" />

                  <div className="total text-white">
                    <span className="text">{t("mint.Total")}</span>
                    <span className="value">
                      {ttlKlay} {t("mint.KLAY")}
                    </span>
                  </div>
                  <hr className="my-3" />

                  <div className="form-btn">
                    <button
                      className="form-control btn-connect mb-3"
                      onClick={() => onConnectAccount()}
                    >
                      {acc === "No Wallet"
                        ? t("NoWallet")
                        : acc === "Connect Wallet"
                          ? t("Connect")
                          : acc === "Wrong Network"
                            ? t("WrongNetwork")
                            : acc.substring(0, 4) +
                            "..." +
                            acc.substring(acc.length - 4)}
                    </button>
                    <div className="mintAndStake">
                      <button
                        className="form-control btn-mint mb-3 me-1"
                        onClick={() => mintAndStake()}
                      >
                        {loading ? (
                          <>
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="laoding ms-1">Loading...</span>
                          </>
                        ) : (
                          t("mint.Mint")
                        )}
                      </button>
                      <button
                        className="form-control btn-breeders mb-3 ms-1"
                        href="#stake"
                        onClick={() => changeStake()}
                      >
                        {loadingBreed ? (
                          <>
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="laoding ms-1">Loading...</span>
                          </>
                        ) : (
                          t("mint.breeding")
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="roadmap">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-light"> {t("Roadmap.1")}</h2>
          </div>
          <ul className="per_row">
            <li className="on" data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <span>{t("roadmap.5")}</span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.parah1")}
                      <span className="blue ms-1"> {t("roadmap.HeedPlay")}</span>
                    </>
                  ) : (
                    t("roadmap.para1")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="700"
              >
                <span>
                  <span>{t("roadmap.10")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      Start first to third
                      {/* {t("roadmap.parah2")} */}
                      <span className="blue ms-1"> pre-sale</span>
                    </>
                  ) : (
                    t("roadmap.para2")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="500">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="800"
              >
                <span>
                  <span>{t("roadmap.15")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      <span className="blue me-1">{t("roadmap.prize")}</span>
                      {t("roadmap.parah3")}
                    </>
                  ) : (
                    t("roadmap.para3")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <span>
                  <span>{t("roadmap.20")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      <span className="blue me-1">{t("roadmap.Start")}</span>
                      {t("roadmap.parah4")}
                    </>
                  ) : (
                    t("roadmap.para4")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="700"
              >
                <span>
                  <span>{t("roadmap.30")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.parah5")}
                      <span className="blue ms-1">{t("roadmap.People")}</span>
                    </>
                  ) : (
                    t("roadmap.para5")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="800"
              >
                <span>
                  <span>{t("roadmap.40")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.parah6")}
                    </>
                  ) : (
                    t("roadmap.para6")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <span>
                  <span>{t("roadmap.45")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.parah8")}
                      {t("roadmap.parah8.1")}
                    </>
                  ) : (
                    <>
                      {t("roadmap.para7")}

                      <br />

                      {t("roadmap.para7.1")}
                    </>
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="700"
              >
                <span>
                  <span>{t("roadmap.50")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.Purchase")}
                      <span className="blue ms-1 me-1">
                        {t("roadmap.parah9")}
                      </span>
                      {t("roadmap.parah10")}
                    </>
                  ) : (
                    t("roadmap.para8")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="500">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="800"
              >
                <span>
                  <span>{t("roadmap.60")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      <span className="blue me-1">{t("roadmap.parah11")}</span>
                      {t("roadmap.parah12")}
                    </>
                  ) : (
                    t("roadmap.para9")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <span>
                  <span>{t("roadmap.70")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {" "}
                      {t("roadmap.parah13")}
                      <span className="blue ms-1 me-1">
                        {t("roadmap.HeedPlay")}
                      </span>
                      {t("roadmap.parah14")}
                    </>
                  ) : (
                    t("roadmap.para10")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="700"
              >
                <span>
                  <span>{t("roadmap.75")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.Add")}
                      <span className="blue ms-1 me-1">
                        {t("roadmap.governance")}
                      </span>
                      {t("roadmap.parah15")}
                    </>
                  ) : (
                    t("roadmap.para11")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="500">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="800"
              >
                <span>
                  <span>{t("roadmap.80")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.conduct")}
                      <span className="blue me-1 ms-1">
                        {t("roadmap.parah16")}
                      </span>
                      {t("roadmap.parah17")}
                    </>
                  ) : (
                    t("roadmap.para12")
                  )}
                </div>
              </div>
            </li>
            <li className="on" data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <span>
                  <span>{t("roadmap.85")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.Open")}
                      <span className="blue ms-1">{t("roadmap.parah18")}</span>
                    </>
                  ) : (
                    t("roadmap.para13")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="400">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="700"
              >
                <span>
                  <span>{t("roadmap.90")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.Issue")}
                      <span className="blue ms-1 me-1">{t("roadmap.NFT")}</span>
                      {t("roadmap.parah19")}
                    </>
                  ) : (
                    t("roadmap.para14")
                  )}
                </div>
              </div>
            </li>
            <li data-aos="fade" data-aos-delay="500">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="800"
              >
                <span>
                  <span>{t("roadmap.95")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>
                      {t("roadmap.parah20")}
                      <span className="blue ms-1 me-1">
                        {t("roadmap.parah21")}
                      </span>
                      {t("roadmap.parah22")}
                    </>
                  ) : (
                    t("roadmap.para15")
                  )}
                </div>
              </div>
            </li>
            <li className="on last" data-aos="fade" data-aos-delay="300">
              <p
                className="per aos-init"
                data-aos="flip-left"
                data-aos-delay="500"
              >
                <span>
                  <span>{t("roadmap.100")}</span>
                </span>
              </p>
              <div className="box">
                <div>
                  {i18n.language == "en" ? (
                    <>{t("roadmap.parah23")}</>
                  ) : (
                    t("roadmap.para16")
                  )}
                </div>
              </div>
            </li>
          </ul>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="pt-3 text-center text-light"
          >
            {t("roadmap.foooter")}
          </div>
        </div>
      </section>

      <section id="team">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2>{t("team.para1")}</h2>
          </div>

          <OwlCarousel className="owl-theme" {...options3}>
            <div
              className="team-info p-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img src={PSSJ} alt="" />
              <h4 className="name pt-3" c>
              Shuchang
              </h4>
              <span className="pos">{t("team.para2")}</span>
            </div>
            <div
              className="team-info p-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img src={Zoe} alt="" />
              <h4 className="name pt-3" c>
              Lixin
              </h4>
              <span className="pos">{t("team.para3")}</span>
            </div>
            <div
              className="team-info p-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img src={Sophia} alt="" />
              <h4 className="name pt-3" c>
              Junfeng
              </h4>
              <span className="pos">{t("team.para4")}</span>
            </div>
            <div
              className="team-info p-2"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <img src={Abbey} alt="" />
              <h4 className="name pt-3" c>
              Haitao
              </h4>
              <span className="pos">{t("team.para5")}</span>
            </div>
          </OwlCarousel>
        </div>
      </section>

      <section id="Partners">
        <div className="fluid-container  text-center">
          <span className="sub-title">Partners Supported By</span>
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-lg-2 mt-2">
              <a href="" target="_blank"><img src={one} width="150px"/></a>
              </div>
              <div className="col-md-2 col-6 mt-3">
              <a href="https://coinsniper.net/coin/39947" target="_blank"><img src={two} width="150px"/></a>
              </div>
              <div className="col-md-2 col-6 mt-3">
              <a href="https://coinvote.cc/login" target="_blank"><img src={three} width="160px"/></a>
              </div>
              <div className="col-md-2 col-6 mt-3">
              <a href="https://gemfinder.cc/gem/11392" target="_blank"><img src={five} width="160px"/></a>
              </div>
              <div className="col-md-2 col-6 mt-3">
              <a href="https://foundico.com/" target="_blank"><img src={ten} width="120px"/></a>
              </div>
            
          </div>

        </div>

      </section>
      <section id="faq">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-light">{t("FAQ.1")}</h2>
          </div>
          <div className="row pt-4">
            <div className="accordion accordion-flush text-light" id="faqs">
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3>
                    {t("faq.parah1")}
                  </button>
                </span>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p> {t("faq.parah2")}</p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah3")}
                  </button>
                </span>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah4")}</p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah5")}
                  </button>
                </span>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>
                      {t("faq.parah6.1")}
                      <br />
                      {t("faq.parah6.2")}
                      <br />
                      {t("faq.parah6.3")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah7")}
                  </button>
                </span>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah8")}</p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3>
                    {t("faq.parah9")}
                  </button>
                </span>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFive"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah10")}</p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSix"
                    aria-expanded="false"
                    aria-controls="flush-collapseSix"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3>
                    {t("faq.parah11")}
                  </button>
                </span>
                <div
                  id="flush-collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingSix"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>
                      {t("faq.parah12.1")}

                      <br />
                      {t("faq.parah12.2")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSeven"
                    aria-expanded="false"
                    aria-controls="flush-collapseSeven"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah13")}
                  </button>
                </span>
                <div
                  id="flush-collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingSeven"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>
                      {t("faq.parah14.1")}

                      <br />
                      {t("faq.parah14.2")}

                      <br />
                      {t("faq.parah14.3")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingEight">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseEight"
                    aria-expanded="false"
                    aria-controls="flush-collapseEight"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah15")}
                  </button>
                </span>
                <div
                  id="flush-collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingEight"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah16")}</p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingNine">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseNine"
                    aria-expanded="false"
                    aria-controls="flush-collapseNine"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah17")}
                  </button>
                </span>
                <div
                  id="flush-collapseNine"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingNine"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah18")}</p>
                  </div>
                </div>
              </div>
              {/* <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingTen">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTen"
                    aria-expanded="false"
                    aria-controls="flush-collapseTen"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah19")}
                  </button>
                </span>
                <div
                  id="flush-collapseTen"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTen"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>
                      {t("faq.parah20.1")}

                      <br />
                      {t("faq.parah20.1")}
                    </p>
                  </div>
                </div>
              </div> */}
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingEleven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseEleven"
                    aria-expanded="false"
                    aria-controls="flush-collapseEleven"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah21")}
                  </button>
                </span>
                <div
                  id="flush-collapseEleven"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingEleven"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>
                      {t("faq.parah22.1")}

                      <br />
                      {t("faq.parah22.2")}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="accordion-header" id="flush-headingTwelve">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwelve"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwelve"
                  >
                    <h3 className="pe-3">{t("faq.Q")}</h3> {t("faq.parah23")}
                  </button>
                </span>
                <div
                  id="flush-collapseTwelve"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwelve"
                  data-bs-parent="#faqs"
                >
                  <div className="accordion-body d-flex flex-row align-items-baseline">
                    <h3 className="pe-3">{t("faq.A")}</h3>
                    <p>{t("faq.parah24")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        href="#top"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      {collectionModalShow ? (
        <Modal
          show={collectionModalShow}
          onHide={() => setCollectionModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="mintModal"
        >
          <Modal.Body
            className="model-image"
            style={{ border: "2px solid #FF5043" }}
          >
            <div className="minting d-flex justify-content-center" id="mint">
              <img className="lightImg" src={light} alt="" />
              <div className="imgArea mt-lg-0 mt-md-0 mt-sm-2">
                <img className="presalesTop-image" src={containerImage}></img>
                <span className="imgArea-text">{t("mint.1")}</span>
              </div>
              <div className=" container-presales-outside m-5 m-md-3 m-sm-2 ps-0 m-md-1 m-sm-1">
                <div className="container-presales m-1 p-lg-5 p-md-3">
                  <div className="row ">
                    <div className="connectBtnInPresale d-flex justify-content-end align-items-center">
                      <button
                        className="btnConnectInPresale  mt-2 mb-4"
                        onClick={() => onConnectAccount()}
                      >
                        {acc === "No Wallet"
                          ? t("NoWallet")
                          : acc === "Connect Wallet"
                            ? t("Connect")
                            : acc === "Wrong Network"
                              ? t("WrongNetwork")
                              : acc.substring(0, 4) +
                              "..." +
                              acc.substring(acc.length - 4)}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="row  mintRow">
                      <div className="col-12 mintCol">
                        <img className="congrtsBar" src={image1} />
                        <span className="textCongrts">
                          {t("modal.congratulation")}
                        </span>
                      </div>
                      <div className="col-12 mintCol mt-4">
                        <span className="heading">{t("modal.heading")}</span>
                      </div>
                      {mintArray.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="col-12 mintCol mt-4">
                              <img
                                className=" pt-4 pb-3"
                                width="240px"
                                src={item.imageUrl}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-12 mintCol mt-5 mb-5">
                        <button
                          className="btnStaking mt-2 me-2"

                          onClick={() => changeStake()}
                        >
                          {t("modal.staking")}
                        </button>
                        <button
                          className="btnBreeding mt-2 me-2"

                          onClick={() => changeStake()}
                        >
                          {t("staking.parabreed")}
                        </button>
                        <button
                          className="btnLater mt-2"
                          onClick={() => handleCLodemodal()}
                        >
                          {t("modal.later")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
