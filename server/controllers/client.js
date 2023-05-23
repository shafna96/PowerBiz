import Customer from "../models/Customer.js";
import User from "../models/User.js";

export const getCustomers = async (req, res) => {
  try {
    const customerId = req.params.id; // Assuming the customer ID is provided in the request parameters

    // Find the customer by their ID and populate the userId field with the corresponding user document
    const customer = await Customer.findById(customerId).populate("userId");

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to get customer" });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { name, email, address, phone, customerType, contactPerson } =
      req.body;

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id.toString(); // Convert userId to string type // Store the user._id in a variable

    // Create a new instance of the Customer model with the provided data
    const customer = await Customer.create({
      userId, // Set userId as the User schema's ID
      name,
      email,
      address,
      phone,
      customerType,
      contactPerson,
    });

    // Return the saved customer in the response
    res.status(201).json(customer);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to add customer" });
  }
};
