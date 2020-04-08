const serveStatic = require("serve-static");
const path = require("path");

const app = require("express")();
const http = require("http").createServer(app);

app.use("/", serveStatic(path.join(__dirname, "../dist")));

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
