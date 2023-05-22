import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Update the parameter name to 'userId'
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
