const blogsRouters = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
blogsRouters.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouters.post("/", async (request, response) => {
  if (request.body.title === undefined) {
    response.status(400).end({ error: "title is not missing" });
  }
  if (request.body.url === undefined) {
    response.status(400).end({ error: "url is not missing" });
  }
  const blog = new Blog(request.body);

  blog.likes = blog.likes || 0;

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouters.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
blogsRouters.get("/:id", async (request, response) => {
  const blog = (await Blog.find({})).map(
    (blog) => (blog._id = request.params.id)
  );
  response.json(blog);
});

blogsRouters.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updated = await Blog.findByIdAndUpdate(req.params.id, blog,{new:true});

  res.json(updated)
});
module.exports = blogsRouters;
