import { RetailersService } from "./retailers.service.js";

export const RetailersController = {
  async list(req, res) {
    try {
      const data = await RetailersService.list(req.user.id, req.query);
      res.status(200).json({
        success: true,
        message: "Retailers fetched successfully",
        ...data
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async detail(req, res) {
    try {
      const result = await RetailersService.detail(req.params.uid, req.user.id);
      res.status(200).json({
        success: true,
        message: "Retailer details fetched successfully",
        data: result
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const result = await RetailersService.update(req.params.uid, req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: "Retailer updated successfully",
        data: result
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
