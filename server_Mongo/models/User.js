import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      min: 5,
      trim: true,
    },
    image: {
      type: String, // Assuming you'll store the image URL
      default:
        "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1684396684~exp=1684397284~hmac=ec680699163561da822c977334c7f7600be03030950feb387deffcd4c8f9da4f", // You can set a default image URL if needed
    },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
