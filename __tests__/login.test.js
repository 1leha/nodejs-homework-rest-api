require("dotenv").config();
const supertest = require("supertest");
const startServer = require("../testServer");
const app = require("../app");

describe("Login test on success.", () => {
  beforeAll(async () => {
    startServer();
  });

  it("should return status, user and token", async () => {
    const mockUser = {
      email: "testUser@mail.com",
      password: "123qwe",
    };

    const res = await supertest(app).post("/users/login").send(mockUser);

    // Return status
    expect(res.statusCode).toBe(200);

    // Return body
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });

  it("should return error if the user input wrong login", async () => {
    const mockUser = {
      email: "1testUser@mail.com",
      password: "123qwe",
    };

    const res = await supertest(app).post("/users/login").send(mockUser);

    // Return status
    expect(res.statusCode).toBe(401);
  });

  it("should return error if the user input wrong password", async () => {
    const mockUser = {
      email: "testUser@mail.com",
      password: "123qwe111",
    };

    const res = await supertest(app).post("/users/login").send(mockUser);

    // Return status
    expect(res.statusCode).toBe(401);
  });

  it("should return error if the user NOT input password", async () => {
    const mockUser = {
      email: "testUser@mail.com",
    };

    const res = await supertest(app).post("/users/login").send(mockUser);

    // Return status
    expect(res.statusCode).toBe(400);
  });
});
