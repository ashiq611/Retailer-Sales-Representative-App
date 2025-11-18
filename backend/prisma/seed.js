import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --------------------------
  // ADMIN USER
  // --------------------------
  const adminPass = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      name: "System Admin",
      passwordHash: adminPass,
      role: "ADMIN",
    },
  });
  console.log("✔ Admin created: admin / admin123");

  // --------------------------
  // SALES REPS
  // --------------------------
  const srPass = await bcrypt.hash("rep123", 10);
  const sr1 = await prisma.salesRep.upsert({
    where: { username: "sr1" },
    update: {},
    create: {
      username: "sr1",
      name: "Sales Rep 1",
      phone: "01700000001",
      passwordHash: srPass,
      role: "SALES_REP",
    },
  });

  const sr2 = await prisma.salesRep.upsert({
    where: { username: "sr2" },
    update: {},
    create: {
      username: "sr2",
      name: "Sales Rep 2",
      phone: "01700000002",
      passwordHash: srPass,
      role: "SALES_REP",
    },
  });

  console.log("✔ Sales Reps created");

  // --------------------------
  // Master Data
  // --------------------------
  const region = await prisma.region.upsert({
    where: { name: "Dhaka" },
    update: {},
    create: { name: "Dhaka" },
  });

  const area = await prisma.area.upsert({
    where: {
      name_regionId: {
        name: "Banani",
        regionId: region.id,
      },
    },
    update: {},
    create: {
      name: "Banani",
      regionId: region.id,
    },
  });

  const distributor = await prisma.distributor.upsert({
    where: { name: "Distributor A" },
    update: {},
    create: { name: "Distributor A" },
  });

  const territory = await prisma.territory.upsert({
    where: {
      name_areaId: {
        name: "Banani-1",
        areaId: area.id,
      },
    },
    update: {},
    create: {
      name: "Banani-1",
      areaId: area.id,
    },
  });

  console.log("✔ Master data created");

  // --------------------------
  // Retailers (70 sample)
  // --------------------------
  const retailers = [];

  for (let i = 1; i <= 70; i++) {
    retailers.push({
      uid: `RT-${i}`,
      name: `Retailer ${i}`,
      phone: `01700001${String(i).padStart(3, "0")}`,
      regionId: region.id,
      areaId: area.id,
      distributorId: distributor.id,
      territoryId: territory.id,
      points: 0,
      routes: "R1",
    });
  }

  await prisma.retailer.createMany({
    data: retailers,
    skipDuplicates: true,
  });

  console.log("✔ 70 Retailers created");

  // --------------------------
  // Assign retailers to SR-1
  // --------------------------
  const allRetailers = await prisma.retailer.findMany();

  await prisma.salesRepRetailer.createMany({
    data: allRetailers.map((r) => ({
      salesRepId: sr1.id,
      retailerId: r.id,
    })),
    skipDuplicates: true,
  });

  console.log("✔ All retailers assigned to SR-1");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
