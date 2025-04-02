const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;

// Configuration du canvas
const format = {
  width: 1000,
  height: 700,
};
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Configurations de métadonnées
const namePrefix = "Production Commune KSUNFT";
const description = "Nous sommes la communauté marchande de la Production Commune, répartie en six couches d’acteurs offreurs du Service SMCIPN Intérim Mévente Zéro. Chaque NFT représente un 'Acteur de l’Offre' (OI, OKSU, OBPSD, OBPS, OP, OT) ayant acheté son KSU, une boutique en ligne sur la plateforme GIE ESMC, garantissant une clientèle solvable et perpétuelle.";
const baseUri = "ipfs://YourCIDToReplace/";

const extraMetadata = {
  platform: "GIE ESMC",
  service: "SMCIPN Intérim Mévente Zéro",
};

// Définition des niveaux géographiques et leurs coûts (en trillions)
const franchiseLevels = {
  "Villages/Cantons": {
    count: 5200000,
    costs: {
      "Vague 0": 998.56,
      "1P V1": 1079,
      "1P V2": 1222,
      "1P V3": 1365,
      "2P V2": 1508,
      "2P V3": 1794,
      "Final": 2002,
    },
  },
  "Communes": {
    count: 1300000,
    costs: {
      "Vague 0": 249.64,
      "1P V1": 269.75,
      "1P V2": 305.5,
      "1P V3": 341.25,
      "2P V2": 377,
      "2P V3": 448.5,
      "Final": 500.5,
    },
  },
  "Districts": {
    count: 45000,
    costs: {
      "Vague 0": 8.64,
      "1P V1": 9.34,
      "1P V2": 10.58,
      "1P V3": 11.81,
      "2P V2": 13.05,
      "2P V3": 15.53,
      "Final": 17.33,
    },
  },
  "Régions/Provinces": {
    count: 7500,
    costs: {
      "Vague 0": 1.44,
      "1P V1": 1.56,
      "1P V2": 1.76,
      "1P V3": 1.97,
      "2P V2": 2.18,
      "2P V3": 2.59,
      "Final": 2.89,
    },
  },
  "Pays": {
    count: 197,
    costs: {
      "Vague 0": 0.03783,
      "1P V1": 0.04088,
      "1P V2": 0.0463,
      "1P V3": 0.05171,
      "2P V2": 0.05713,
      "2P V3": 0.06797,
      "Final": 0.07585,
    },
  },
  "Zones Monétaires": {
    count: 22,
    costs: {
      "Vague 0": 0.00422,
      "1P V1": 0.00457,
      "1P V2": 0.00517,
      "1P V3": 0.00578,
      "2P V2": 0.00638,
      "2P V3": 0.00759,
      "Final": 0.00847,
    },
  },
  "Continents": {
    count: 5,
    costs: {
      "Vague 0": 0.00096,
      "1P V1": 0.00104,
      "1P V2": 0.00118,
      "1P V3": 0.00131,
      "2P V2": 0.00145,
      "2P V3": 0.00173,
      "Final": 0.00193,
    },
  },
  "Monde": {
    count: 1,
    costs: {
      "Vague 0": 0.00019,
      "1P V1": 0.00021,
      "1P V2": 0.00024,
      "1P V3": 0.00026,
      "2P V2": 0.00029,
      "2P V3": 0.00035,
      "Final": 0.00039,
    },
  },
};

// Liste des niveaux pour associer aux 8 images
const levelOrder = [
  "Villages/Cantons",
  "Communes",
  "Districts",
  "Régions/Provinces",
  "Pays",
  "Zones Monétaires",
  "Continents",
  "Monde",
];

// Gestion des DNA pour éviter les doublons
const dnaList = new Set();

// Fonction pour nettoyer le répertoire de sortie
const cleanDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  } else {
    fs.readdirSync(dirPath).forEach((file) => fs.unlinkSync(`${dirPath}/${file}`));
  }
};

// Fonction pour générer un NFT
const generateNFT = async (level, amount) => {
  if (!franchiseLevels[level]) {
    console.error(`Niveau invalide : ${level}`);
    return;
  }

  let selectedWave = null;
  for (const [wave, cost] of Object.entries(franchiseLevels[level].costs)) {
    if (Math.abs(cost - amount) < 0.0001) {
      selectedWave = wave;
      break;
    }
  }
  if (!selectedWave) {
    console.error(`Montant invalide pour ${level} : ${amount}`);
    return;
  }

  const newDna = `${level}:${selectedWave}`;
  if (dnaList.has(newDna)) {
    console.log(`DNA déjà utilisé : ${newDna}`);
    return;
  }
  dnaList.add(newDna);

  const levelIndex = levelOrder.indexOf(level);
  const imageFileName = `${level.replace("/", "-")}.jpg`;
  const layerPath = `${layersDir}/Franchise/${imageFileName}`;
  let loadedImage;
  try {
    loadedImage = await loadImage(layerPath);
  } catch (e) {
    console.error(`Image introuvable pour ${level} : ${layerPath}`);
    return;
  }

  ctx.clearRect(0, 0, format.width, format.height);
  ctx.drawImage(loadedImage, 0, 0, format.width, format.height);

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`${level}`, 50, 50);
  ctx.fillText(`Coût: ${amount} T`, 50, 90);
  ctx.fillText(`Vague: ${selectedWave}`, 50, 130);

  const editionCount = dnaList.size;
  const imagePath = `${buildDir}/images/${editionCount}.png`;
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(imagePath, buffer);
  console.log(`NFT généré : ${imagePath} avec DNA ${newDna}`);

  const metadata = {
    name: `${namePrefix} - ${level} #${editionCount}`,
    description: description,
    image: `${baseUri}${editionCount}.png`,
    dna: newDna,
    attributes: [
      { trait_type: "Niveau", value: level },
      { trait_type: "Vague", value: selectedWave },
      { trait_type: "Coût", value: amount },
    ],
    ...extraMetadata,
  };
  fs.writeFileSync(
    `${buildDir}/json/${editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

// Fonction principale pour démarrer la génération
const startCreating = async () => {
  cleanDir(`${buildDir}/images`);
  cleanDir(`${buildDir}/json`);

  await generateNFT("Villages/Cantons", 998.56);
  await generateNFT("Communes", 269.75);
  await generateNFT("Districts", 10.58);
  await generateNFT("Régions/Provinces", 1.97);
  await generateNFT("Pays", 0.05713);
  await generateNFT("Zones Monétaires", 0.00759);
  await generateNFT("Continents", 0.00193);
  await generateNFT("Monde", 0.00019);

  console.log("Génération terminée !");
};

// Exporte startCreating pour index.js
module.exports = { startCreating };