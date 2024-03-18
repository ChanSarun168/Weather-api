const express = require("express");
const request = require("request");

const app = express();

const apiKey = "7ec6452d045505c2d2b71dc03cb64f99";

app.get("/", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  request(url, function (error, response, body) {
    if (error) {
      console.error("Error:", error);
      res.send("Error occurred, please try again later.");
      return;
    }

    const weatherData = JSON.parse(body);

    if (weatherData.cod !== 200) {
      console.error("Error:", weatherData.message);
      res.send(`Error: ${weatherData.message}`);
      return;
    }

    const description = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    res.send(
      `The weather in ${city} is ${description} and temperature is ${temp}.`
    );
  });
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
