import express from 'express';

import { searchRoutes } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Api is working!'});
});

app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
