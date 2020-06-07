const serveStatic = require("serve-static");
const path = require("path");

const app = require("express")();
const http = require("http").createServer(app);

app.use("/", serveStatic(path.join(__dirname, "../dist")));

// Middleware
app.use(function(req, res, next) {
  // hosts
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Origin", "https://mrbeam2.herokuapp.com");

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
  generator.setSettings('ones');
  let g = generator.generate(5, [0, 5]);
  res.send(g);
})

//

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
