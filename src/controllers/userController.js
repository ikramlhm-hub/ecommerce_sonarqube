import bcrypt from 'bcrypt';
import { escapeHTML } from '../utils/utils.js';

export const users = [];  // Exporté pour pouvoir réinitialiser en test

/**
 * Crée un utilisateur après validation et hash du mot de passe
 */
export async function createUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Validation basique et format simple
  if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password.trim()) {
    return res.status(400).send("Nom d'utilisateur ou mot de passe invalide");
  }

  // Exemple validation regex simple pour username (alphanumériques + _-)
  if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
    return res.status(400).send("Nom d'utilisateur non conforme");
  }

  // Vérifie que l'utilisateur n'existe pas déjà
  if (users.find((u) => u.username === username)) {
    return res.status(400).send("Utilisateur déjà existant");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log("✅ Utilisateur créé :", username);
    res.status(201).send("Utilisateur créé");
  } catch (err) {
    console.error("Erreur lors du hash :", err);
    res.status(500).send("Erreur serveur");
  }
}

/**
 * Liste les noms des utilisateurs (avec échappement XSS)
 */
export function listUsers(req, res) {
  const result = users.map((u) => escapeHTML(u.username)).join("\n");
  res.send(result);
}
