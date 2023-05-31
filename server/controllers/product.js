import Item from "../models/Item.js";
import User from "../models/User.js";

export const addItem = async (req, res) => {
  try {
    const {
      itemCode,
      itemName,
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

    // Get the uploaded image file
    const imageFile = req.file;

    // If an image is uploaded, convert it to a base64 string for storage
    let image = null;
    if (imageFile) {
      image = imageFile.path;
    }

    // Create the new item object
    const newItem = new Item({
      itemCode,
      itemName,
      unitPrice,
      unitCost,
      discount,
      size,
      comments,
      image,
      userId,
    });

    // Save the new item to the database
    await newItem.save();

    res.status(200).json(newItem);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to add item" });
  }
};

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
