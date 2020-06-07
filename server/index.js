const serveStatic = require("serve-static");
const path = require("path");

const app = require("express")();
const http = require("http").createServer(app);

app.use("/", serveStatic(path.join(__dirname, "../dist")));

// Middleware
app.use(function(req, res, next) {
  let origins = [
    "http://localhost:8080",
    "https://mrbeam2.herokuapp.com",
    "https://mrbeam2.herokuapp.com/generate",
  ];

  console.log(req);

  for (let i = 0; i < origins.length; i++) {
    let origin = origins[i];

    if (req.headers.origin.indexOf(origin) > -1) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

///
const generator = require("./ElementService/Generator")();

app.get("/generate", (req, res) => {
  generator.setSettings("ones");
  let g = generator.generate(5, [0, 5]);
  res.send(g);
});

//

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
