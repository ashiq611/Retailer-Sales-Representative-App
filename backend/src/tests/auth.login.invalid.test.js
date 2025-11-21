import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";

describe("POST /auth/login - Invalid Password", () => {
  it("should return invalid credentials", async () => {
    const hashed = await bcrypt.hash("correctpass", 10);

    const mock = jest.spyOn(prisma.adminUser, "findUnique")
      .mockResolvedValue({
        id: 1,
        username: "admin",
        passwordHash: hashed,
        role: "ADMIN"
      });

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "wrongpass" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid credentials");

    mock.mockRestore();
  });
});
