const basePath = process.cwd();
const { startCreating } = require(`${basePath}/src/main.js`); // Charge main.js du répertoire racine

// Exécute la génération
startCreating().catch((err) => console.error(err));