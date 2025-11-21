import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";

describe("POST /auth/login", () => {
  it("should login successfully", async () => {
    const hashed = await bcrypt.hash("admin123", 10);

    jest.spyOn(prisma.adminUser, "findUnique")
      .mockResolvedValue({
        id: 1,
        username: "admin",
        passwordHash: hashed,
        role: "ADMIN"
      });

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "admin123" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    // NOW matches Postman output
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
  });
});
