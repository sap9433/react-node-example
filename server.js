const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const weatherUrl = 'http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=';
const appId = 'b1b15e88fa797225412429c1c50c122a1';

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/getweather', function(request, response) {
	let fetch = require('node-fetch');
	fetch(`${weatherUrl}${appId}`).then((res) => {
        return res.json();
    }).then(json => {
        response.send(json);
    });
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});



app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
