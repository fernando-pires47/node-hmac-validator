const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const SECRET = '123';

app.use(bodyParser.json());

app.post('/validate', (req, res) => {
  const receivedHash = req.header('x-webhook-hash');

  // Lançar exceção caso o header "x-webhook-hash" não definido 
  if (!receivedHash) return res.status(400).send('Missing x-webhook-hash header');

  // Gerar HMAC do payload recebido
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(JSON.stringify(req.body));
  const calculatedHash = hmac.digest('hex');

  // Lançar exceção caso a hash resultante não for a mesma
  if (calculatedHash !== receivedHash) return res.status(500).send('HMAC verification failed');

  // Sucesso na operação
  return res.status(200).send('HMAC verified successfully');
});

app.listen(PORT, () => {
  console.log(`HMAC validator running on http://localhost:${PORT}`);
});
