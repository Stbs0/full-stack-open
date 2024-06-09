const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, showBtn, createBlog, likeBtn } = require("./helper");
describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "mohammed ibrahim",
        username: "stbs",
        password: "stbs",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    expect(page.getByText("log in to application")).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "stbs", "stbs");
      await expect(page.getByText("mohammed ibrahim logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("wrong");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText("mohammed ibrahim logged in"),
      ).not.toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "stbs", "stbs");
    });

    test("a new blog can be created", async ({ page }) => {
      createBlog(page, "hello", "me", "www.x.com");
      await expect(page.getByText("hello / me")).toBeVisible();
    });
    describe("when blog exists", () => {
      beforeEach(async ({ page }) => {
        createBlog(page, "hello", "me", "www.x.com");
      });
      test("a blog can be liked", async ({ page }) => {
        await page.getByTestId("show details").click();
        await page.getByTestId("like btn").click();
        await expect(page.getByText("1")).toBeVisible();
      });
      test("a blog can be deleted by the user", async ({ page }) => {
        await page.getByTestId("show details").click();
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByTestId("delete btn").click();
        await expect(page.getByText("hello / me")).not.toBeVisible();
      });
    });
    describe("when several blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "hello1", "me1", "www.x.com1");

        await createBlog(page, "hello2", "me2", "www.x.com2");
        await createBlog(page, "hello3", "me3", "www.x.com3");
      });
      test("score", async ({ page }) => {
        const showBtns = await page.getByTestId("show details").all();
        for (const btn of showBtns) {
          await btn.click();
        }

        const div1 = await page
          .getByTestId("blog-list")
          .filter({ hasText: /hello1 \/ me1/ });
        const div2 = await page
          .getByTestId("blog-list")
          .filter({ hasText: /hello2 \/ me2/ });
        const div3 = await page
          .getByTestId("blog-list")
          .filter({ hasText: /hello3 \/ me3/ });

        const btn1 = await div1.getByTestId("like btn");
        const btn2 = await div2.getByTestId("like btn");
        const btn3 = await div3.getByTestId("like btn");
        console.log(btn1);
        await btn3.click();
        await btn3.click();
        await btn3.click();
        await btn1.click();
        await btn1.click();

        const order = await page.getByTestId("blog-list").all();

     
        console.log(order);
        await expect(order[0]).toHaveText(/hello3 \/ me3/);
        await expect(order[1]).toHaveText(/hello1 \/ me1/);
        await expect(order[2]).toHaveText(/hello2 \/ me2/);
      });
    });
  });
});
7;
