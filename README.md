🛡️ OWASP ASVS Verification Manager (Angular 18)
Une plateforme interactive et intelligente conçue pour simplifier la vérification de la norme OWASP ASVS (Application Security Verification Standard). Cet outil permet aux auditeurs et développeurs de suivre la conformité de sécurité de leurs applications avec l'assistance de l'IA.

 Démo en direct : 

Fonctionnalités Clés
Dashboard Interactif : Visualisation en temps réel de la progression par catégories de sécurité.

Gestion des Exigences : Liste exhaustive des contrôles ASVS avec filtrage par niveau (L1, L2, L3).

IA Intégrée : Assistance intelligente (via Groq/HuggingFace) pour expliquer les contrôles et suggérer des méthodes de remédiation.

Interface Moderne : Design responsive, modaux détaillés et expérience utilisateur fluide.

Architecture Technique
Atomic Design Pattern
Le projet est structuré selon la méthodologie Atomic Design, garantissant une modularité et une réutilisabilité maximale des composants :

Atoms : Boutons, badges de statut, icônes.

Molecules : Cartes de statistiques, barres de progression.

Organisms : Grilles de catégories, panneaux d'analyse IA, modaux complexes.

Pages : Dashboard principal et vues de vérification.

Stack Technique
Framework : Angular 18 (Standalone Components).

Style : CSS3 avancé avec variables dynamiques (Theming).

IA : Intégration via SDK @google/generative-ai et @huggingface/inference.

Déploiement : CI/CD automatisé sur Netlify.

Sécurité & DevSecOps
Une attention particulière a été portée à la protection des secrets :

Injection de Secrets : Utilisation d'un script set-env.js lors du build CI/CD pour injecter les clés API sans les versionner sur GitHub.

Zéro-Leak : Configuration stricte du .gitignore pour protéger les fichiers d'environnement.

Normes : Respect des principes de sécurité défensifs dès la conception (Secure by Design).

🛠️ Installation et Développement
Prérequis
Node.js (v20+)

Angular CLI

Installation
Cloner le projet :

Installer les dépendances :

Lancer le serveur de développement :

Accédez à http://localhost:4200/.

📦 Build et Déploiement
Production
Le build est optimisé pour la production avec la commande :

Déploiement Netlify
Le projet est configuré pour Netlify via le fichier netlify.toml. Le build automatique exécute :

node set-env.js (génération des fichiers d'environnement).

ng build (compilation de l'application).

👨‍💻 Auteur
LABHEL /ILYASS : Développeur Front-end & Passionné de Cybersécurité