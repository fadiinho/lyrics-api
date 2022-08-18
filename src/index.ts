import express from 'express';

import { searchRoutes } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();


app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Api is working!'});
});

app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
