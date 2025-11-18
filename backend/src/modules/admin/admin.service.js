import { prisma } from "../../config/db.js";
import { parseCsvBuffer } from "../../utils/csv.js";

export const AdminService = {
  // ---------- MASTER DATA CRUD ----------

  // Region
  listRegions() {
    return prisma.region.findMany({ orderBy: { id: "asc" } });
  },

  createRegion(data) {
    return prisma.region.create({ data: { name: data.name } });
  },

  updateRegion(id, data) {
    return prisma.region.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  },

  deleteRegion(id) {
    return prisma.region.delete({ where: { id: Number(id) } });
  },

  // Area
  listAreas() {
    return prisma.area.findMany({
      include: { region: true },
      orderBy: { id: "asc" },
    });
  },

  createArea(data) {
    return prisma.area.create({
      data: {
        name: data.name,
        regionId: Number(data.regionId),
      },
    });
  },

  updateArea(id, data) {
    return prisma.area.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        regionId: Number(data.regionId),
      },
    });
  },

  deleteArea(id) {
    return prisma.area.delete({ where: { id: Number(id) } });
  },

  // Distributor
  listDistributors() {
    return prisma.distributor.findMany({ orderBy: { id: "asc" } });
  },

  createDistributor(data) {
    return prisma.distributor.create({
      data: {
        name: data.name,
      },
    });
  },

  updateDistributor(id, data) {
    return prisma.distributor.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  },

  deleteDistributor(id) {
    return prisma.distributor.delete({ where: { id: Number(id) } });
  },

  // Territory
  listTerritories() {
    return prisma.territory.findMany({
      include: { area: { include: { region: true } } },
      orderBy: { id: "asc" },
    });
  },

  createTerritory(data) {
    return prisma.territory.create({
      data: {
        name: data.name,
        areaId: Number(data.areaId),
      },
    });
  },

  updateTerritory(id, data) {
    return prisma.territory.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        areaId: Number(data.areaId),
      },
    });
  },

  deleteTerritory(id) {
    return prisma.territory.delete({ where: { id: Number(id) } });
  },

  // ---------- BULK ASSIGN / UNASSIGN ----------

  async bulkAssign({ salesRepId, retailerIds }) {
    const data = retailerIds.map((retailerId) => ({
      salesRepId: Number(salesRepId),
      retailerId: Number(retailerId),
    }));

    await prisma.$transaction(
      data.map((d) =>
        prisma.salesRepRetailer.upsert({
          where: {
            salesRepId_retailerId: {
              salesRepId: d.salesRepId,
              retailerId: d.retailerId,
            },
          },
          create: d,
          update: {},
        })
      )
    );

    return { success: true };
  },

  async bulkUnassign({ salesRepId, retailerIds }) {
    await prisma.salesRepRetailer.deleteMany({
      where: {
        salesRepId: Number(salesRepId),
        retailerId: { in: retailerIds.map((id) => Number(id)) },
      },
    });

    return { success: true };
  },

  // ---------- CSV IMPORT RETAILERS ----------

  async importRetailersFromCsv(fileBuffer) {
    const rows = await parseCsvBuffer(fileBuffer);

    let imported = 0;

    for (const row of rows) {
      const {
        uid,
        name,
        phone,
        regionName,
        areaName,
        distributorName,
        territoryName,
        points,
        routes,
      } = row;

      if (!uid || !name || !phone) continue;

      // find or create region
      let region = null;
      if (regionName) {
        region = await prisma.region.upsert({
          where: { name: regionName },
          create: { name: regionName },
          update: {},
        });
      }

      // area depends on region
      let area = null;
      if (areaName && region) {
        area = await prisma.area.upsert({
          where: {
            name_regionId: {
              name: areaName,
              regionId: region.id,
            },
          },
          create: { name: areaName, regionId: region.id },
          update: {},
        });
      }

      let distributor = null;
      if (distributorName) {
        distributor = await prisma.distributor.upsert({
          where: { name: distributorName },
          create: { name: distributorName },
          update: {},
        });
      }

      let territory = null;
      if (territoryName && area) {
        territory = await prisma.territory.upsert({
          where: {
            name_areaId: {
              name: territoryName,
              areaId: area.id,
            },
          },
          create: { name: territoryName, areaId: area.id },
          update: {},
        });
      }

      await prisma.retailer.upsert({
        where: { uid },
        create: {
          uid,
          name,
          phone,
          points: points ? Number(points) : 0,
          routes: routes || null,
          regionId: region?.id,
          areaId: area?.id,
          distributorId: distributor?.id,
          territoryId: territory?.id,
        },
        update: {
          name,
          phone,
          points: points ? Number(points) : undefined,
          routes: routes || undefined,
          regionId: region?.id,
          areaId: area?.id,
          distributorId: distributor?.id,
          territoryId: territory?.id,
        },
      });

      imported++;
    }

    return { success: true, imported };
  },
};
