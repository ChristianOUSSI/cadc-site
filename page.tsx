"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  
  // Intégration des scripts inline de l'index.html (Etoiles filantes + Theme Toggle)
  useEffect(() => {
    // Gestion du bouton de changement de thème manuel
    const btn = document.getElementById('theme-toggle-btn');
    const themes = ['day', 'evening', 'night', 'storm'];
    
    const handleThemeToggle = () => {
      // Fonction pour obtenir le thème actuel (basé sur la classe body)
      const getCurrentThemeIndex = () => {
        for (let i = 0; i < themes.length; i++) {
          if (document.body.classList.contains('theme-' + themes[i])) return i;
        }
        return 2; // Default night
      };

      const currentIndex = getCurrentThemeIndex();
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      
      // Utiliser l'API themeSwitcher si disponible, sinon fallback manuel
      // @ts-ignore
      if (window.themeSwitcher && window.themeSwitcher.forceTheme) {
        // @ts-ignore
        window.themeSwitcher.forceTheme(nextTheme);
      }
      
      themes.forEach(t => document.body.classList.remove('theme-' + t));
      document.body.classList.add('theme-' + nextTheme);
    };

    if (btn) {
      btn.addEventListener('click', handleThemeToggle);
    }

    // Génération d'étoiles filantes aléatoires
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    document.body.appendChild(container);

    const scheduleStar = () => {
      if (!document.hidden) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 50 + '%'; 
        star.style.left = (Math.random() * 50 + 50) + '%'; 
        star.style.animation = `shooting ${Math.random() * 2 + 1}s linear forwards`;
        container.appendChild(star);
        
        setTimeout(() => { star.remove(); }, 4000);
      }
      setTimeout(scheduleStar, 5000 + Math.random() * 5000);
    };

    const starTimeout = setTimeout(scheduleStar, 1000);

    // Cleanup
    return () => {
      if (btn) btn.removeEventListener('click', handleThemeToggle);
      if (document.body.contains(container)) document.body.removeChild(container);
      clearTimeout(starTimeout);
    };
  }, []);

  return (
    <>
      <div className="perspective effect-rotate-left">
        <div className="container">
          <div className="outer-nav--return"></div>
          <div id="viewport" className="l-viewport">
            <div className="l-wrapper">
              <header className="header">
                <a className="header--logo" href="#0">
                  <img src="/assets/img/logo.svg" alt="CADC" loading="lazy" />
                  <p>C.A.D.C</p>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button id="theme-toggle-btn" aria-label="Changer de thème" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '5px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
                  </button>
                  <div className="header--nav-toggle" aria-label="Ouvrir le menu">
                    <span></span>
                  </div>
                </div>
              </header>
              <nav className="l-side-nav">
                <ul className="side-nav">
                  <li className="is-active"><span>Home</span></li>
                  <li><span>Qui sommes-nous</span></li>
                  <li><span>A propos</span></li>
                  <li><span>Contact</span></li>
                  <li><span>Ecrivez nous</span></li>
                </ul>
              </nav>
              <ul className="l-main-content main-content">
                <li className="l-section section section--is-active">
                  <div className="intro">
                    <div className="intro--banner">
                      <h1>Votre<br/>Aventure <br/>commence ici</h1>
                      <img src="/assets/img/introduction-visual.png" alt="Astronaute symbolisant l'exploration digitale" loading="lazy" />
                      <button className="cta">Ecrivez nous
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                          <path d="M12 4l-1.41 1.41 5.58 5.59H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                        <span className="btn-background"></span>
                      </button>
                    </div>
                    <div className="intro--options">
                      <a href="strategie.html">
                        <h3>Stratégie Digitale</h3>
                        <p>Audit & Conseil Digital</p>
                      </a>
                      <a href="developpement.html">
                        <h3>Développement</h3>
                        <p>Web & Mobile Sur Mesure</p>
                      </a>
                      <a href="design.html">
                        <h3>Design</h3>
                        <p>UI/UX & Identité Visuelle</p>
                      </a>
                    </div>
                  </div>
                </li>
                <li className="l-section section">
                  <div className="work">
                    <h2>Notre équipe</h2>
                    <div className="work--lockup">
                      <ul className="slider">
                        <li className="slider--item slider--item-left">
                          <a href="christian-oussi.html">
                            <div className="slider--item-image">
                              <img src="/assets/img/work-victory.jpg" alt="Christian OUSSI" loading="lazy" />
                            </div>
                            <p className="slider--item-title">Christian OUSSI</p>
                            <p className="slider--item-description">Directeur de la start-up C.A.D.C. <br/> Dev fullstack </p>
                          </a>
                        </li>
                        <li className="slider--item slider--item-center">
                          <a href="marc-laurent.html">
                            <div className="slider--item-image">
                              <img src="/assets/img/work-metiew-smith.jpg" alt="Marc Laurent" loading="lazy" />
                            </div>
                            <p className="slider--item-title">Marc Laurent</p>
                            <p className="slider--item-description">Expert Backend & Infrastructure</p>
                          </a>
                        </li>
                        <li className="slider--item slider--item-right">
                          <a href="axel-dupont.html">
                            <div className="slider--item-image">
                              <img src="/assets/img/work-alex-nowak.jpg" alt="Axel Dupont" loading="lazy" />
                            </div>
                            <p className="slider--item-title">Axel Dupont</p>
                            <p className="slider--item-description">Expert en UX/UI Design</p>
                          </a>
                        </li>
                        <li className="slider--item">
                          <a href="axel-dupont.html">
                            <div className="slider--item-image">
                              <img src="/assets/img/about-winners.jpg" alt="Axel Dupont" loading="lazy" />
                            </div>
                            <p className="slider--item-title">Axel Dupont</p>
                            <p className="slider--item-description">Expert en UX/UI Design <br/> Créativité & Innovation</p>
                          </a>
                        </li>
                        <li className="slider--item">
                          <a href="sarah-martin.html">
                            <div className="slider--item-image">
                              <img src="/assets/img/about-philosophy.jpg" alt="Sarah Martin" loading="lazy" />
                            </div>
                            <p className="slider--item-title">Sarah Martin</p>
                            <p className="slider--item-description">Community Manager & Growth <br/> Social Media Expert</p>
                          </a>
                        </li>
                      </ul>
                      <button className="slider--prev" type="button" aria-label="Précédent">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }}>
                        <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                          <path d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29 c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180 c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z"/>
                        </g>
                        </svg>
                      </button>
                      <button className="slider--next" type="button" aria-label="Suivant">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }}>
                        <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                          <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z"/>
                        </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                <li className="l-section section">
                  <div className="about">
                    <div className="about--banner">
                      <h2>Nous<br/>Croyons<br/>en des personnes<br/>passionnées</h2>
                      <a href="nos-clients.html" className="btn-clients">Nos clients
                        <span>
                          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }}>
                          <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                            <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z"/>
                          </g>
                          </svg>
                        </span>
                      </a>
                      <img src="/assets/img/about-visual.png" alt="About Us" loading="lazy" />
                      <img src="/assets/img/about-visual.png" alt="Portrait artistique symbolisant la passion" loading="lazy" />
                    </div>
                    <div className="about--options">
                      <a href="nos-projets.html">
                        <h3>Projets</h3>
                      </a>
                      <a href="nos-contrats.html">
                        <h3>Contrats</h3>
                      </a>
                      <a href="nos-realisations.html">
                        <h3>Réalisations</h3>
                      </a>
                    </div>
                  </div>
                </li>
                <li className="l-section section">
                  <div className="contact">
                    <div className="contact--lockup">
                      <div className="contact--grid">
                        <div className="contact--map">
                          <iframe
                            src="https://www.google.com/maps?q=Boulangerie+du+Lyc%C3%A9e,+Bonab%C3%A9ri,+Douala&z=17&output=embed"
                            width="100%" height="100%" style={{ border: 0, borderRadius: '12px' }} allowFullScreen loading="lazy" title="Carte Google Maps">
                          </iframe>
                        </div>
                        <div className="contact--info">
                          <div className="modal">
                            <div className="modal--information">
                              <h2 className="contact-title">Nous Contacter</h2>
                              <p className="contact-text">📍 Douala — Bonabéri, Cameroun</p>
                              <a href="mailto:CADC@gmail.com" className="contact-link">
                                ✉️ CADC@gmail.com
                              </a>
                              <a href="tel:+237691223916" className="contact-link">
                                📱 +237 691 223 916
                              </a>
                              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <a href="https://wa.me/237691223916?text=Bonjour%2C%20j%27aimerais%20discuter%20de%20vos%20services." target="_blank" rel="noopener noreferrer" className="contact-social-btn btn-whatsapp">
                                  💬 WhatsApp
                                </a>
                                <a href="mailto:CADC@gmail.com?subject=Nouvelle%20demande%20de%20service" className="contact-social-btn btn-email">
                                  📧 Email
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="l-section section">
                  <div className="hire">
                    <h2>Que voulez-vous de nous ?</h2>
                    <div className="hire--grid">
                      <div className="hire-card" style={{ animationDelay: '0s' }}>
                        <div className="hire-icon">🚀</div>
                        <h3>Développement</h3>
                        <p>Applications web et mobile</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20de%20Développement." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20Développement" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                      <div className="hire-card" style={{ animationDelay: '0.06s' }}>
                        <div className="hire-icon">🎨</div>
                        <h3>Design</h3>
                        <p>UI/UX et identité visuelle</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20de%20Design." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20Design" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                      <div className="hire-card" style={{ animationDelay: '0.12s' }}>
                        <div className="hire-icon">📊</div>
                        <h3>Stratégie</h3>
                        <p>Audit digital et conseil</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20de%20Stratégie." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20Stratégie" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                      <div className="hire-card" style={{ animationDelay: '0.18s' }}>
                        <div className="hire-icon">⚡</div>
                        <h3>Infrastructure</h3>
                        <p>Cloud, DevOps et architecture</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20d%27Infrastructure." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20Infrastructure" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                      <div className="hire-card" style={{ animationDelay: '0.24s' }}>
                        <div className="hire-icon">🤖</div>
                        <h3>IA & Automation</h3>
                        <p>Solutions intelligentes</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20d%27IA%20et%20Automation." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20IA%20et%20Automation" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                      <div className="hire-card" style={{ animationDelay: '0.30s' }}>
                        <div className="hire-icon">📱</div>
                        <h3>Growth Hacking</h3>
                        <p>Optimisation digitale</p>
                        <div className="hire-actions">
                          <a href="https://wa.me/237691223916?text=Bonjour%2C%20je%20suis%20intéressé%20par%20vos%20services%20de%20Growth%20Hacking." target="_blank" rel="noopener noreferrer" className="hire-btn whatsapp" title="Contacter via WhatsApp">💬</a>
                          <a href="mailto:CADC@gmail.com?subject=Demande%20de%20service%20-%20Growth%20Hacking" className="hire-btn email" title="Contacter par Mail">✉️</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="outer-nav">
          <li className="is-active">Home</li>
          <li>Qui sommes-nous ?</li>
          <li>A propos</li>
          <li>Contact</li>
          <li>Ecrivez nous</li>
        </ul>
      </div>
    </>
  );
}