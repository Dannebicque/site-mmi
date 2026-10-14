# BUT MMI Troyes — Site Web

Site web vitrine du BUT Métiers du Multimédia et de l'Internet (MMI) de l'IUT de Troyes (Université de Reims Champagne-Ardenne), développé avec le générateur de site statique **Hugo**.

## 🚀 Démarrage rapide

### Prérequis
- [Hugo](https://gohugo.io/) (version `extended` recommandée) installé sur votre machine :
  ```bash
  brew install hugo
  ```

### Développement local (avec rechargement à chaud)
```bash
hugo server
```
Le site sera accessible sur `http://localhost:1313/`.

### Génération de la version de production
```bash
hugo
```
Les fichiers statiques finaux (HTML minifié, CSS avec fingerprinting et SRI) sont générés dans le dossier `public/`.

---

## 📁 Architecture du projet Hugo

```
site-mmi/
├── hugo.toml              # Configuration principale (métadonnées, menus, variables)
├── assets/
│   └── css/site.css       # Styles CSS traités par Hugo Pipes (minification, empreinte)
├── content/
│   └── _index.md          # Métadonnées de la page d'accueil
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # Structure HTML globale (head, body, skip-link, header, footer)
│   │   ├── list.html      # Modèle pour les pages de liste
│   │   └── single.html    # Modèle pour les pages simples (mentions légales, contact, etc.)
│   ├── index.html         # Assemblage de la page d'accueil à partir des sections
│   └── partials/
│       ├── head.html      # Balises meta, OpenGraph, JSON-LD, polices et lien CSS
│       ├── header.html    # Barre de navigation
│       ├── footer.html    # Pied de page avec liens partenaires et légaux
│       └── sections/      # Sections modulaires de la page d'accueil
│           ├── hero.html          # Bannière hero avec logos et terminal animé
│           ├── strip.html         # Ruban des compétences / chips
│           ├── competences.html   # Grille des 7 compétences clés
│           ├── projet.html        # Parcours projet de A à Z (5 étapes)
│           ├── ia.html            # Section IA et terminal diff
│           ├── parcours.html      # Les 3 années et les voies (initiale / alternance)
│           ├── anciens.html       # Témoignages des alumni
│           └── candidater.html    # Parcoursup, eCandidat et Journées Portes Ouvertes
└── static/
    ├── css/site.css       # Fallback CSS statique
    └── images/            # Logos et visuels (logo_mmi.png, logo-urca.jpg)
```

## ⚙️ Personnalisation (`hugo.toml`)

- **Couleur d'accentuation** : modifier `params.accent` (par défaut `#B8F53D`)
- **Date JPO** : modifier `params.jpo_date` et `params.jpo_text`
- **Liens de candidature et partenaires** : section `[params.urls]`
- **Navigation principale** : section `[[menu.main]]`
