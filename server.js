const http = require("http");
const fs = require("fs");
const url = require("url");
const figlet = require("figlet");
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const reqURL = new URL(req.url, `http://localhost:${port}`);
  const page = reqURL.pathname;
  const params = reqURL.searchParams;
  console.log("Page: ", page);
  const pages = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact.html",
  };
  if (page in pages) {
    fs.readFile(pages[page], function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if (params.has("student")) {
      if (params.get("student").toLowerCase() == "felice") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          name: "Felice",
          status: "Employed",
          currentOccupation: "Software Engineer",
        };
        res.end(JSON.stringify(objToJson));
      } //student = leon
      else {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown",
        };
        res.end(JSON.stringify(objToJson));
      } //student
    } //student if
  } //else if
  else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(port, console.log(`Server started: http://localhost:${port}/`));
