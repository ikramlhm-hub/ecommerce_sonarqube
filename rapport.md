# Rapport TP – Qualité, Sécurité et Maintenabilité du Code avec SonarQube

**Nom** : Ikram Lahmouri  
**Projet** : ecommerce-api (Node.js)  
**Date** : 24 Juin 2025  

---

## 1. Contexte et Objectifs Pédagogiques

Ce TP vise à comprendre l'impact des bugs cachés, des code smells et des failles de sécurité sur la qualité d’un projet logiciel. Il s'agit de pratiquer l'identification et la correction de problèmes dans un code existant, d’utiliser SonarQube pour une analyse automatique, et d’intégrer cette analyse dans un pipeline Git.

---

## 2. Analyse Manuelle du Code

J'ai commencé par analyser manuellement les fichiers principaux : `userController.js`, `auth.js`, `utils.js`.  

### Points détectés :  
- Erreur critique dans `auth.js` avec une affectation `=` au lieu d’une comparaison `===`, pouvant entraîner une faille d’autorisation.  
- Stockage des mots de passe en clair dans `userController.js`.  
- Validation d'entrée insuffisante (acceptation de chaînes vides ou mal formées).  
- Risque de faille XSS dans la fonction de liste des utilisateurs qui renvoyait des noms sans échappement HTML.  
- Duplication de code dans `utils.js` (deux fonctions de log très similaires).  
- Fonctions trop longues et peu modulaires dans `userController.js`.  

---

## 3. Corrections Apportées

### Sécurité et validation :  
- Remplacement du `=` par `===` dans `auth.js` pour corriger la logique d’autorisation.  
- Hashage des mots de passe via `bcrypt` dans `userController.js`.  
- Validation stricte des entrées utilisateurs (regex, contrôle de la chaîne vide).  
- Échappement des caractères HTML dans `listUsers` pour prévenir les attaques XSS.  

### Qualité du code :  
- Refactorisation des fonctions longues en fonctions plus courtes et cohérentes.  
- Fusion des fonctions de log en une fonction unique `logMessage` avec gestion des niveaux (`error` ou `info`).  
- Nettoyage des duplications et commentaires améliorés.  

---

## 4. Mise en Place de SonarQube

### Installation :  
- Installation de Java 11.  
- Téléchargement et lancement de SonarQube Community Edition en local.  
- Accès à l’interface web sur `http://localhost:9000` (admin/admin).  

### Configuration :  
- Création du projet `ecommerce_sonarqube` dans SonarQube.  
- Ajout du fichier `sonar-project.properties` à la racine avec les propriétés nécessaires (`sonar.projectKey`, `sonar.organization`, etc.).  
- Installation du scanner CLI SonarScanner et lancement de l’analyse via la commande `sonar-scanner`.  

### Résultats :  
- Détection automatique des bugs, vulnérabilités et code smells.  
- Visualisation claire des zones de code à améliorer.  
- Couverture de code à 72%, augmentée à 77% après ajout de tests unitaires.  
- Aucune faille critique restante après corrections.  

---

## 5. Tests Unitaires

J’ai écrit des tests unitaires pour valider le comportement des fonctions critiques :  

- `createUser` : vérification de la création utilisateur avec hash, validation des entrées.  
- `listUsers` : test d’échappement des noms utilisateurs (protection XSS).  
- Tests supplémentaires sur le middleware d’authentification.  

Ces tests ont permis de :  
- Augmenter la couverture de code.  
- S’assurer de la robustesse fonctionnelle des composants.  
- Faciliter la maintenance et les évolutions futures.  

---

## 6. Intégration Continue (Bonus)

J’ai lié mon dépôt GitHub à SonarCloud, et configuré un workflow GitHub Actions pour lancer automatiquement l’analyse SonarQube à chaque push.  

Cela garantit une supervision continue de la qualité, un retour rapide en cas de régressions, et une meilleure discipline de codage au sein de l’équipe.

---

## 7. Difficultés et Solutions

### Difficultés rencontrées :  
- Configuration initiale de SonarScanner, notamment gestion du token d’authentification.  
- Compatibilité entre modules ES et CommonJS dans Jest pour les tests unitaires.  
- Gestion des chemins de fichiers et de la couverture dans l’analyse.  

### Solutions apportées :  
- Ajout de la variable d’environnement `SONAR_TOKEN` et utilisation correcte du token d’accès.  
- Adaptation de la configuration Jest et Babel pour supporter les modules ES.  
- Correction des chemins dans `sonar-project.properties`.  

---

## 8. Conclusion et Apprentissage

Ce TP m’a permis de mieux comprendre l’importance de la qualité logicielle au-delà du simple fonctionnement.  

J’ai appris à repérer les erreurs cachées, à sécuriser les entrées, et à automatiser la surveillance qualité avec SonarQube.  

L’ajout des tests unitaires et l’intégration dans un pipeline CI renforcent la fiabilité et la maintenabilité du projet.  

Ce workflow correspond aux bonnes pratiques en entreprise, et me prépare à contribuer efficacement dans des environnements professionnels.

---

## 9. Liens Utiles

- Dépôt GitHub : https://github.com/ikramlhm-hub/ecommerce_sonarqube  
- Tableau de bord SonarCloud : https://sonarcloud.io/dashboard?id=ikramlhm-hub_ecommerce_sonarqube  

---

*Fin du rapport*
