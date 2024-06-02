const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const assert = require("node:assert");
const helper = require("./test.helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("return all blogs", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify blogs id", async () => {
  const res = await helper.BlogsInDb();

  const isIdPresent = res.every((blog) => Object.keys(blog).includes("id"));

  assert.strictEqual(isIdPresent, true);
});

test("verify creating a new blog", async () => {
  const newBlog = {
    title: "dhrt",
    author: "ukyuf",
    url: "http://localhost:3003/api/blogs",
    likes: 47435,
  };
  const beforeRes = await helper.BlogsInDb();

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const afterRes = await helper.BlogsInDb();
  assert.strictEqual(afterRes.length, beforeRes.length + 1);
});

test("verify saved blog", async () => {
  const newBlog = {
    title: "dthzth",
    author: "zdthdtn",
    url: "http://blog.cleancothdzder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 67,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const allBlogs = await helper.BlogsInDb();
  const savedBlog = allBlogs.filter((blog) => {
    return (
      blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url &&
      blog.likes === newBlog.likes
    );
  });

  assert.strictEqual(savedBlog[0].title, newBlog.title);
  assert.strictEqual(savedBlog[0].author, newBlog.author);
  assert.strictEqual(savedBlog[0].url, newBlog.url);
  assert.strictEqual(savedBlog[0].likes, newBlog.likes);
});

test("verify default like blog", async () => {
  const newBlog = {
    title: "Rhvhjvhv",
    author: "Milbljb",
    url: "https://reactpatterns.com/",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const allBlogs = await helper.BlogsInDb();
  const savedBlog = allBlogs.filter((blog) => {
    return (
      blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url
    );
  });
  assert.strictEqual(savedBlog[0].likes, 0);
});

test("verify title is missing blog", async () => {
  const newBlog = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 2,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});
test("verify url have blog", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",

    likes: 2,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("delete certain blog", async () => {
  const allBlogs = await helper.BlogsInDb();
  const deleteOne = allBlogs[0];
  await api.delete(`/api/blogs/${deleteOne.id}`).expect(204);
  const res = await helper.BlogsInDb();

  assert.strictEqual(res.length, helper.initialBlogs.length - 1);
});

test("test updating the likes of the blog", async () => {
  const allBlogs = await helper.BlogsInDb();
  const old = allBlogs[0];
  const newBlog= {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 20,
  };

 const updated= await api
    .put(`/api/blogs/${old.id}`)
    .send(newBlog)
    .expect("Content-Type", /application\/json/);

const end = await helper.BlogsInDb();

assert.strictEqual(end.length, allBlogs.length)

assert.strictEqual(end[0].likes, 20)
});

after(async () => {
  await mongoose.connection.close();
});
