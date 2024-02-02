//NOTE : Bien que les exemples prennent principalement des fonctions, tout type de variable peut être exporté/importé.

// Résolution des Chemins de Module:
// Les chemins relatifs commencent par './' ou '../'. Les chemins absolus pointent vers une URL complète.
// Le navigateur résout ces chemins pour charger le module. Assurez-vous que le serveur web configure correctement le type MIME.

// Importations nommées : utilisation de la syntaxe de déstructuration. Les noms doivent correspondre exactement.
import { namedImport1, namedImport2 } from "./modules/namedImport.js";

// Importation par défaut : le nom attribué lors de l'importation peut être choisi librement et n'a pas besoin de correspondre au nom dans le module.
import defaultImport from "./modules/defaultImport.js";

// Affichage en console pour confirmer le bon fonctionnement des importations.
console.log(
  namedImport1,
  namedImport2,
  "fonctionnent correctement ! Depuis le module namedImport.js."
);
defaultImport("Le module defaultImport.js fonctionne !");

// Le chargement paresseux (Lazy Loading) permet une amélioration de la performance en chargeant les modules seulement lorsque nécessaire.
// Attention : son utilisation inappropriée peut entraîner des saccades ("jank") sur le site.
if (true) {
  // Condition illustrative, à remplacer par une condition réelle selon le besoin.
  async function lazyLoading() {
    const module = await import("./modules/lazyLoading.js");
    console.log("Module chargé paresseusement :", module);
    module.default(); // Exécution de l'exportation par défaut du module.
  }
  lazyLoading();
}

// Chargement paresseux avec décomposition pour accéder directement à l'exportation par défaut.
async function loadLazyLoading2() {
  let { default: lazyLoading2 } = await import("./modules/lazyLoading.js");
  lazyLoading2();
}
loadLazyLoading2();

// Chargement paresseux en accédant à l'exportation par défaut après le chargement du module.
async function loadLazyLoading3() {
  let module = await import("./modules/lazyLoading.js");
  let lazyLoading3 = module.default;
  lazyLoading3();
}
loadLazyLoading3();

// Utilisation de la promesse avec .then() pour le chargement paresseux.
// Cette méthode offre une alternative à async/await pour gérer le chargement asynchrone.
import("./modules/lazyLoading.js").then((module) => {
  module.default(); // Exécution de l'exportation par défaut après le chargement du module.
});
