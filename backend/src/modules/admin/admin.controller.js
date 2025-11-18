import { AdminService } from "./admin.service.js";

export const AdminController = {
  // Master data
  async getRegions(req, res) {
    const data = await AdminService.listRegions();
    res.json(data);
  },
  async createRegion(req, res) {
    try {
      const result = await AdminService.createRegion(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateRegion(req, res) {
    try {
      const result = await AdminService.updateRegion(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteRegion(req, res) {
    try {
      await AdminService.deleteRegion(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getAreas(req, res) {
    const data = await AdminService.listAreas();
    res.json(data);
  },
  async createArea(req, res) {
    try {
      const result = await AdminService.createArea(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateArea(req, res) {
    try {
      const result = await AdminService.updateArea(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteArea(req, res) {
    try {
      await AdminService.deleteArea(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getDistributors(req, res) {
    const data = await AdminService.listDistributors();
    res.json(data);
  },
  async createDistributor(req, res) {
    try {
      const result = await AdminService.createDistributor(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateDistributor(req, res) {
    try {
      const result = await AdminService.updateDistributor(
        req.params.id,
        req.body
      );
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteDistributor(req, res) {
    try {
      await AdminService.deleteDistributor(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getTerritories(req, res) {
    const data = await AdminService.listTerritories();
    res.json(data);
  },
  async createTerritory(req, res) {
    try {
      const result = await AdminService.createTerritory(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateTerritory(req, res) {
    try {
      const result = await AdminService.updateTerritory(
        req.params.id,
        req.body
      );
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteTerritory(req, res) {
    try {
      await AdminService.deleteTerritory(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Assign / Unassign
  async bulkAssign(req, res) {
    try {
      const result = await AdminService.bulkAssign(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async bulkUnassign(req, res) {
    try {
      const result = await AdminService.bulkUnassign(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Import
  async importRetailers(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "CSV file is required" });
      }
      const result = await AdminService.importRetailersFromCsv(req.file.buffer);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
