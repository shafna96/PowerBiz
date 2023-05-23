import Customer from "../models/Customer.js";
import User from "../models/User.js";

// export const getCustomers = async (req, res) => {
//   try {
//     const customerId = req.params.id; // Assuming the customer ID is provided in the request parameters

//     // Find the customer by their ID and populate the userId field with the corresponding user document
//     const customer = await Customer.findById(customerId).populate("userId");

//     if (!customer) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     res.json(customer);
//   } catch (error) {
//     // Handle any errors that occur during the process
//     res.status(500).json({ error: "Failed to get customer" });
//   }
// };

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
