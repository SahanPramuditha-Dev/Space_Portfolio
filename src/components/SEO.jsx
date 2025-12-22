import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = () => {
  return (
    <Helmet>
      <title>Sahan Pramuditha | Software Engineer & Creative Developer</title>
      <meta name="description" content="Sahan Pramuditha is a software engineer based in Sri Lanka, specializing in building (and occasionally designing) exceptional digital experiences. Currently focused on accessible, human-centered products." />
      <meta name="keywords" content="Software Engineer, Web Developer, React, Three.js, Portfolio, Sri Lanka, Frontend Developer" />
      <meta name="author" content="Sahan Pramuditha" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://sahanpramuditha.com/" />
      <meta property="og:title" content="Sahan Pramuditha | Software Engineer & Creative Developer" />
      <meta property="og:description" content="Building accessible, human-centered products with modern web technologies." />
      <meta property="og:image" content="https://sahanpramuditha.com/og-image.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://sahanpramuditha.com/" />
      <meta property="twitter:title" content="Sahan Pramuditha | Software Engineer & Creative Developer" />
      <meta property="twitter:description" content="Building accessible, human-centered products with modern web technologies." />
      <meta property="twitter:image" content="https://sahanpramuditha.com/og-image.png" />
    </Helmet>
  );
};

export default SEO;
