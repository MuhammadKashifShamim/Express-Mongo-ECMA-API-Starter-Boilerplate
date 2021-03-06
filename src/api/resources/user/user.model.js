import mongoose from "mongoose";

export const ADMIN_ROLE = 1;
export const OPERATOR_ROLE = 2;
export const CUSTOMER_ROLE = 3;
const { Schema } = mongoose;
const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    default: 3,
    required: true,
    type: Number,
  },
});

export default mongoose.model("User", userSchema);
