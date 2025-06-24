import { createUser, listUsers, users } from '../src/controllers/userController.js';
import httpMocks from 'node-mocks-http';
import bcrypt from 'bcrypt';

describe('userController', () => {
  beforeEach(() => {
    // Réinitialise le tableau users avant chaque test
    users.length = 0;
  });

  test('createUser crée un utilisateur avec hash et valide les inputs', async () => {
    const req = httpMocks.createRequest({
      body: { username: 'Alice', password: 'secret123' },
    });
    const res = httpMocks.createResponse();

    await createUser(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getData()).toBe('Utilisateur créé');
  });

  test('createUser refuse un nom ou mot de passe vide', async () => {
    const req = httpMocks.createRequest({ body: { username: '', password: '' } });
    const res = httpMocks.createResponse();

    await createUser(req, res);
    expect(res.statusCode).toBe(400);
  });

  test('createUser gère erreur bcrypt.hash', async () => {
    const originalHash = bcrypt.hash;
    bcrypt.hash = jest.fn(() => { throw new Error('hash error'); });

    const req = httpMocks.createRequest({
      body: { username: 'Bob', password: 'secret123' },
    });
    const res = httpMocks.createResponse();

    await createUser(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toBe("Erreur serveur");

    bcrypt.hash = originalHash;
  });

  test('listUsers retourne la liste avec échappement HTML', () => {
    users.push({ username: '<script>' }); // Ajout utilisateur avec nom à échapper

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    listUsers(req, res);

    expect(res._getData()).toContain('&lt;script&gt;');
  });

  test('listUsers retourne une chaîne vide si pas d’utilisateurs', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    listUsers(req, res);

    expect(res._getData()).toBe('');
  });
});
