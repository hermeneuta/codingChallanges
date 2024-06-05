const express = require("express");

// Aim of that server:
// 1. Serve a web page, eg. index.html
const app = express();

app.listen(3000, () => console.log("listening at 3000"));

app.use(express.static("public"));
