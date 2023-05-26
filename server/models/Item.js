import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      //  required: true,
    },
    itemCode: String,
    itemName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      trim: true,
    },
    image: String,
    unitPrice: {
      type: Number,
      set: function (v) {
        return Math.round(v);
      },
    },
    unitCost: Number,
    discount: Number,
    size: String,
    comments: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
