const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "iLoveOnepIece";
app.use(express.json());

const users = [];

// ✅ Middleware for Authentication
const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", req.headers.authorization);
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Correct token extraction
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    req.user = user; // Attach user data
    next();
  });
};

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "Signed up successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up" });
  }
});

// ✅ Signin Route
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } else {
    res
      .status(403)
      .send({ message: "Invalid username or password doesn't match" });
  }
});

// ✅ Protected Route: Get User Details
app.get("/me", authentication, (req, res) => {
  const user = users.find((user) => user.username === req.user.username);
  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({ message: "User not found" });
  }
});

// ✅ Start Server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
