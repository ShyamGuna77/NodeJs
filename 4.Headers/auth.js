const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "randomilovenami";
const app = express();
app.use(express.json());

const users = [];

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({
    message: "Signed Up successfully"
  });
  console.log(users);
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    user.token = token;
    res.send({ token });
    console.log(users);
  } else {
    res.status(403).send({ message: "Invalid username or password" });
  }
});

app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userDetails = jwt.verify(token, JWT_SECRET);
    const user = users.find((user) => user.username === userDetails.username);

    if (user) {
      res.send({ username: user.username });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
});



app.listen(3000, () => {
  console.log("App listening on port 3000");
});
