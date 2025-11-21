import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

const adminToken = jwt.sign({ id: 1, role: "ADMIN" }, process.env.JWT_SECRET)

describe("POST /admin/regions - Create Region", () => {
  it("should create a region successfully", async () => {
    jest.spyOn(prisma.region, "create")
      .mockResolvedValue({
        id: 10,
        name: "Dhaka North"
      });

    const res = await request(app)
      .post("/admin/regions")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Dhaka North" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Dhaka North");
  });
});
