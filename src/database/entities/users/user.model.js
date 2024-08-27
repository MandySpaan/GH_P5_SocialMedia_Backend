import { Schema, model } from "mongoose";
import Post from "../posts/post.model.js";

const UserSchema = new Schema(
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

    description: {
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

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Post.deleteMany({ user_id: this._id });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const User = model("User", UserSchema);

export default User;
