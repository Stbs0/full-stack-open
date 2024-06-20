const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;
const Comment = require("../models/comment");
router.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate({
      path: "comments",
      select: "comment id",
    })
    .populate({
      path: "user",
      select: "username name id",
    })
    .select("title author url comments likes user id");;

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  blog.likes = blog.likes | 0;

  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }

  if (blog.user && user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString(),
  );

  await user.save();

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.json(updatedBlog);
});

router.post("/:id/comments", async (req, res) => {
  const blogId = req.params.id;
  const comment = {
    comment: req.body.comment,
    blog: blogId,
  };
  const newComment = new Comment(comment);
  const savedComment = await newComment.save();

  const blog = await Blog.findById(blogId);
  console.log(blog);
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  res.send(201).json(savedComment);
});
router.get("/:id/comments", async (req, res) => {
  const blogId = req.params.id;
  const comment = await Comment.find({}).populate("blog", {
    comments: 0,
    user: 0,
  });

  console.log(comment);
  res.json(comment);
});
module.exports = router;
