import React, { useEffect } from 'react';

const SEO = () => {
  useEffect(() => {
    document.title = 'Sahan Pramuditha | Software Engineer & Creative Developer';
    const tags = [
      ['meta', { name: 'description', content: 'Sahan Pramuditha is a software engineer based in Sri Lanka, specializing in building (and occasionally designing) exceptional digital experiences. Currently focused on accessible, human-centered products.' }],
      ['meta', { name: 'keywords', content: 'Software Engineer, Web Developer, React, Three.js, Portfolio, Sri Lanka, Frontend Developer' }],
      ['meta', { name: 'author', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['link', { rel: 'canonical', href: 'https://sahanpramuditha.com/' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: 'https://sahanpramuditha.com/' }],
      ['meta', { property: 'og:title', content: 'Sahan Pramuditha | Software Engineer & Creative Developer' }],
      ['meta', { property: 'og:description', content: 'Building accessible, human-centered products with modern web technologies.' }],
      ['meta', { property: 'og:image', content: 'https://sahanpramuditha.com/og-image.png' }],
      ['meta', { property: 'og:site_name', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:url', content: 'https://sahanpramuditha.com/' }],
      ['meta', { name: 'twitter:title', content: 'Sahan Pramuditha | Software Engineer & Creative Developer' }],
      ['meta', { name: 'twitter:description', content: 'Building accessible, human-centered products with modern web technologies.' }],
      ['meta', { name: 'twitter:image', content: 'https://sahanpramuditha.com/og-image.png' }],
    ];
    const created = [];
    for (const [tagName, attrs] of tags) {
      const el = document.createElement(tagName);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      created.push(el);
    }
    return () => {
      for (const el of created) document.head.removeChild(el);
    };
  }, []);
  return null;
};

export default SEO;
