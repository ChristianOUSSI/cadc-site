# 🌓 Système Automatique de Changement de Thème - README

## 📌 Vue d'ensemble

Votre site **C.A.D.C.** dispose maintenant d'un système intelligent qui change automatiquement de thème selon l'heure de la journée:

- **6h - 18h** : 🌅 Thème JOUR (fond blanc)
- **18h - 22h** : 🌆 Thème SOIRÉE (fond gris)
- **22h - 6h** : 🌙 Thème NUIT (fond noir)

## 🚀 Démarrage Rapide

### Installation ✅ (DÉJÀ FAIT)

Les fichiers suivants ont été créés et intégrés:

```
✅ assets/js/theme-switcher.js      - Système principal
✅ assets/css/theme-auto.css         - Styles des thèmes
✅ index.html                        - Modifié pour inclure CSS + JS
✅ test-theme.html                   - Page de test
```

### C'est prêt! 🎉

Aucune action requise. Le site fonctionne immédiatement avec:
- Changement automatique toutes les minutes
- Transitions fluides (0.3 secondes)
- Support sur tous les navigateurs et appareils

## 🎨 Architecture

### Structure des Fichiers

```
global-master/
├── index.html
├── test-theme.html
│
├── assets/
│   ├── css/
│   │   ├── main.css              (Styles principaux)
│   │   ├── inline-extracted.css  (Styles inline)
│   │   └── theme-auto.css        ← 🆕 Thèmes
│   │
│   └── js/
│       ├── functions.js           (Logique du site)
│       ├── functions-min.js       (Version minifiée)
│       └── theme-switcher.js      ← 🆕 Système de thème
│
└── Documentation/
    ├── THEME_AUTO_DOCUMENTATION.md     (Doc complète)
    ├── INSTALLATION_THEME_AUTO.md      (Guide d'installation)
    ├── QUICKSTART_THEME.md             (Démarrage rapide)
    └── EXAMPLES_ADVANCED.js            (Exemples avancés)
```

## 🔧 Comment ça Marche

### Cycle de Fonctionnement

```
┌─────────────────────────────────────────┐
│ 1. Page se charge                       │
│    ↓                                    │
│ 2. theme-switcher.js s'initialise       │
│    ↓                                    │
│ 3. Détecte l'heure actuelle             │
│    ↓                                    │
│ 4. Applique le thème correspondant      │
│    ↓                                    │
│ 5. Ajoute la classe CSS au <body>       │
│    ↓                                    │
│ 6. Vérifie toutes les 60 secondes       │
│    ↓                                    │
│ 7. Si changement → transition fluide    │
└─────────────────────────────────────────┘
```

### Variables CSS Dynamiques

À chaque changement de thème, 7 variables CSS sont mises à jour:

```css
--theme-background  /* Couleur de fond */
--theme-text        /* Couleur du texte */
--theme-accent      /* Couleur d'accent (bleu) */
--theme-muted       /* Couleurs secondaires */
--theme-border      /* Bordures */
--theme-card        /* Fond des cartes */
--theme-shadow      /* Ombres */
```

Ces variables sont utilisées dans `theme-auto.css` pour appliquer les styles.

## 📊 Les Trois Thèmes Détaillés

### 🌅 JOUR (6h - 18h)

```
Fond:           #ffffff (blanc)
Texte:          #1a1a1a (gris foncé)
Accent:         #0f33ff (bleu)
Texte muted:    #666666 (gris)
Bordures:       #dddddd (gris clair)
```

**But**: Lisibilité maximale en plein jour

### 🌆 SOIRÉE (18h - 22h)

```
Fond:           #3a3a3a (gris)
Texte:          #ffffff (blanc)
Accent:         #0f33ff (bleu)
Texte muted:    #999999 (gris clair)
Bordures:       #555555 (gris foncé)
```

**But**: Transition progressive vers la nuit

### 🌙 NUIT (22h - 6h)

```
Fond:           #0c0c0c (noir)
Texte:          #ffffff (blanc)
Accent:         #0f33ff (bleu)
Texte muted:    #666666 (gris)
Bordures:       #282828 (gris très foncé)
```

**But**: Réduire la fatigue oculaire

## 💻 API JavaScript

### Accés Global

```javascript
window.themeSwitcher  // Instance du système
```

### Méthodes Principales

#### getThemeInfo()
```javascript
const info = window.themeSwitcher.getThemeInfo();
// Retourne:
// {
//   current: 'nuit',
//   time: '23:45',
//   colors: { background: '#0c0c0c', ... }
// }
```

#### getCurrentTheme()
```javascript
const theme = window.themeSwitcher.getCurrentTheme();
// Retourne l'objet thème complet
```

#### forceTheme(name)
```javascript
window.themeSwitcher.forceTheme('jour');
window.themeSwitcher.forceTheme('soirée');
window.themeSwitcher.forceTheme('nuit');
```

#### applyCurrentTheme()
```javascript
// Réappliquer le thème en fonction de l'heure actuelle
window.themeSwitcher.applyCurrentTheme();
```

### Événements Personnalisés

```javascript
document.addEventListener('themeChanged', (event) => {
  const { theme, colors, timestamp } = event.detail;
  console.log(`Thème changé: ${theme}`);
  console.log(`À ${timestamp.toLocaleTimeString()}`);
});
```

## 🧪 Tests

### Via la Console Navigateur (F12)

```javascript
// 1. Voir le thème actuel
window.themeSwitcher.getThemeInfo()

// 2. Tester les thèmes
window.themeSwitcher.forceTheme('jour')
window.themeSwitcher.forceTheme('soirée')
window.themeSwitcher.forceTheme('nuit')

// 3. Revenir à l'automatique
window.themeSwitcher.applyCurrentTheme()

// 4. Écouter les changements
document.addEventListener('themeChanged', e => console.log(e.detail))
```

### Via la Page de Test

Ouvrez `test-theme.html` pour une interface visuelle:
- Boutons pour changer de thème
- Affichage des couleurs
- Horloge en temps réel
- Informations détaillées

### Test Temporel

- À **6h**: Le site passe en thème JOUR
- À **18h**: Le site passe en thème SOIRÉE  
- À **22h**: Le site passe en thème NUIT

## 🎯 Éléments Affectés par le Thème

Tous les éléments suivants changent automatiquement de couleur:

- ✅ Arrière-plan du site
- ✅ Texte et titres
- ✅ Boutons et liens
- ✅ Bordures et séparations
- ✅ Ombres et profondeurs
- ✅ Formulaires et inputs
- ✅ Navigation et menus
- ✅ Cartes et conteneurs
- ✅ Tout ce qui utilise les variables CSS

## 🛠️ Personnalisation

### Modifier les Heures de Changement

Éditer `assets/js/theme-switcher.js`:

```javascript
const themes = {
  day: {
    startHour: 6,    // ← Changer l'heure de début
    endHour: 18,     // ← Changer l'heure de fin
    // ...
  },
  evening: {
    startHour: 18,
    endHour: 22,
    // ...
  },
  night: {
    startHour: 22,
    endHour: 6,
    // ...
  }
};
```

### Modifier les Couleurs

Éditer `assets/js/theme-switcher.js` ET `assets/css/theme-auto.css`:

**Dans le JavaScript**:
```javascript
colors: {
  background: '#ffffff',  // ← Modifier
  text: '#1a1a1a',       // ← Modifier
  accent: '#0f33ff',
  // etc...
}
```

**Dans le CSS**:
```css
body.theme-jour {
  --theme-background: #ffffff;  /* ← Adapter ici aussi */
  --theme-text: #1a1a1a;
  /* etc... */
}
```

### Ajouter un Nouveau Thème

1. **Dans `theme-switcher.js`**, ajouter à `this.themes`:
```javascript
afternoon: {
  name: 'afternoon',
  startHour: 14,
  endHour: 18,
  colors: { /* vos couleurs */ }
}
```

2. **Adapter `getCurrentTheme()`** pour inclure la nouvelle logique

3. **Dans `theme-auto.css`**, ajouter les styles:
```css
body.theme-afternoon {
  --theme-background: #...;
  /* ... */
}
```

## 📱 Compatibilité

| Navigateur | Version | Support |
|---|---|---|
| Chrome | 60+ | ✅ |
| Firefox | 55+ | ✅ |
| Safari | 12.1+ | ✅ |
| Edge | 79+ | ✅ |
| Mobile Safari | 13+ | ✅ |
| Chrome Android | 60+ | ✅ |

## 🔒 Performance & Sécurité

- **Léger** : ~10KB total (JS + CSS)
- **Rapide** : Vérification toutes les 60 secondes
- **Sans dépendances** : Aucune bibliothèque requise
- **Sûr** : Pas de données collectées
- **Local** : Tout fonctionne côté client

## 📚 Documentation

| Document | Contenu |
|---|---|
| `THEME_AUTO_DOCUMENTATION.md` | Documentation complète, API, variables CSS |
| `INSTALLATION_THEME_AUTO.md` | Guide d'installation détaillé |
| `QUICKSTART_THEME.md` | Démarrage rapide, TL;DR |
| `EXAMPLES_ADVANCED.js` | 10 exemples d'utilisation avancée |

## 🐛 Dépannage

### Le thème ne change pas

1. Vérifier l'heure système
2. Ouvrir la console (F12)
3. Exécuter: `window.themeSwitcher.getThemeInfo()`
4. Recharger la page (Ctrl+F5)

### Les couleurs ne correspondent pas

1. Vérifier que `theme-auto.css` est chargé (DevTools → Network)
2. Vérifier que les variables CSS sont définies (DevTools → Computed)
3. Vérifier l'heure actuelle et comparer avec les plages

### Les transitions ne sont pas lisses

1. Vérifier que `theme-auto.css` contient `.theme-transitioning`
2. Vérifier les paramètres de performance du navigateur
3. Tester sur un autre navigateur

## 🎓 Concepts Utilisés

- **Classes ES6** : OOP en JavaScript
- **Variables CSS** : Dynamique côté navigateur
- **Événements personnalisés** : Communication entre components
- **API Web** : getComputedStyle, classList
- **Animations CSS** : Transitions fluides
- **Responsive Design** : Fonctionne partout

## 📈 Améliorations Futures Possibles

- [ ] Détection du mode sombre du système d'exploitation
- [ ] Synchronisation avec la géolocalisation pour les heures de coucher/levée du soleil
- [ ] Préférences utilisateur sauvegardées
- [ ] Thèmes personnalisés créés par l'utilisateur
- [ ] Intégration avec les animations avancées

## 📞 Support

Pour plus de détails, consultez:
- `THEME_AUTO_DOCUMENTATION.md` - Documentation technique
- `EXAMPLES_ADVANCED.js` - Exemples pratiques
- `test-theme.html` - Interface de test

## 📝 Changelog

**v1.0** (2026-01-04)
- ✅ Système de thème automatique complet
- ✅ Trois thèmes (jour, soirée, nuit)
- ✅ Transitions fluides
- ✅ API JavaScript complète
- ✅ Variables CSS personnalisées
- ✅ Événements personnalisés
- ✅ Page de test interactive
- ✅ Documentation complète

## 👨‍💻 Développeur

Système créé par Assistant IA - Janvier 2026

## 📄 Licence

Même licence que le site C.A.D.C.

---

**Profitez de votre site avec son nouveau thème automatique!** 🌓✨
