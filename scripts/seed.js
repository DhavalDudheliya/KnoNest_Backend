const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
require("dotenv").config();

const blogs = [
  {
    title: "Introduction to MERN Stack",
    subtitle:
      "The MERN stack is a popular set of technologies for building full-stack JavaScript applications. It includes MongoDB, Express.js, React, and Node.js.",
    imageUrl:
      "https://d2jdgazzki9vjm.cloudfront.net/blog/images/mern-stack.png",
    author: "John Doe",
    likes: [],
    comments: [],
    content: `The MERN stack is a combination of four major technologies: MongoDB, Express.js, React, and Node.js. 
    Each of these technologies plays a crucial role in the development of modern web applications. MongoDB is a NoSQL 
    database that stores data in JSON-like format. Express.js is a lightweight web application framework for Node.js 
    that helps in building robust APIs. React is a front-end library for building user interfaces, and Node.js is a 
    JavaScript runtime that allows developers to run JavaScript on the server. Together, they provide a seamless 
    development experience for building dynamic web applications from front-end to back-end.`,
  },
  {
    title: "Understanding JWT Authentication",
    subtitle:
      "JSON Web Tokens (JWT) are an open standard for securely transmitting information between parties as a JSON object. They are commonly used for authentication and authorization in web applications.",
    imageUrl:
      "https://ik.imagekit.io/ably/ghost/prod/2019/05/Screenshot-2019-05-14-at-13.53.46.png?tr=w-1728,q-50",
    author: "Jane Smith",
    likes: [],
    comments: [],
    content: `JWT, or JSON Web Token, is an open standard for securely transmitting information between parties as a JSON object. 
    It is commonly used for authentication and authorization in web applications. JWTs can be signed using a secret 
    (with the HMAC algorithm) or a public/private key pair (using RSA or ECDSA). Once a user logs in, a server generates 
    a JWT, which is then sent to the client. The client stores the token (usually in local storage or cookies) and sends it 
    with each subsequent request, allowing the server to verify the user's identity without needing to store session data.`,
  },
  {
    title: "Getting Started with Node.js",
    subtitle:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enables developers to build scalable network applications quickly and easily using JavaScript on the server side.",
    imageUrl: "",
    author: "Alice Johnson",
    likes: [],
    comments: [],
    content: `Node.js is a powerful and widely-used JavaScript runtime built on Chrome's V8 engine. It enables developers to run 
    JavaScript code outside of a web browser, primarily on the server-side. Node.js is event-driven, non-blocking, and highly 
    efficient, making it an excellent choice for building scalable and high-performance network applications. Its asynchronous 
    nature allows handling multiple requests concurrently without overwhelming system resources. Developers use Node.js to 
    build APIs, web servers, and real-time applications, making it an essential tool for modern full-stack development.`,
  },
  {
    title: "Mastering React Hooks",
    subtitle:
      "React Hooks are functions that let you use state and other React features without writing a class. They allow you to write components with a simpler and more declarative syntax.",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Ijet6kVJqGgul6adezDLQ.png",
    author: "Bob Brown",
    likes: [],
    comments: [],
    content: `React Hooks are a powerful addition to React that allows developers to use state and lifecycle features in functional 
    components. Introduced in React 16.8, Hooks enable developers to manage component state, handle side effects, and access 
    the React context more easily. Popular hooks include useState, useEffect, useContext, and custom hooks. They simplify the 
    development process by reducing the complexity associated with class components and providing a cleaner, more declarative 
    approach to building user interfaces. Hooks also promote reusability by allowing logic to be shared across components.`,
  },
  {
    title: "Building RESTful APIs with Express.js",
    subtitle:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It is often used to build RESTful APIs.",
    imageUrl: "",
    author: "Charlie Green",
    likes: [],
    comments: [],
    content: `Express.js is a widely-used web application framework for Node.js that simplifies the process of building web 
    applications and APIs. Its minimalist design and robust feature set make it ideal for creating RESTful APIs, which follow 
    the principles of Representational State Transfer. Express.js provides easy routing, middleware, and HTTP utilities to 
    facilitate the development process. With its flexibility and simplicity, developers can create scalable, efficient APIs 
    that serve as the backbone of modern web applications. Express.js also integrates seamlessly with MongoDB, enabling 
    the creation of full-stack applications using the MERN stack.`,
  },
];

const seedDB = async () => {
  console.log("Seeding DB...");

  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log("Connected to MongoDB");

      await Blog.deleteMany();
      await Blog.insertMany(blogs);

      console.log("Seed data inserted");
      mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

seedDB();
