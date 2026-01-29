/**
 * Fichier d'animations GSAP personnalisées pour C.A.D.C.
 */

document.addEventListener('DOMContentLoaded', () => {
  // S'assurer que GSAP et ScrollTrigger sont bien chargés avant de continuer
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded.');
    return;
  }

  // Enregistrer le plugin ScrollTrigger pour pouvoir l'utiliser
  gsap.registerPlugin(ScrollTrigger);

  console.log('GSAP and ScrollTrigger are ready. Initializing animations...');

  // --- VOS ANIMATIONS PERSONNALISÉES COMMENCENT ICI ---

  // Exemple 1: Animation d'apparition des sections au défilement
  const sections = gsap.utils.toArray('.l-section');

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%', // Démarre quand le haut de la section atteint 85% du viewport
        end: 'bottom 15%',
        toggleActions: 'play none none none', // Joue l'animation une seule fois à l'entrée
        // markers: true, // Décommenter pour voir les marqueurs de debug
      },
      opacity: 0,
      y: 50, // La section arrive de 50px plus bas
      duration: 1.2,
      ease: 'power3.out',
    });
  });

  // Exemple 2: Animation sur le titre de la section d'introduction
  gsap.from('.intro h1', {
    delay: 0.5, // Délai après le chargement de la page
    duration: 1.5,
    y: 30,
    opacity: 0,
    ease: 'expo.out'
  });
});