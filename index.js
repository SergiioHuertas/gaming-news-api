require('dotenv').config();
const https = require('https');
const express = require('express');

const desiredPort = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

const app = express();

app.get('/', (req, res) => {
  const { q, language, page, pageSize } = req.query;
  const options = {
    hostname: 'newsapi.org',
    path: `/v2/everything?sortBy=publishedAt&pageSize=${pageSize}&page=${page}&q=${q}&language=${language}&apiKey=${apiKey}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  };

  https.get(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(data);
    });
  });
});

app.listen(desiredPort, () => {
  console.log(`Server is running on http://localhost:${desiredPort}`);
});
