import request from "supertest";
import app from "../app.js";
import { prisma } from "../config/db.js";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: 1, role: "SALES_REP" },
  process.env.JWT_SECRET
);

describe("GET /retailers/:uid - Retailer Detail", () => {
  it("should return retailer details", async () => {
    jest.spyOn(prisma.retailer, "findUnique")
      .mockResolvedValue({
        id: 1,
        uid: "RT-1",
        name: "Retailer 1"
      });

    jest.spyOn(prisma.salesRepRetailer, "findUnique")
      .mockResolvedValue({
        retailerId: 1,
        salesRepId: 1
      });

    const res = await request(app)
      .get("/retailers/RT-1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.uid).toBe("RT-1");
  });
});
