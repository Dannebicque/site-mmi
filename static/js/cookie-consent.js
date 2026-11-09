(() => {
  const consentKey = 'mmi-cookie-consent';
  let consent = localStorage.getItem(consentKey);
  const banner = document.getElementById('cookie-banner');
  const gtmId = document.currentScript?.dataset.gtmId;
  let gtmLoaded = false;

  function loadGoogleTagManager() {
    if (!gtmId || gtmLoaded) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
    gtmLoaded = true;
  }

  if (consent === 'accepted') {
    loadGoogleTagManager();
  }

  if (!banner) {
    return;
  }

  const acceptButton = banner.querySelector('[data-cookie-accept]');
  const rejectButton = banner.querySelector('[data-cookie-reject]');
  const settingsButtons = document.querySelectorAll('[data-cookie-settings]');

  function closeBanner() {
    banner.hidden = true;
  }

  function showBanner(focus = false) {
    banner.hidden = false;
    if (focus) {
      acceptButton.focus();
    }
  }

  acceptButton.addEventListener('click', () => {
    localStorage.setItem(consentKey, 'accepted');
    consent = 'accepted';
    loadGoogleTagManager();
    closeBanner();
  });

  rejectButton.addEventListener('click', () => {
    const wasAccepted = consent === 'accepted';
    localStorage.setItem(consentKey, 'refused');
    consent = 'refused';
    closeBanner();
    if (wasAccepted) {
      window.location.reload();
    }
  });

  settingsButtons.forEach((button) => {
    button.addEventListener('click', () => showBanner(true));
  });

  if (consent !== 'accepted' && consent !== 'refused') {
    showBanner();
  }
})();
