import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";

import "@/styles/main.css";
// import "@/styles/inline-extracted.css";
import "@/styles/theme-auto.css";
import "@/styles/custom-improvements.css";
import "@/styles/slider-fix.css";

// Gestion du FOUC (Flash of Unstyled Content)
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "C.A.D.C. - Agence Digitale Douala",
  description: "Site de l'agence digitale C.A.D.C. à Douala, Cameroun. Stratégie, Développement et Design.",
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f33ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`loading ${montserrat.className}`}>
        {/* ÉCRAN DE CHARGEMENT (SPLASH SCREEN) PERSONNALISÉ */}
        <div
          id="custom-splash-screen"
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#0c0c0c", // Doit correspondre au background_color du manifest.json
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.6s ease-out, visibility 0.6s ease-out",
          }}
        >
          <img
            src="/assets/img/logo.svg"
            alt="CADC Logo"
            width="100"
            height="100"
            style={{ marginBottom: "20px", filter: "drop-shadow(0 0 10px rgba(90, 124, 255, 0.5))" }}
          />
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(90, 124, 255, 0.2)",
              borderTop: "3px solid #5a7cff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              body.loading { overflow: hidden; }
            `
          }} />
        </div>

        {children}

        {/* Enregistrement du Service Worker pour la PWA */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />

        {/* Gestion de la disparition du Splash Screen */}
        <Script
          id="splash-screen-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const splash = document.getElementById('custom-splash-screen');
                if (splash) {
                  setTimeout(() => {
                    splash.style.opacity = '0';
                    splash.style.visibility = 'hidden';
                    document.body.classList.remove('loading');
                  }, 800); // Délai pour assurer une transition fluide
                }
              });
            `,
          }}
        />

        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/js/theme-switcher.js" strategy="afterInteractive" />
        <Script src="/assets/js/functions-min.js" strategy="afterInteractive" />
        <Script src="/assets/js/custom.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap-animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}