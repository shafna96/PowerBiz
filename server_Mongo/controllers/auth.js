import User from "../models/User.js";
import jwt from "jsonwebtoken";

// User signup
// export const getSignup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Create new user
//     const newUser = new User({ name, email, password });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     newUser.password = await bcrypt.hash(password, salt);

//     // Save user to database
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
//       expiresIn: 3600, // 1 hour
//     });

//     res.status(201).json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// User login
export const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password is correct
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600, // 1 hour
    });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

//User logout
export const getLogout = async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Send a response indicating successful logout
  res.status(200).json({ message: "Logged out successfully" });
};
