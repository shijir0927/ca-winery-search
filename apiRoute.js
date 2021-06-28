let axios = require("axios");
const request = require('request');

module.exports = function(app) {
  app.get('/getWinery/:region/:county', (req, res) => {
    console.log('params: ', req.params)
    request(
      { url: `https://discovercaliforniawines.com/discover-california/${req.params.region}/${req.params.county}` },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(body));
      }
    )
  });

  app.get('/winery/:route', (req, res) => {
    request(
      { url: 'https://discovercaliforniawines.com/wineries/'+req.params.route },
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
