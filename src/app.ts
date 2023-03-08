import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Aplicação está funcionando!');
});

export default app;
