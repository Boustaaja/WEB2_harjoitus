/*let data = [
  { id: 1, firstName: "Matti", lastName: "Ruohonen" },
  { id: 2, firstName: "Teppo", lastName: "Ruohonen" },
];*/
let dictionary = [];
const express = require("express");
const fs = require("fs");
//const bodyParser = require("body-parser");
/* const app = express().use(bodyParser.json()); //vanha tapa - ei enää voimassa. 
kts. https://devdocs.io/express/ -> req.body*/
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*CORS isnt enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// GET a word (eli selaimeen osoiteriville kirjoitetaan vaikka http://localhost:3000/words/auto)
app.get("/words/:fin", (req, res) => {
  const finWord = req.params.fin;
  const word = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });
  const splitLines = word.split(/\r?\n/);
  let found = null;
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words
    if (words[0] === finWord) {
      found = { fin: words[0], eng: words[1] };
    }
  });
  res.json(found ? found : { message: "Not found" });
});

// POST a new word
app.post("/words", (req, res) => {
  const { fin, eng } = req.body;
  fs.appendFileSync("./sanakirja.txt", `${fin} ${eng}\n`);
  res.json({ message: "Word added" });
});

// GET all words
app.get("/words", (req, res) => {
  const data = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });

  const splitLines = data.split(/\r?\n/);
  const dictionary = splitLines
    .filter((line) => line.trim() !== "") // poistaa tyhjät rivit
    .map((line) => {
      const words = line.trim().split(/\s+/); // splittaa yhdellä tai useammalla välilyönnillä
      return { fin: words[0], eng: words[1] };
    });

  res.json(dictionary);
});
// GET a user
/*app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((user) => user.id === id);
  res.json(user ? user : { message: "Not found" });
});
// ADD a user
app.post("/users", (req, res) => {
  const user = req.body;
  data.push(user);
  res.json(data);
});
// UPDATE a user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  data = data.map((user) => (user.id === id ? updatedUser : user));
  res.json(data);
});
// DELETE a user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((user) => user.id !== id);
  res.json(data);
});*/
app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
