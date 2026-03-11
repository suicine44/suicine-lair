export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

export function searchUrl(site, q) {
  const s = encodeURIComponent(q);
  if (site === 'letterboxd') return `https://letterboxd.com/search/${s}/`;
  if (site === 'imdb') return `https://www.imdb.com/find?q=${s}&s=tt`;
  if (site === 'metacritic') return `https://www.metacritic.com/search/${s}/`;
  return '#';
}

export function detectMarkers(str) {
  return {
    star: /[★\u2605]/.test(str),
    heart: /[♥\u2665]/.test(str)
  };
}

export function cleanMarkers(str) {
  return str.replace(/[★\u2605♥\u2665\uFE0E\uFE0F]/g, '').trim();
}
