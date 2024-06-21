const express = require("express");
const fs = require("fs");

// Aim of that server:
// 1. Serve a web page, eg. index.html
const app = express();

app.listen(3002, () => console.log("listening at 3002"));

//Hostowanie plików znajdujących się w folderze public
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  console.log("I got new request!");
  console.log(req.body);
  const data = req.body;
  res.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });
  fs.writeFileSync("dane.txt", JSON.stringify(data) + ", ", { flag: "a+" });
});
