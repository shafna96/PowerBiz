import Item from "../models/Item.js";
import User from "../models/User.js";

export const getItems = async (req, res) => {
  try {
    // Retrieve all items and populate the userId field with the corresponding user documents
    const items = await Item.find().populate("userId");

    res.json(items);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to get items" });
  }
};

export const addItem = async (req, res) => {
  try {
    const {
      itemCode,
      itemName,
      image,
      unitPrice,
      unitCost,
      discount,
      size,
      comments,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id.toString(); // Convert userId to string type // Store the user._id in a variable

    // Create a new instance of the item model with the provided data
    const item = await Item.create({
      userId, // Set userId as the User schema's ID
      itemCode,
      itemName,
      image,
      unitPrice,
      unitCost,
      discount,
      size,
      comments,
    });

    // Return the saved item in the response
    res.status(201).json(item);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to add item" });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the item by ID
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Set the item as inactive
    item.isActive = false;
    await item.save();

    res.json({ message: "Item deactivated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to deactivate item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemCode,
      itemName,
      image,
      unitPrice,
      unitCost,
      discount,
      size,
      comments,
    } = req.body;

    // Find the customer by ID
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        itemCode,
        itemName,
        image,
        unitPrice,
        unitCost,
        discount,
        size,
        comments,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    updatedItem.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
