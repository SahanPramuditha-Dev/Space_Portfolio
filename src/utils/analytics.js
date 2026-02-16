// Analytics utility - can be integrated with Google Analytics, Plausible, etc.
export const trackEvent = (eventName, eventData = {}) => {
  // Only track in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics Event:', eventName, eventData);
    return;
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: eventData });
  }

  // Custom analytics endpoint (if you have one)
  if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
    fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, data: eventData }),
    }).catch(() => {}); // Silently fail
  }
};

export const trackPageView = (path) => {
  trackEvent('page_view', { path });
};

export const trackProjectView = (projectTitle) => {
  trackEvent('project_view', { project_title: projectTitle });
};

export const trackContactSubmit = (success) => {
  trackEvent('contact_submit', { success });
};

export const trackDownload = (fileType) => {
  trackEvent('download', { file_type: fileType });
};

export const trackSocialClick = (platform) => {
  trackEvent('social_click', { platform });
};
