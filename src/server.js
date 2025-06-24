import express from 'express';
import bodyParser from 'body-parser';
import { createUser, listUsers } from './controllers/userController.js';
import { isAuthenticated } from './middleware/auth.js';

const app = express();
app.use(bodyParser.json());

app.post('/users', createUser);
app.get('/users', isAuthenticated, listUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
