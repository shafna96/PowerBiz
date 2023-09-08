import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import User from "../models/User.js";

/* Customer endpoints */

export const getCustomers = async (req, res) => {
  try {
    // Retrieve all customers and populate the userId field with the corresponding user documents
    const customers = await Customer.find().populate("userId");

    res.json(customers);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to get customers" });
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

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the customer by ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Set the customer as inactive
    customer.isActive = false;
    await customer.save();

    res.json({ message: "Customer deactivated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to deactivate customer" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, customerType, contactPerson } =
      req.body;

    // Find the customer by ID
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
        phone,
        customerType,
        contactPerson,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    updatedCustomer.save();
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Supplier endpoints */

export const getSuppliers = async (req, res) => {
  try {
    // Retrieve all customers and populate the userId field with the corresponding user documents
    const suppliers = await Supplier.find().populate("userId");

    res.json(suppliers);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to get suppliers" });
  }
};

export const addSupplier = async (req, res) => {
  try {
    const { name, email, address, phone, supplierType, contactPerson } =
      req.body;

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id.toString(); // Convert userId to string type // Store the user._id in a variable

    // Create a new instance of the supplier model with the provided data
    const supplier = await Supplier.create({
      userId, // Set userId as the User schema's ID
      name,
      email,
      address,
      phone,
      supplierType,
      contactPerson,
    });

    // Return the saved supplier in the response
    res.status(201).json(supplier);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: "Failed to add supplier" });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the supplier by ID
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "supplier not found" });
    }

    // Set the customer as inactive
    supplier.isActive = false;
    await supplier.save();

    res.json({ message: "Supplier deactivated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to deactivate supplier" });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone, supplierType, contactPerson } =
      req.body;

    // Find the supplier by ID
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
        phone,
        supplierType,
        contactPerson,
      },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    updatedSupplier.save();
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
