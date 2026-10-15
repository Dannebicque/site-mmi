---
title: "Déclaration d'accessibilité RGAA"
description: "Déclaration de conformité aux normes d'accessibilité numérique (RGAA 4.1) du site vitrine BUT MMI Troyes."
---

Le département **Métiers du Multimédia et de l'Internet (MMI)** de l'IUT de Troyes (Université de Reims Champagne-Ardenne) s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.

Cette déclaration d'accessibilité s'applique au site officiel du département : **https://mmi.iut-troyes.fr/**.

---

### État de conformité

Le site **BUT MMI Troyes** est **partiellement conforme** avec le Référentiel Général d’Amélioration de l’Accessibilité (RGAA), version 4.1.

#### Démarche d'accessibilité intégrée
- **Contraste des couleurs** : conformité stricte WCAG AA (ratio minimum de 4.5:1 pour les textes normaux, 7:1 pour les éléments d'accentuation en thème sombre et clair).
- **Navigation au clavier & focus** : indicateurs de focus visibles (`:focus-visible`), ordre de tabulation logique, lien d'évitement rapide vers le contenu principal (`skip-link`) et confinement du focus dans les fenêtres modales avec restitution au déclencheur.
- **Support des technologies d'assistance** : sémantique HTML5 native, attributs ARIA appropriés (`aria-pressed` sur les filtres, `aria-modal="true"` sur les boîtes de dialogue, `role="group"`).
- **Respect des préférences utilisateur** : prise en compte native de `prefers-reduced-motion` (neutralisation des animations et désactivation du défilement fluide forcé) et bascule de thème sombre / clair accessible.
- **Formulaire accessible** : labels explicites associés aux champs, attributs `autocomplete` conformes (`family-name`, `given-name`, `email`), gestion des retours d'envoi.

---

### Technologies utilisées pour la réalisation du site
- HTML5 sémantique
- CSS3 (Vanilla CSS avec variables CSS et requêtes média)
- JavaScript (Vanilla ECMAScript standard)
- Moteur de génération statique Hugo

---

### Voie de recours et retour d'information

Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou à une fonctionnalité du site, vous pouvez nous contacter :

- **Par formulaire en ligne** : [Formulaire de contact et d'accès](/contact/)
- **Par email** : [mmi-troyes@univ-reims.fr](mailto:mmi-troyes@univ-reims.fr)
- **Par téléphone** : +33 (0)3 25 42 46 46
- **Par courrier postal** : IUT de Troyes — Département MMI, 9 rue de Québec, CS 90396, 10026 Troyes Cedex

Si vous ne recevez pas de réponse satisfaisante, vous êtes en droit de saisir le **Défenseur des droits** :
- Réclamation en ligne sur [defenseurdesdroits.fr](https://formulaire.defenseurdesdroits.fr/)
- Contact par courrier gratuit (sans affranchissement) : Le Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07
