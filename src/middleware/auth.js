/**
 * Middleware d'authentification simple (à améliorer)
 */
export function isAuthenticated(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Non authentifié");
  }

  // Ici, simulation simple : token doit être "admin-token"
  if (token === "admin-token") {
    return next();
  }

  return res.status(403).send("Accès interdit");
}
