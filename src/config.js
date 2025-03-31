const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth; // Réseau Ethereum

// Métadonnées générales pour Ethereum
const namePrefix = "Production Commune KSUNFT"; // Nom de la collection
const description = "Nous sommes la communauté marchande de la Production Commune, répartie en six couches d’acteurs offreurs du Service SMCIPN Intérim Mévente Zéro. Chaque NFT représente un 'Acteur de l’Offre' (OI, OKSU, OBPSD, OBPS, OP, OT) ayant acheté son KSU, une boutique en ligne sur la plateforme GIE ESMC, garantissant une clientèle solvable et perpétuelle.";
const baseUri = "ipfs://YourCIDToReplace/"; // À remplacer par le CID IPFS après upload

// Métadonnées Solana (ignorées ici car network = eth)
const solanaMetadata = {
  symbol: "PCNFT",
  seller_fee_basis_points: 1000, // 10% de royalties (optionnel pour Ethereum via contrat)
  external_url: "https://www.esmcgie.com",
  creators: [
    {
      address: "YourEthereumAddress", // Remplacez par votre adresse Ethereum
      share: 100,
    },
  ],
};

// Configuration des couches basée sur les 6 types d'acteurs
// const layerConfigurations = [
//   {
//     growEditionSizeTo: 5,
//     layersOrder: [
//       { name: "Background" },
//       { name: "Eyeball" },
//       { name: "Eye color" },
//       { name: "Iris" },
//       { name: "Shine" },
//       { name: "Bottom lid" },
//       { name: "Top lid" },
//     ],
//   },
// ];

const layerConfigurations = [
  {
    growEditionSizeTo: 2, // Nombre total de NFT
    layersOrder: [
      { name: "communaute" }, // Fond visuel
    //  { name: "logo" }, // OI, OKSU, OBPSD, OBPS, OP, OT
      
    ],
  },
];

const shuffleLayerConfigurations = false; // Pas de mélange des configurations
const debugLogs = false; // Pas de logs détaillés

// Format des images
const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

// Configuration GIF (désactivée par défaut)
const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

// Configuration texte (désactivée par défaut)
const text = {
  only: false, // Le texte s'ajoute à l'image, ne remplace pas
  color: "#ffffff",
  size: 30,
  xGap: 20,
  yGap: 20,
  align: "left",
  baseline: "top",
  weight: "bold",
  family: "Arial",
  spacer: " => ",
};

// Pixelisation
const pixelFormat = {
  ratio: 2 / 128, // Ratio pour effet pixelisé (ajustable)
};

// Fond
const background = {
  generate: true, // Fond aléatoire
  brightness: "80%",
  static: false,
  default: "#000000",
};

// Métadonnées supplémentaires
const extraMetadata = {
  platform: "GIE ESMC",
  service: "SMCIPN Intérim Mévente Zéro",
};

// Rareté
const rarityDelimiter = "#"; // Séparateur pour les poids de rareté
const uniqueDnaTorrance = 10000; // Tolérance pour éviter les doublons

// Aperçu statique
const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

// Aperçu GIF
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