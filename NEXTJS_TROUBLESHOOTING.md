# Dépannage : Page d'accueil sans CSS (Next.js / Vercel)

**Problème :** La page d'accueil (`/` ou `app/page.tsx`) s'affiche sans CSS, alors que les autres pages (ex: `/about`, `/contact`…) fonctionnent parfaitement.

C'est un problème très fréquent avec Next.js sur Vercel (surtout en App Router). Voici les causes et solutions :

## 1. globals.css n'est pas importé dans le layout racine

Dans l'App Router (`app/` directory), le fichier global doit être importé **exactement** dans `app/layout.tsx`.

```tsx
// app/layout.tsx
import './globals.css'; // ou chemin correspondant
```

Si tu n'as pas cet import → toutes les pages perdent le CSS.

## 2. Problème de cache / première charge / hydration (Très courant)

**Symptôme :** Page d'accueil sans style au 1ᵉʳ chargement, mais ok après navigation.

**Solution (Hack FOUC) :**
Ajouter ceci dans `app/layout.tsx` :
```tsx
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}
```

Ou forcer un re-deploy propre sur Vercel (supprimer `.next`, build local, push).

## 3. Tailwind config incomplet

Vérifier `tailwind.config.js` :
```javascript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
```

## 4. CSS Modules ou Styled-components

*   CSS Modules : vérifier que le fichier finit par `.module.css`.
*   Styled-components : vérifier la config Babel/Next.

## Checklist Diagnostic

1.  F12 -> Network -> Recharger. Les CSS sont-ils en 404 ?
2.  Test local : `npm run build` && `npm run start`.

## Questions pour le diagnostic

*   Tu es en App Router ou Pages Router ?
*   Tu utilises Tailwind ? Global CSS ?
*   Le build local fonctionne-t-il ?