let axios = require("axios");
const request = require('request');

module.exports = function(app) {
  app.get('/north-coast', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/north-coast' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/central-coast', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/central-coast' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/sierra-foothills', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/sierra-foothills' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/north-coast', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/north-coast' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/inland-valleys', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/inland-valleys' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/southern-california', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/southern-california' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/far-north-california', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/discover-california/far-north-california' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });
};
