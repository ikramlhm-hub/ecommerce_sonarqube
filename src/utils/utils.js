/**
 * Échappe les caractères HTML pour éviter les failles XSS
 */
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (char) => {
    const escapeChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escapeChars[char];
  });
}
