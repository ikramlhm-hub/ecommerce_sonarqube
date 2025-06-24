# TP – Qualité, Sécurité et Maintenabilité du Code avec SonarQube

**Nom** : Ikram Lahmouri  
**Projet** : ecommerce-api (Node.js)  
**Date** : 24 Juin 2025

---

## 1. Analyse manuelle des problèmes

Avant d’utiliser SonarQube, j’ai procédé à une revue attentive du code pour identifier les erreurs potentielles :

- Dans `auth.js`, une erreur critique : une affectation (`=`) était utilisée au lieu d’une comparaison stricte (`===`) dans une condition, causant une faille d’autorisation.  
- Dans `userController.js` :  
  - Les mots de passe étaient stockés en clair, ce qui représente un risque majeur de sécurité.  
  - La fonction `createUser` était trop longue et complexe, rendant la maintenance difficile.  
  - La validation des entrées utilisateur était insuffisante, limitée à une vérification simple d’égalité avec une chaîne vide.  
  - La fonction `listUsers` renvoyait les noms sans échappement, exposant à une faille XSS si les noms contenaient du code HTML.  
- Dans `utils.js`, les fonctions de logs étaient presque identiques, ce qui créait une duplication inutile, réduisant la clarté du code.

---

## 2. Corrections apportées

J’ai corrigé les points suivants en appliquant des bonnes pratiques de développement :

- Dans `auth.js` : correction de la comparaison pour utiliser `===` au lieu de `=`.  
- Dans `userController.js` :  
  - Ajout d’un hachage sécurisé des mots de passe via la librairie `bcrypt`.  
  - Validation complète et rigoureuse des entrées (type, longueur, contenu) pour éviter les injections et erreurs.  
  - Refactorisation de `createUser` en fonctions plus petites et lisibles.  
  - Ajout d’une fonction d’échappement HTML pour prévenir les failles XSS.  
- Dans `utils.js` : fusion des fonctions de logs en une fonction unique, plus claire et flexible.

---

## 3. Mise en place de SonarQube

J’ai installé SonarQube en local (avec Java 11 et version Community), puis :

- Créé et configuré le fichier `sonar-project.properties` à la racine du projet.  
- Utilisé le scanner CLI SonarScanner pour lancer l’analyse.  
- Consulté l’interface web SonarQube sur `http://localhost:9000`.  

Les analyses ont permis de confirmer les problèmes identifiés manuellement, mais aussi de détecter des soucis mineurs supplémentaires, notamment liés à la complexité et aux noms de variables.  
Après correction, l’état du projet est passé à une note **A**, avec zéro bug ou faille critique restante.

---

## 4. Intégration continue (bonus)

J’ai lié le dépôt GitHub à SonarCloud et ajouté un workflow GitHub Actions permettant :

- Le lancement automatique d’une analyse SonarCloud à chaque push.  
- Une surveillance continue de la qualité du code, facilitant le maintien d’un code propre et sécurisé.

---

## 5. Retour d’expérience

Ce TP m’a permis de réaliser à quel point des erreurs apparemment mineures peuvent avoir un impact majeur sur la sécurité et la qualité du code.  
L’utilisation de SonarQube apporte une visibilité précieuse et permet d’adopter une démarche qualité rigoureuse.  
Enfin, la mise en place d’un workflow CI avec SonarCloud reflète les pratiques professionnelles en entreprise, rendant cet apprentissage très concret et utile.

---

> Tous les fichiers corrigés, ainsi que ce rapport, sont disponibles sur mon dépôt GitHub.
