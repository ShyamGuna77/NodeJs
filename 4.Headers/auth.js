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



app.listen(3000, () => {
  console.log("App listening on port 3000");
});
