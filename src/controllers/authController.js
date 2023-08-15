const db = require("../models/db");
const { hashPassword, comparePasswords } = require("../utils/bcryptUtils");
const { generateToken } = require("../utils/jwtUtils");

const signup = async (req, res) => {
  const { id, password, username } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const sql =
      "INSERT INTO userinfo (user_id, password, username) VALUES (?, ?, ?)";

    db.query(sql, [id, hashedPassword, username], (err, result) => {
      if (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Signup failed" });
      } else {
        res.json({ message: "Signup successful", result });
      }
    });
  } catch (error) {
    console.error("Hashing error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

const login = async (req, res) => {
  const { id, password } = req.body;

  try {
    const sql = "SELECT * FROM userinfo WHERE user_id = ?";

    db.query(sql, [id], async (err, results) => {
      if (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
      } else if (results.length === 0) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];

        const isPasswordValid = await comparePasswords(password, user.password);

        if (isPasswordValid) {
          const token = generateToken({ userId: user.id });
          res.json({ message: "Login successful", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  signup,
  login,
};
