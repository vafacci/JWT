// Auth-server (port 4000)
// Login, refresh access token, logout.
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// I produktion: gem refresh tokens i en database.
// Her: simpel array (tømmes når serveren genstarter).
let refreshTokens = [];

// POST /login – body: { "username": "Kyle" }
// Returnerer accessToken (kort levetid) + refreshToken (lang levetid)
app.post("/login", (req, res) => {
  // Normalt ville vi tjekke password her – vi springer det over for at fokusere på JWT
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

// POST /token – body: { "token": "<refreshToken>" }
// Giver et nyt accessToken uden at logge ind igen
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

// DELETE /logout – body: { "token": "<refreshToken>" }
// Fjerner refresh token → brugeren kan ikke lave nye access tokens
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  // Kort levetid (15s til demo – i produktion typisk 10–15 min)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(4000, () => {
  console.log("Auth kører på http://localhost:4000");
});
