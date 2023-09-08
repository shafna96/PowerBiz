import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    //userId: String,
    userId: {
      type: String,
      ref: "User",
      //  required: true,
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
      // required: true,
      trim: true,
    },
    phone: {
      type: String,
      //  required: true,
      trim: true,
    },
    supplierType: {
      type: String,
      enum: ["individual", "company"], // Specify the allowed values for customerType
      default: "individual", // Set a default value if needed
    },
    contactPerson: {
      type: String,
      // required: function () {
      //   return this.supplierType === "company";
      // },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Additional fields for the supplier module can be added here
  },

  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);

export default Supplier;
