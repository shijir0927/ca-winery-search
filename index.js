let express = require("express");
let logger = require("morgan");
let path = require("path");

let PORT = process.env.PORT || 8080;

let app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'my-app/build')));

require("./apiRoute.js")(app);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Listening on http://localhost:${PORT}`);
});