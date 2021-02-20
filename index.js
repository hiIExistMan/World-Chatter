const express = require("express");
const ratelimit = require("express-rate-limit")

const app = express();
const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => console.log("listening at " + port));
app.use(express.static("public"));
app.use(express.json({ limit: "100kb" }));


const db = [];

app.get("/", async (req, res) => {
  res.send("public");
});

app.get("/api", async (req, res) => {
  res.send(db);
});

app.use(ratelimit({
  windowMs: 10*1000,
  max: 1
}))
app.post("/api", async (req, res) => {
  const data = req.body;
  console.log(req);
  db.push(data);
  res.send(data);
});
