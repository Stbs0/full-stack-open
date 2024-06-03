const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const api = supertest(app);
const helper = require("./test.helper");

beforeEach(async () => {
  const users = [
    {
      username: "stbs",
      name: "mohammed",
      password: "knvnwij84",
    },
    {
      username: "qwer",
      name: "salem",
      password: "ntjrstj45",
    },
  ];
  await User.deleteMany({});
  const userObj = users.map((user) => new User(user));
  const usersPromises = userObj.map((obj) => obj.save());
  await Promise.all(usersPromises);
});
test("get all users", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
describe("test post", () => {
  test("create user", async () => {
    const newUser = {
      username: "iwejvg",
      name: "jen",
      password: "kweuhfuwehguhnvnwij84",
    };
    const user = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const users = await helper.UsersInDb();
    const usernames = users.map(user=>user.username)
    assert(usernames.includes("iwejvg"));
  });
  test("verifying length of username ", async () => {
    const newUser = {
      username: "vg",
      name: "jen",
      password: "kweuhfuwehguhnvnwij84",
    };
    const beforeUsers = await helper.UsersInDb();
    const user = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    const afterUsers = await helper.UsersInDb();
    assert.deepStrictEqual(beforeUsers, afterUsers);
  });
  test("verifying length of password ", async () => {
    const newUser = {
      username: "vkncksndg",
      name: "jen",
      password: "fe",
    };
    const beforeUsers = await helper.UsersInDb();
    const user = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    const afterUsers = await helper.UsersInDb();
    assert.deepStrictEqual(beforeUsers, afterUsers);
  });

});
after(async () => {
  mongoose.connection.close();
});
