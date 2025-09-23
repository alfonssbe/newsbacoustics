import * as React from 'react';
import LandingPageSBAcousticsClient from './(sbacoustics)/pageClient';

export default function LandingPageSBAcoustics() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SB Acoustics | Building Your Sound",
    "url": `${baseUrl}`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
    "sameAs": [
      "https://www.instagram.com/sbacoustics/",
      "https://www.facebook.com/sbacoustics/",
    ]
  };

  return (
    <>      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageSBAcousticsClient/>
    </>
  );
}
