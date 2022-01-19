async function main() {
    const GanNFT = await ethers.getContractFactory("GanNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const ganNFT = await GanNFT.deploy()
    console.log("Contract deployed to address:", ganNFT.address)
}
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })

    
  