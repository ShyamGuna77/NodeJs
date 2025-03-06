const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors"); // ✅ Fixes potential CORS issues

const JWT_SECRET = "iLoveOnepIece";

app.use(cors()); // ✅ Allow frontend to communicate (if needed)
app.use(express.json()); // ✅ Ensures JSON parsing works

const users = [];

// ✅ Middleware for Authentication
const authentication = (req, res, next) => {
  console.log("Request Headers:", req.headers); // Debugging log
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or malformed token" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extracts correct token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // ✅ Attach user data
    next();
  });
};

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // ✅ Check if user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

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

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// ✅ Protected Route: Get User Details
app.get("/me", authentication, (req, res) => {
  const user = users.find((user) => user.username === req.user.username);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({ username: user.username });
});

// ✅ Start Server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
