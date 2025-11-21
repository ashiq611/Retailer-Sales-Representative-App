import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: 1, role: "SALES_REP" },
  process.env.JWT_SECRET
);

describe("PATCH /retailers/:uid - Update Retailer", () => {
  it("should update retailer successfully", async () => {
    jest.spyOn(prisma.retailer, "findUnique")
      .mockResolvedValue({ id: 1 });

    jest.spyOn(prisma.salesRepRetailer, "findUnique")
      .mockResolvedValue({ retailerId: 1 });

    jest.spyOn(prisma.retailer, "update")
      .mockResolvedValue({
        id: 1,
        uid: "RT-1",
        points: 25,
        routes: "R3"
      });

    const res = await request(app)
      .patch("/retailers/RT-1")
      .set("Authorization", `Bearer ${token}`)
      .send({ points: 25, routes: "R3" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.points).toBe(25);
  });
});
