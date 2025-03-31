require("dotenv").config();
const ethers = require("ethers");

// ABI et Bytecode (générés après compilation du contrat Solidity)
const contractABI = [
  "constructor()",
  "function mint(address to) public",
  "function totalMinted() public view returns (uint256)",
  "function setBaseURI(string memory baseURI) public",
];
const contractBytecode = "0xYourBytecodeHere"; // À remplacer après compilation

// Configuration du réseau (Rinkeby)
const provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Fonction pour déployer le contrat
async function deployContract() {
  const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("Contrat déployé à l'adresse :", contract.address);
  return contract;
}

// Fonction pour minter les NFT
async function mintNFTs(contractAddress, recipientAddress, totalToMint) {
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  for (let i = 0; i < totalToMint; i++) {
    const tx = await contract.mint(recipientAddress);
    await tx.wait();
    console.log(`NFT #${i} minté pour ${recipientAddress}`);
  }
  const totalMinted = await contract.totalMinted();
  console.log(`Total NFT mintés : ${totalMinted}`);
}

// Fonction principale
async function main() {
  const baseUri = "ipfs://QmXyZ123.../"; // Remplacez par votre CID IPFS réel
  const recipientAddress = "0xYourEthereumAddress"; // Votre adresse Ethereum

  // Déployer le contrat
  const contract = await deployContract();

  // Mettre à jour le baseUri (optionnel si déjà défini dans le constructeur)
  const txBaseUri = await contract.setBaseURI(baseUri);
  await txBaseUri.wait();
  console.log(`BaseURI mis à jour : ${baseUri}`);

  // Minter les 50 NFT
  await mintNFTs(contract.address, recipientAddress, 50);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });