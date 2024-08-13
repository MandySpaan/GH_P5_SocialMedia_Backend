import dotenv from "dotenv";
import mongoose from "mongoose";
import faker from "faker";
import Post from "../entities/posts/post.model.js";
import User from "../entities/users/user.model.js";

dotenv.config();

export const postSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    const users = await User.find({}, "_id");
    const userIDs = users.map((user) => user._id);

    const posts = [];
    for (let i = 0; i < 40; i++) {
      posts.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        user_id: userIDs[Math.floor(Math.random() * userIDs.length)],
        likes: [],
      });
    }

    await Post.insertMany(posts);

    console.log("Post seeder successfully");
  } catch (error) {
    console.log("Error post seeder", error.message);
  } finally {
    await mongoose.connection.close();
  }
};
