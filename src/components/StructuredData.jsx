import React from 'react';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sahan Pramuditha",
    "jobTitle": "Software Engineer & Creative Developer",
    "url": "https://sahanpramuditha.com",
    "sameAs": [
      "https://github.com/SahanPramuditha-Dev",
      "https://linkedin.com/in/sahanpramuditha",
      "https://twitter.com/sahanpramuditha"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK",
      "addressLocality": "Sri Lanka"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "SBIC"
    },
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "React",
      "Three.js",
      "Full-Stack Development"
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sahan Pramuditha Portfolio",
    "url": "https://sahanpramuditha.com",
    "author": {
      "@type": "Person",
      "name": "Sahan Pramuditha"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  );
};

export default StructuredData;
