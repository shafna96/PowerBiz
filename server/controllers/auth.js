import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password is correct
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id }, //company_id: user.company_id
      process.env.JWT_SECRET,
      {
        expiresIn: 3600, // 1 hour
      }
    );

    res.status(200).json({ token, user_id: user.id }); // company_id: user.company_id
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
