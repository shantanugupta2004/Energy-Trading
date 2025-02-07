const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersFilePath = path.join(__dirname, "../../db/users.json");
const secretKey = "shantanu@2004"; // Use a secure key in production

// Read users from JSON file
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register User
exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  res.json({ message: "User registered successfully" });
};

// Login User
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find((user) => user.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  res.json({ token });
};
