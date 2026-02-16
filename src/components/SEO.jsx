import React, { useEffect } from 'react';

const SEO = () => {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const title = 'Sahan Pramuditha | Software Engineer & Creative Developer';
    const description = 'Sahan Pramuditha is a software engineer based in Sri Lanka, specializing in building exceptional digital experiences. Focused on accessible, human-centered products.';
    const ogImage = `${siteUrl}/favicon.svg`;
    const twitterHandle = '@sahanpramuditha';
    document.title = title;
    const tags = [
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'title', content: title }],
      ['meta', { name: 'application-name', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'creator', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'publisher', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'keywords', content: 'Software Engineer, Web Developer, React, Three.js, Portfolio, Sri Lanka, Frontend Developer' }],
      ['meta', { name: 'author', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['link', { rel: 'canonical', href: siteUrl }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: siteUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:site_name', content: 'Sahan Pramuditha' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:url', content: siteUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      ['meta', { name: 'twitter:site', content: twitterHandle }],
      ['meta', { name: 'twitter:creator', content: twitterHandle }],
      ['meta', { itemprop: 'name', content: title }],
      ['meta', { itemprop: 'description', content: description }],
      ['meta', { itemprop: 'image', content: ogImage }],
    ];
    const created = [];
    for (const [tagName, attrs] of tags) {
      const el = document.createElement(tagName);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
      created.push(el);
    }
    const ldPerson = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sahan Pramuditha',
      url: siteUrl,
      jobTitle: 'Software Engineer',
      sameAs: [
        'https://github.com/SahanPramuditha-Dev',
        'https://linkedin.com/in/sahanpramuditha',
        'https://twitter.com/sahanpramuditha'
      ],
      knowsAbout: ['Frontend', 'React', 'Three.js', 'Web Performance', 'Accessibility']
    };
    const ldWebsite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: title,
      inLanguage: 'en'
    };
    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.id = 'ld-json-person';
    personScript.text = JSON.stringify(ldPerson);
    document.head.appendChild(personScript);
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.id = 'ld-json-website';
    websiteScript.text = JSON.stringify(ldWebsite);
    document.head.appendChild(websiteScript);
    created.push(personScript, websiteScript);
    return () => {
      for (const el of created) document.head.removeChild(el);
    };
  }, []);
  return null;
};

export default SEO;
