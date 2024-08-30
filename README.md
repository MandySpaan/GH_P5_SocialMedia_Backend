# Social Media MongoDB Project

This project was made as part of a course Full Stack Developer for GeeksHubs Academy.

## Index 🔍

- [Assignment](#assignment-)
- [Stack](#stack)
- [Database Diagram](#database-diagram)
- [Local Installation](#local-installation-️)
- [Endpoints](#endpoints)
- [Points of Improvement](#points-of-improvement)

## Assignment 📝

GeeksHub gave the assignment to develop the backend for a social media platform. <br>
A social media platform on which users can register, access the network, post and interact.

You can find the related frontend project here: [GH_P7_SocialMedia_Frontend](https://github.com/MandySpaan/GH_P7_SocialMedia_Frontend)

## Stack 💻

<div align="center">
<a href="https://www.reactjs.com/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MySQL" />
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="bcrypt" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
</a>
 </div>

## Database Diagram 📊

This diagram shows the structure of the database tables.

![Database Diagram](./img/diagram-social-media.png)

## Local installation 🛠️

### Backend

1. Clone the repository
   `$ git clone https://github.com/MandySpaan/GH_P5_SocialMedia_Backend`
2. Install dependencies
   `$ npm install --y`
3. Copy the file .env.example, change the name to .env and fill in all the fields
4. Plant the seeds into the tables
   `$ npm run db:seed`
5. Start the server
   `$ npm run dev`

### Frontend

You can find the frontend project here: [GH_P7_SocialMedia_Frontend](https://github.com/MandySpaan/GH_P7_SocialMedia_Frontend)

1. Clone the repository
   `$ git clone https://github.com/MandySpaan/GH_P7_SocialMedia_Frontend`
2. Install dependencies
   `$ npm install --y`
3. Start the server
   `$ npm run dev`

## Endpoints ⚙️

<details>
<summary>Authentication</summary>

| Method |        URI         |            Action             |             Auth              |                                               Body                                                |
| :----: | :----------------: | :---------------------------: | :---------------------------: | :-----------------------------------------------------------------------------------------------: |
|  POST  | /api/auth/register |      Register a new user      | <center>N/A (public)</center> | `{ "username": "yourUsername", "email": "youremail@email.com",`<br>`"password": "yourPassword" }` |
|  POST  |  /api/auth/login   | Login a user and return a JWT | <center>N/A (public)</center> |   `{ "identifier": "youremail@email.com" or "yourUsername",`<br>`"password": "yourPassword" }`    |

</details>

<details>
<summary>Users</summary>

| Method |              URI              |             Action             |             Auth              |                                                                              Body                                                                               |
| :----: | :---------------------------: | :----------------------------: | :---------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  GET   |          /api/users           |         View all users         |     Token (isSuperAdmin)      |                                                                      <center>N/A</center>                                                                       |
|  GET   |      /api/users/profile       |   View your own user profile   |         Token (user)          |                                                                      <center>N/A</center>                                                                       |
|  GET   | /api/users/following/profiles |    View following profiles     |         Token (user)          |                                                                      <center>N/A</center>                                                                       |
|  GET   |    /api/users/profile/:id     |  View user profile by user id  | <center>N/A (public)</center> |                                                                      <center>N/A</center>                                                                       |
|  PUT   |      /api/users/profile       |      Update user profile       |         Token (user)          | `{ "first_name": "newFirstName",`<br>`"last_name": "newLastName",`<br>` "username": "newUsername",`<br>` "email": "newEmail",`<br>`"password": "newPassword" }` |
|  PUT   |     /api/users/follow/:id     | Follow user profile by user id |         Token (user)          |                                                                      <center>N/A</center>                                                                       |

</details>

<details>
<summary>Posts</summary>

| Method |         URI          |             Action              |          Permissions          |                                  Body                                   |
| :----: | :------------------: | :-----------------------------: | :---------------------------: | :---------------------------------------------------------------------: |
|  POST  |      /api/posts      |           Create post           |         Token (user)          |    `{ "title": "postTitle",`<br>`"description": "postDescription" }`    |
| DELETE | /api/posts/admin/:id |     Delete post by post id      |     Token (isSuperAdmin)      |                          <center>N/A</center>                           |
| DELETE |    /api/posts/:id    | Delete your own post by post id |         Token (user)          |                          <center>N/A</center>                           |
|  PUT   | /api/posts/like/:id  |      Like post by post id       |         Token (user)          |                          <center>N/A</center>                           |
|  PUT   |    /api/posts/:id    | Update your own post by post id |         Token (user)          | `{ "title": "newPostTitle",`<br>`"description": "newPostDescription" }` |
|  GET   |    /api/posts/own    |       View your own posts       |         Token (user)          |                          <center>N/A</center>                           |
|  GET   |     /api/posts/      |         View all posts          | <center>N/A (public)</center> |                          <center>N/A</center>                           |
|  GET   | /api/posts/user/:id  |      View post by user id       | <center>N/A (public)</center> |                          <center>N/A</center>                           |
|  GET   | /api/posts/following |      View following posts       |         Token (user)          |                          <center>N/A</center>                           |
|  GET   |    /api/posts/:id    |      View post by post id       | <center>N/A (public)</center> |                          <center>N/A</center>                           |

</details>

## Points of Improvement 💡

Some extra possible functionalities to be added:

- The option to retrieve all of a persons followers
- The option to add images to user profiles and posts
- The option to search for a user by username or name
