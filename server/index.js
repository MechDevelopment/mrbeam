const serveStatic = require("serve-static");
const path = require("path");
const express = require("express")
const app = express();
const http = require("http").createServer(app);

app.use("/", serveStatic(path.join(__dirname, "../dist")));

app.use(express.json());

// Middleware
app.use(function(req, res, next) {

  if (req.headers.origin == "http://localhost:8080") {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  } else {
    res.header("Access-Control-Allow-Origin", "https://mrbeam2.herokuapp.com");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

///
const BeamService = require("./BeamService")();

app.get("/generate", (req, res) => {
  res.send( BeamService.generate(5));
});

app.post("/calculate", (req, res) => {
  const BC = new BeamService();
  if(!req.body) return response.sendStatus(400);
  (async () => {
    await BC.import(req.body);
    res.send(BC.getResults());
  })();
});

//

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
