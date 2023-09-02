// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users." });
  }
};

export const postUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user." });
  }
};
