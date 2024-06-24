const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const fs = require("fs");

// Aim of that server:
// 1. Serve a web page, eg. index.html
const app = express();

app.listen(3002, () => console.log("listening at 3002"));

//Hostowanie plików znajdujących się w folderze public
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (req, res) => {
  console.log("I got new get request!");
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    res.json(data);
  });
});

app.post("/api", (req, res) => {
  console.log("I got new request!");
  console.log(req.body);
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  //creating new file for image
  data.image_file = `image_${timestamp}.png`;

  const base64Data = data.image64.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(`public/data/${data.image_file}`, base64Data, "base64");

  delete data.image64;

  database.insert(data);

  res.json(data);
});
