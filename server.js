// API-server (port 3000)
// Tjekker JWT og returnerer kun den loggede brugers posts.
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Fake data – i en rigtig app ville det komme fra en database
const posts = [
  { username: "Kyle", title: "Post 1" },
  { username: "Jim", title: "Post 2" },
];

// GET /posts – kræver Authorization: Bearer <accessToken>
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Middleware: læs Bearer-token, verificér signatur, sæt req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // "Bearer TOKEN" → vi vil have TOKEN (index 1)
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // ingen token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // token ugyldig / udløbet
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("API kører på http://localhost:3000");
});
