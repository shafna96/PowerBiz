// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const getUser = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Could not fetch users." });
//   }
// };

export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming 'id' is the user ID in the request parameters
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id), // Convert 'id' to a number if it's not already
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user." });
  }
};
