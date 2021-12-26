const path = require("path");
const express = require("express");
const { urlencoded } = require("body-parser");

const mainRoutes = require("./routes/main");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: false }));

app.use(mainRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
