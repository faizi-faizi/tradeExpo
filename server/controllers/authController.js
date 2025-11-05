require("dotenv").config();

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@bk" && password === "admin@6789") {
    return res.status(200).json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

module.exports = { login };