const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

const namePrefix = "Production Commune KSUNFT";
const description = "Nous sommes la communauté marchande de la Production Commune, répartie en six couches d’acteurs offreurs du Service SMCIPN Intérim Mévente Zéro. Chaque NFT représente un 'Acteur de l’Offre' (OI, OKSU, OBPSD, OBPS, OP, OT) ayant acheté son KSU, une boutique en ligne sur la plateforme GIE ESMC, garantissant une clientèle solvable et perpétuelle.";
const baseUri = "ipfs://YourCIDToReplace/";

const solanaMetadata = {
  symbol: "PCNFT",
  seller_fee_basis_points: 1000,
  external_url: "https://www.esmcgie.com",
  creators: [
    {
      address: "YourEthereumAddress",
      share: 100,
    },
  ],
};

const layerConfigurations = [
  {
    growEditionSizeTo: 6,
    layersOrder: [
      { name: "communaute" },
    ],
  },
];

const shuffleLayerConfigurations = false;
const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "red",
  size: 30,
  xGap: format.width / 2, // Centre horizontal
  yGap: 20,              // Haut
  align: "center",       // Alignement centré
  baseline: "top",       // Baseline en haut
  weight: "bold",
  family: "Arial",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {
  platform: "GIE ESMC",
  service: "SMCIPN Intérim Mévente Zéro",
};

const rarityDelimiter = "#";
const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC",
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif
};