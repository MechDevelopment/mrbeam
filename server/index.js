const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
const cors = require("cors");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.listen(8081, () => {
  console.log("Server is running");
});

app.get("/points", (req, res) => {
  res.send([
    {
      title: "Hello World!",
      description: "Здесь будет список точек для графика"
    }
  ]);
});
