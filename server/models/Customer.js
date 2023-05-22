import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    //userId: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    customerType: {
      type: String,
      enum: ["individual", "company"], // Specify the allowed values for customerType
      default: "individual", // Set a default value if needed
    },
    contactPerson: {
      type: String,
      required: function () {
        return this.customerType === "company";
      },
    },

    // Additional fields for the customer module can be added here
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
