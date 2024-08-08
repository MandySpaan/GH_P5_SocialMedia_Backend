import { Schema, model } from "mongoose";

const UserShema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    first_name: {
      type: String,
    },

    last_name: {
      type: String,
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

    is_active: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      Enum: ["user", "admin", "super_admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserShema);

export default User;
