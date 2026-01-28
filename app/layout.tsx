import type { Metadata } from "next";
import Script from "next/script";

// 1. DÉPLACEZ VOS FICHIERS CSS DANS UN NOUVEAU DOSSIER `styles/`
// Puis, nous les importons ici pour qu'ils s'appliquent à tout le site.
import "@/styles/main.css";
import "@/styles/inline-extracted.css";
import "@/styles/theme-auto.css";
import "@/styles/custom-improvements.css";

// INTÉGRATION DU CORRECTIF CSS (Source: NEXTJS_TROUBLESHOOTING.md)
// Petit hack connu pour certains cas de FOUC (flash of unstyled content) sur la home
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

export const metadata: Metadata = {
  title: "C.A.D.C. - Agence Digitale Douala",
  description: "Site de l'agence digitale C.A.D.C. à Douala, Cameroun. Stratégie, Développement et Design.",
  icons: {
    apple: "/apple-touch-icon.png", // Assurez-vous que ce fichier est dans le dossier `public/`
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
        <link rel="manifest" href="/manifest.json" />
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css' />
      </head>
      {/* La classe "loading" du body original est conservée */}
      <body className="loading">
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

        {/* 2. DÉPLACEZ VOS FICHIERS JS DANS UN NOUVEAU DOSSIER `public/scripts/` */}
        {/* Les scripts sont chargés de manière optimisée avec Next.js */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
          strategy="afterInteractive"
        />
        <Script src="/scripts/theme-switcher.js" strategy="afterInteractive" />
        <Script src="/scripts/functions-min.js" strategy="afterInteractive" />
        <Script src="/scripts/custom.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/scripts/gsap-animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}