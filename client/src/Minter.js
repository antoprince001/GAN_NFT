import { useEffect, useState } from "react";

import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ganImg,setGanImg] = useState("");
  
  useEffect(async () => {
  
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 

    addWalletListener(); 
}, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(ganImg, name, description);
    setStatus(status);
};

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const generateImage = ()=>{
  
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
    
  
  fetch("http://127.0.0.1:5000/generate", requestOptions)
  .then(response => response.json())
  .then(result =>  {
    setGanImg(result.datum)
    console.log(result)})
  .catch(error => console.log('error', error));

  }
  return (

    <div className="Minter">
      <h1 id="title">🧙‍♂️ Generative NFT Minter</h1>

      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>
        Generate Modern ART using DCGAN for Asset 
      </p>
      <img width='400' height='400' alt="To be Generated..." src={`data:image/png;base64,${ganImg}`} /> 
      <br></br><br></br>
      <button id="generator" onClick={generateImage}>
        Generate
      </button>
     <br></br>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Asset Data: </h2>
        {/* <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        /> */}
        <h2>{ ganImg === ""? "Yet to generate" : ganImg.substring(0,30)+"..." }</h2>
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g Describe the art generated by AI ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
