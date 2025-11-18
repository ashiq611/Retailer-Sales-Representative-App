import { prisma } from "../../config/db.js";
import { redis } from "../../config/redis.js";

export const RetailersService = {
  async list(salesRepId, query) {
    const cacheKey = `rep:${salesRepId}:retailers:${JSON.stringify(query)}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const { page = 1, limit = 20, search, regionId, areaId, distributorId, territoryId } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const where = {
      salesRepMappings: { some: { salesRepId } }
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { uid: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } }
      ];
    }

    if (regionId) where.regionId = Number(regionId);
    if (areaId) where.areaId = Number(areaId);
    if (distributorId) where.distributorId = Number(distributorId);
    if (territoryId) where.territoryId = Number(territoryId);

    const skip = (pageNum - 1) * limitNum;

    const [data, total] = await prisma.$transaction([
      prisma.retailer.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          region: true,
          area: true,
          distributor: true,
          territory: true
        }
      }),
      prisma.retailer.count({ where })
    ]);

    const result = { data, meta: { page, limit, total } };

    await redis.set(cacheKey, JSON.stringify(result), { EX: 30 });

    return result;
  },

  async detail(uid, salesRepId) {
    const cacheKey = `retailer:${uid}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const retailer = await prisma.retailer.findUnique({
      where: { uid },
      include: {
        region: true,
        area: true,
        distributor: true,
        territory: true
      }
    });

    if (!retailer) throw new Error("Retailer not found");

    const assigned = await prisma.salesRepRetailer.findUnique({
      where: {
        salesRepId_retailerId: { salesRepId, retailerId: retailer.id }
      }
    });

    if (!assigned) throw new Error("Not assigned to you");

    await redis.set(cacheKey, JSON.stringify(retailer), { EX: 60 });

    return retailer;
  },

  async update(uid, salesRepId, data) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No update fields provided");
  }

  const retailer = await prisma.retailer.findUnique({ where: { uid } });
  if (!retailer) throw new Error("Retailer not found");

  const assigned = await prisma.salesRepRetailer.findUnique({
    where: { salesRepId_retailerId: { salesRepId, retailerId: retailer.id } }
  });

  if (!assigned) throw new Error("Not assigned");

  const updated = await prisma.retailer.update({
    where: { id: retailer.id },
    data: data
  });

  await redis.del(`retailer:${uid}`);

  return updated;
}

};
