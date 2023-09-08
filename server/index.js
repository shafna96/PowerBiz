import generalRoutes from "./routes/general.js";
import express from "express";

const app = express();

app.use(express.json());
app.use("/", generalRoutes);

// app.post("/users", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//     });
//     res.json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: "Could not create user." });
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Could not fetch users." });
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
