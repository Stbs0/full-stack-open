const blogsRouters = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");const jwt = require("jsonwebtoken");

blogsRouters.get("/", async (req, res) => {
  
  const blogs = await Blog.find({}).populate("userId", {
    username: 1,
    name: 1,
  });
console.log(req.user)
  res.json(blogs);
});

blogsRouters.post("/", async (req, res) => {
  const body=req.body
  if (req.body.title === undefined) {
    res.status(400).end({ error: "title is not missing" });
  }
  if (req.body.url === undefined) {
    res.status(400).end({ error: "url is not missing" });
  }
    
    const user = await User.findById(decodedToken.id);
 const newBlog = {
   title: body.title,
   author: body.author,
   url: body.url,
   likes: body.likes || 0,
   userId: user._id.toString(),
 };
  const blog = new Blog(newBlog);
  

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  user.save();
  res.status(201).json(savedBlog);
});

blogsRouters.delete("/:id", async (req, res) => {
  

 const blog= await Blog.findById(req.params.id);

 if (blog.userId.toString() !== decodedToken.id) {
  return res.status(401).send({error:"Invalid user"})
 }
await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
blogsRouters.get("/:id", async (req, res) => {
  const blog = (await Blog.find({})).map(
    (blog) => (blog._id = req.params.id)
  );
  res.json(blog);
});

blogsRouters.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  res.json(updated);
});
module.exports = blogsRouters;
