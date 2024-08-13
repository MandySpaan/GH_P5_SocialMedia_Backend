import bcrypt from "bcrypt";
import "dotenv/config";
import mongoose from "mongoose";
import User from "../entities/users/user.model.js";

export const userSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    const users = [
      {
        first_name: "Tim",
        last_name: "Spaan",
        username: "tim.spaan",
        email: "tim@tim.com",
        password: bcrypt.hashSync(
          "password01",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "super_admin",
      },
      {
        first_name: "Mandy",
        last_name: "Spaan",
        username: "mandy.spaan",
        email: "mandy@mandy.com",
        password: bcrypt.hashSync(
          "password02",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "super_admin",
      },
      {
        first_name: "Nikoleta",
        last_name: "Freidenfelde",
        username: "nikoletalulu",
        description:
          "Dedicated to pushing the boundaries of engineering with cutting-edge technology and creative problem-solving. Always exploring new methodologies and tools.",
        email: "lulu@lulu.com",
        password: bcrypt.hashSync(
          "password03",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "user",
      },
      {
        first_name: "Shanna",
        last_name: "Linnenbank",
        username: "shannapascale",
        description:
          "Deeply interested in the potential of artificial intelligence and machine learning. I explore ways these technologies can be leveraged for innovative applications.",
        email: "shanna@shanna.com",
        password: bcrypt.hashSync(
          "password04",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "user",
      },
      {
        first_name: "José",
        last_name: "KnoWay",
        username: "djknoway",
        description:
          "Focused on crafting innovative software solutions that solve real-world problems. My expertise spans multiple programming languages and frameworks.",
        email: "knoway@knoway.com",
        password: bcrypt.hashSync(
          "password05",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "user",
      },
      {
        first_name: "Lili",
        last_name: "Rangel Marquez",
        email: "lili@lili.com",
        username: "lilinda",
        description:
          "Passionate about everything from coding languages to emerging tech trends. Always on the lookout for the next big thing in technology.",
        password: bcrypt.hashSync(
          "password06",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "user",
      },
      {
        first_name: "Mattia",
        last_name: "Rico",
        email: "rico@rico.com",
        username: "masr1co",
        description:
          "Passionate about everything from coding languages to emerging tech trends. Always on the lookout for the next big thing in technology.",
        password: bcrypt.hashSync(
          "password07",
          parseInt(process.env.SALT_ROUNDS)
        ),
        role: "user",
      },
    ];
    await User.insertMany(users);

    console.log("User seeder successfully");
  } catch (error) {
    console.log("Error user seeder", error.message);
  } finally {
    await mongoose.connection.close();
  }
};
