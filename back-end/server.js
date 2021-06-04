
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/*
Example: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
How to get lat and long:
  user enters location OR get users position 


*/

app.get("/", function (req, res) {
  res.json({ greeting: 'hello API' });
});


/*
app.get("/http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=55b367e1dff8adb640b0500f628d0a83", function(req, res) {
  res.json(data)
})
*/
console.log("test")
app.listen(port, function () {
    console.log(`Your app is listening on ${port}`);
  });
