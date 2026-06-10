export function openCenteredLink(url) {
  const width = Math.min(960, Math.round(window.screen.availWidth * 0.85));
  const height = Math.min(720, Math.round(window.screen.availHeight * 0.85));
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);

  const popup = window.open(
    url,
    "dmr-link",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  );

  if (popup) {
    popup.opener = null;
    popup.focus();
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export function onExternalLinkClick(event, url) {
  if (event.defaultPrevented) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.button !== 0) return;

  event.preventDefault();
  openCenteredLink(url);
}
