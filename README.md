# GAN_NFT
React and Flask based website to generate modern art using Generative Adversarial Network and mint it as a NFT in Ethereum

## Generative Adversarial Network
DCGAN model developed using PyTorch is trained on Modern Art dataset and an endpoint is setup in Flask to generate an image and return base64 encoded data of the image.

![Screenshot 2022-01-19 23 09 40](https://user-images.githubusercontent.com/47826916/150188325-401cad06-5eb5-4fca-bad2-e726c78b2b7d.png)

## NFT
ERC-721 Smart Contract for Non Fungible Token is developed using Solidity and deployed to the Kovan Testnet.

## Integration Layer
React website calls the Flask endpoint and pins the metadata of the art to InterPlanetary File System (IPFS) using Pinata API.

The IPFS hash generated is sent as argument to call the Mint function of the smart contract using Alchemy API with MetaMask cryptowallet to complete the transaction.

![Screenshot 2022-01-19 23 09 56](https://user-images.githubusercontent.com/47826916/150188389-229b5699-c135-4043-a54d-29bef3bef43a.png)

NFT Transaction : https://kovan.etherscan.io/tx/0x1f1ac117179adbdac13a1740722502f4240e19e435aeffb6c8e0a524975daea9
