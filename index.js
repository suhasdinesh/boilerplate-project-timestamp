// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If the date parameter is empty or missing, return the current time
    date = new Date();
  } else {
    date = new Date(dateParam);

    // Check if the date can be successfully parsed
    if (isNaN(date.getTime())) {
      // If not, try parsing it as a Unix timestamp
      date = new Date(Number(dateParam));

      if (isNaN(date)) {
        res.json({ "error": "Invalid Date" });
        return;
      }
    }
  }

  res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
