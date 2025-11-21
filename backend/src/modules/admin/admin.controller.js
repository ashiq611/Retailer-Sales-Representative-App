import { AdminService } from "./admin.service.js";

export const AdminController = {
  // Master data
  async getRegions(req, res) {
    const result = await AdminService.listRegions();
    res.status(200).json({ success: true, message: "Regions fetched successfully", data: result });
  },
  async createRegion(req, res) {
    try {
      const result = await AdminService.createRegion(req.body);
      res.status(201).json({
        success: true,
        message: "Region created successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateRegion(req, res) {
    try {
      const result = await AdminService.updateRegion(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Region updated successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteRegion(req, res) {
    try {
      await AdminService.deleteRegion(req.params.id);
      res.status(200).json({ success: true, message: "Region deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getAreas(req, res) {
    const result = await AdminService.listAreas();
    res.status(200).json({ success: true, message: "Areas fetched successfully", data: result });
  },
  async createArea(req, res) {
    try {
      const result = await AdminService.createArea(req.body);
      res.status(201).json({
        success: true,
        message: "Area created successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateArea(req, res) {
    try {
      const result = await AdminService.updateArea(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Area updated successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteArea(req, res) {
    try {
      await AdminService.deleteArea(req.params.id);
      res.status(200).json({ success: true, message: "Area deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getDistributors(req, res) {
    const result = await AdminService.listDistributors();
    res.status(200).json({ success: true, message: "Distributors fetched successfully", data: result });
  },
  async createDistributor(req, res) {
    try {
      const result = await AdminService.createDistributor(req.body);
      res.status(201).json({
        success: true,
        message: "Distributor created successfully",
        data: result
      });
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
      res.status(200).json({
        success: true,
        message: "Distributor updated successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteDistributor(req, res) {
    try {
      await AdminService.deleteDistributor(req.params.id);
      res.status(200).json({ success: true, message: "Distributor deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getTerritories(req, res) {
    const result = await AdminService.listTerritories();
    res.status(200).json({ success: true, message: "Territories fetched successfully", data: result });
  },
  async createTerritory(req, res) {
    try {
      const result = await AdminService.createTerritory(req.body);
      res.status(201).json({
        success: true,
        message: "Territory created successfully",
        data: result
      });
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
      res.status(200).json({
        success: true,
        message: "Territory updated successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async deleteTerritory(req, res) {
    try {
      await AdminService.deleteTerritory(req.params.id);
      res.json({ success: true, message: "Territory deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Assign / Unassign
  async bulkAssign(req, res) {
    try {
      const result = await AdminService.bulkAssign(req.body);
      res.status(200).json({ success: true, message: "Bulk assign successful", data: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async bulkUnassign(req, res) {
    try {
      const result = await AdminService.bulkUnassign(req.body);
      res.status(200).json({ success: true, message: "Bulk unassign successful", data: result });
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
      res.status(200).json({ success: true, message: "Retailers imported successfully", data: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
