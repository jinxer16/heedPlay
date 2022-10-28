
import React, { useEffect, useRef, useState } from "react";
import mint from "../media/ape-2.jpeg";
import klytn from "../media/klaytn-klay-logo 1.png";
import Web3 from "web3";
import containerImage from "../media/Group 48.png";
import { useSelector, useDispatch } from "react-redux";
import { connectionAction } from "../Redux/connection/actions";
// import Caver from "caver-js";
import copy from 'copy-to-clipboard';
import "./Presales.css";
import "../Staking/Staking.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// import { googyeContractAddress, goongyeContractAbi } from "../Utils/Goongye";
import { smsContractAbi, smsIdoContractAddress } from "../Utils/smsIdo";
import { busdTokenAddress, busdTokenAbi } from "../Utils/busdToken";
import Modal from "react-bootstrap/Modal";
import image1 from "../media/Vector3.png";
import light from "../media/light-from-top-background.png";
import { Navbar, Nav } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'
import { hpgTokenCOntractAbi, hpgTokenContractAddress } from "../Utils/hpgTokens";
import Countdown from 'react-countdown';
const webSupply = new Web3("https://bsc-dataseed1.binance.org");
export default function AppPresale({ changeStake }) {
  let acc = useSelector((state) => state.connect?.connection);
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(10);
  const [usersBusdBalance, setUsersBusdBalance] = useState(0);
  const [showRef, setShowRef] = useState("")
  const [loading, isLoading] = useState(false);
  const [collectionModalShow, setCollectionModalShow] = useState(false);
  let [mintArray, setMintArray] = useState([]);
  const [usersHPGdBalance, setusersHPGdBalance] = useState(0);
  const [ownerAddress, setOwnerAddress]= useState("Owner Address");
  const [hpgPrice, setHpgPrice]=useState(0);
  const [light, setLight] = useState(false);
  const [btnText, setBtnText]=useState("Buy")
  const [isBtn, setIsBtn] = useState(false)
  const referralAddress = useRef();
  const dispatch = useDispatch();
  const handlePlus = () => {
    setCount(count + 1);
  };
  const handleMinus = () => {
    if (count > 10) {
      setCount(count - 1);
    }
  };
  const [startTime, setStartTime] = useState(Date.now())
  const getTime = async () =>{
    try {
      const contractOf = new webSupply.eth.Contract(smsContractAbi, smsIdoContractAddress);
      const time = await contractOf.methods.Time().call();
      setStartTime(time)
    } catch (error) {
      console.error("error whiel get time", error);
    }
  }
  const Completionist = () => <h2 className="countdown">Sale is stopped!</h2>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
<div className="countdown">
     <div>
      <span className="number days">{days}</span>
      <span className="box_text">Days</span>
    </div>
     <div>
      <span className="number hours">{hours}</span>
      <span className="box_text">Hours</span>
    </div>
     <div>
      <span className="number minutes">{minutes}</span>
      <span className="box_text">Minutes</span>
    </div>
     <div>
      <span className="number seconds">{seconds}</span>
      <span className="box_text">Seconds</span>
    </div>
  </div>
      )
    }
  };
  const onConnectAccount = () => {
    dispatch(connectionAction());
  };
  const getData =async()=>{
    try{
      
      let contractOf = new webSupply.eth.Contract(
        smsContractAbi,
        smsIdoContractAddress
      );

      let ownAdd = await contractOf.methods.owner().call();
      let BUSDToHpgRate = await contractOf.methods.BUSDRate().call();
      setHpgPrice(BUSDToHpgRate)
      setOwnerAddress(ownAdd)

    }catch(e){
      console.log("Error while getting data",e)
    }

  }
  const getUserBalance = async () => {
    const web3 = window.web3;
    try {
      if (acc != "No Wallet" && acc != "Wrong Network" && acc != "Connect Wallet") {
        let busdContractOf = new web3.eth.Contract(
          busdTokenAbi,
          busdTokenAddress
        );
        let hpgContractOf = new web3.eth.Contract(hpgTokenCOntractAbi,hpgTokenContractAddress);
        let userBusdBal = await busdContractOf.methods.balanceOf(acc).call();
        userBusdBal = web3.utils.fromWei(userBusdBal);
        userBusdBal =parseFloat(userBusdBal).toFixed(2)
        setUsersBusdBalance(userBusdBal);
        let userHpgBal = await  hpgContractOf.methods.balanceOf(acc).call();
        userHpgBal = web3.utils.fromWei(userHpgBal);
        userHpgBal = parseFloat(userHpgBal).toFixed(2)
        setusersHPGdBalance(userHpgBal);
      }
    } catch (e) {
      console.log("error while getting Users balance", e);
    }
  };
 
  const handleCLodemodal = () => {
    setCollectionModalShow(false);
    isLoading(false);
  };
  const buyTokens = async () => {
    const web3 = window.web3;
    try {
      if (acc == "No Wallet") {
        toast.info("No Wallet");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        setBtnText("Wait...")
        setIsBtn(true)
        let userEntered = referralAddress.current.value;
        userEntered= userEntered.toString();
        let contractOf = new web3.eth.Contract(
          smsContractAbi,
          smsIdoContractAddress
        );
        let flag= false;
        let hpgTokenContractOf = new web3.eth.Contract(hpgTokenCOntractAbi,hpgTokenContractAddress);
        let busdTokenContractOf = new web3.eth.Contract(busdTokenAbi,busdTokenAddress);
        let contractBal = await hpgTokenContractOf.methods.balanceOf(smsIdoContractAddress).call();
          const isAdd = await contractOf.methods.getaddress(acc).call();
          const fakeAddress = "0x0000000000000000000000000000000000000000";
          if(isAdd != fakeAddress){
            userEntered = isAdd;
            flag=true;
          }else{
            const isAddagain = await contractOf.methods.CheckReferrals(userEntered).call();
            console.log("isAddagain", isAddagain);
            if(isAddagain){
              flag=true;
            }
          }
        contractBal = web3.utils.fromWei(contractBal);
        contractBal = parseFloat(contractBal).toFixed(2);
        if(userEntered.length>0){
          if(usersBusdBalance<=count){
            let estimatedToken = count*11
              if(contractBal>estimatedToken){
                if(flag == true){
                  if(userEntered==acc){
                    toast.info("You cannot be a referral of your Self")
                  }else{
                    let passingVar = web3.utils.toWei(count.toString());
                    await busdTokenContractOf.methods.approve(smsIdoContractAddress,passingVar).send({
                      from:acc
                    })
                    toast.success("Approved Successfully")
                    await contractOf.methods.buyTokens(passingVar, userEntered).send({
                      from: acc,
                    });
                    toast.success("Transaction Successfull")
                    setIsBtn(false)
                    setBtnText("Buy")
                    getRefferral();
                    getUserBalance();

                  }
                  
                }else{
                  setIsBtn(false)
                  setBtnText("Buy")
                  toast.info("The Entered Referral is not a valid Referral")
                }
                
              }else{
                setIsBtn(false)
                setBtnText("Buy")
                toast.info("Oops Contract out of balance .")
              }
           
          }else{
            setIsBtn(false)
            setBtnText("Buy")
            toast.info("You are out of balance please recharge!")
          }
        }else{
          setIsBtn(false)
          setBtnText("Buy")
          toast.info("The Referral Fields cannot be Empty!")
        }
      }
    } catch (e) {
      setIsBtn(false)
      setBtnText("Buy")
      console.log("Error While Buying Tokens", e);
    }
  };
  const userOwnerAsReferral=async()=>{
    try{
      let contractOf = new webSupply.eth.Contract(
        smsContractAbi,
        smsIdoContractAddress
      );

      let ownAdd = await contractOf.methods.owner().call();
      referralAddress.current.value =ownAdd;
    }catch(e){
      console.log("error while getting owners Address")
    }

  }

  const getRefferral = async ()=>{
    try {
     
      if (acc != "No Wallet" && acc != "Wrong Network" && acc != "Connect Wallet") {
        const fakeAddress = "0x0000000000000000000000000000000000000000";
        const web3 = window.web3;
        const contractOf = new web3.eth.Contract(
          smsContractAbi,
          smsIdoContractAddress
        );
        const refAddress = await contractOf.methods.getaddress(acc).call();
        if(refAddress != fakeAddress){
          const referral = `${window.location.host}/presale/?ref=${acc}`;
          setShowRef(referral)
          
        }else{
          const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('ref')
        let ownAdd = await contractOf.methods.owner().call();
        if(code == null){
          setShowRef(ownAdd)
        }else {
          let refAdd = await contractOf.methods.getaddress(code).call();
          if(fakeAddress != refAdd){
            setShowRef(code)
          }else{
            setShowRef(ownAdd)
          }
        }
        }
      }
    } catch (error) {
      console.error("error while get refferal", error);
    }
  }
  const setReferralAddress = async () => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('ref')
      let contractOf = new webSupply.eth.Contract(
        smsContractAbi,
        smsIdoContractAddress
      );
      let ownAdd = await contractOf.methods.owner().call();
      if(code == null){
        setOwnerAddress(ownAdd)
      }else {
        const fakeAddress = "0x0000000000000000000000000000000000000000";
        let refAdd = await contractOf.methods.getaddress(code).call();
        if(fakeAddress != refAdd){
          setOwnerAddress(code)
        }else{
          setOwnerAddress(ownAdd)
        }
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    setReferralAddress();
    getData()
    getTime();
  }, []);
  useEffect(() => {
    getUserBalance();
    getData();
    getRefferral()
  }, [acc]);
  return (
    
   
   
    <div className="staking d-flex justify-content-center mt-5" id="presale">
      <div className="imgArea ">
        <img className="stakingTop-image" src={containerImage}></img>
        <span className="imgArea-text">{t("Presales.1")}</span>
      </div>

      <div className="container container-staking-outside m-5 m-md-3 m-sm-2 ps-0 m-md-1 m-sm-1">
        <div className="container-fluid container-staking m-1 p-lg-5 p-md-3">
          <div className="row ">
            <div className="col-12 d-flex justify-content-start">

          <Countdown date={Date.now() + (((parseInt(startTime)  * 1000))-Date.now()) } renderer={renderer} />
          {/* <Countdown date={Date.now() + 5000} renderer={renderer}/> */}

            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btnConnectInPresale  mt-3 mb-1"
                onClick={onConnectAccount}
              >
                {acc === "No Wallet"
                  ? t("NoWallet")
                  : acc === "Connect Wallet"
                  ? t("Connect")
                  : acc === "Wrong Network"
                  ? t("WrongNetwork")
                  : acc.substring(0, 4) + "..." + acc.substring(acc.length - 4)}
              </button>
            </div>
          </div>
          {/* push */}
          <div className="row mt-5 d-flex justify-content-evenly g-0" >
            <div className="col-lg-4 col-md-12 col-sm-11  mintCard mintCardBody mt-3" >
              {/* <div className="mintCard" > */}
              <div className="row">
                <div className="col-12"  >
                <img src={mint} className="mintImage  img-fluid" alt="..." />
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-center">
              

              </div>
                <div className=" mintCardBody d-flex justify-content-start">
                
                  <ul className="" >
                    <li className="mt-1"> {t("presale.li1")}</li>
                    <li>{t("presale.li2")}</li>
                    <li>{t("presale.li3")}</li>
                    <li>{t("presale.li4")}</li>
                    <li>Use <a className="textColor" onClick={()=>userOwnerAsReferral()}> {ownerAddress?.substring(0, 4) + "..." + ownerAddress?.substring(ownerAddress?.length - 4)}
                    </a> as a referral if you have got no Referral.</li>

                  </ul>
                </div>
                {/* <div className="p-3">
                <div className=" row">
                        <span className="KLAYspan pe-2">
                        Referral Address
                        </span>
                      </div>
                      <div className="preslaesAdditionSection">
                    
                    <input
                      value={ownerAddress}
                      className="form-control"
                      style={{ backgroundColor: "black", border:"black", color: "#fff" }}
                    />
                  </div>
                </div> */}
              {/* </div> */}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-11  d-flex flex-column   mintCard2 p-2 mt-3" >
             
                    <div className="text-white mt-3">
                      <span className="textColor">Your Balance:</span>
                      </div>
                      <div className="text-white">
                        <span className="text-white me-1">BUSD :</span>
                      <span className="textColor"> {usersBusdBalance
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

                        
                      </div>
                      
                      <div className="text-white">
                        <span className="text-white me-1">HPG :</span>
                      <span className="textColor">{usersHPGdBalance
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

                      </div>
                      
                      <div className="mt-4">
                        <hr className="solid hori"></hr>
                      </div>
                      <div className="mintTotal">
                        <div>
                          <span className="totalSpan ps-2">
                            Min Buying
                          </span>
                        </div>
                        <div>
                          <span className="KLAYspan pe-2">
                            
                            <span className="textColor me-1">{hpgPrice}</span>
                            {t("mint.KLAY")}
                          </span>
                        </div>
                        
                      </div>
                      <br/>
                      <div className="mintTotal">
                        <div>
                          <span className="totalSpan ps-2">
                            {t("presale.price")}
                          </span>
                        </div>
                        <div>
                          <span className="KLAYspan pe-2">
                            
                            <span className="textColor me-1">0.10</span>
                            {t("mint.KLAY")}
                          </span>
                        </div>
                        
                      </div>
                      <div className="mt-5">
                        <hr className="solid hori"></hr>
                      </div>
                      <div className=" row">
                        <span className="KLAYspan pe-2">
                        My Referral Address
                        </span>
                      </div>
                      <div className="preslaesAdditionSection">
                    <input
                    disabled
                      ref={referralAddress}
                      value={showRef}
                      className="form-control"
                      style={{ backgroundColor: "black", border:"black", color: "#fff" }}
                    />
                  </div>
                  <div className="btnWalletStakeArea">
                        <div>
                          <button
                            className="btnMintPresale1 mt-3 mb-3 "
                            onClick={()=>{
                              copy(showRef)
                            }}
                          >
                            Copy
                          </button>
                        </div>
                       </div>
                      <div className=" mt-3 row">
                        <span className="KLAYspan pe-2">
                          {t("presale.Amount")}
                        </span>
                      </div>
                      <div className="preslaesAdditionSection mt-4 ">
                        <button
                          className="btnMinus btnMinusPresale"
                          onClick={handleMinus}
                        >
                          -
                        </button>
                        <span className="spanCount ">{count}</span>
                        <button
                          className="btnPlus btnPlusPresale"
                          onClick={handlePlus}
                        >
                          +
                        </button>
                      </div>

                      <div className="btnWalletStakeArea mt-4">
                        <div>
                          <button
                          disabled={isBtn}
                            className="btnMintPresale mt-3 mb-3 "
                            onClick={() => buyTokens()}
                          >
                            {btnText}
                          </button>
                        </div>
                       </div>
                        {/* </div> */}
                      {/* </div> */}
                    {/* </div> */}
                  {/* </div> */}
                  
            </div>
          </div>
        </div>
      </div>
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
}