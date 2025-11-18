import { RetailersService } from "./retailers.service.js";

export const RetailersController = {
  async list(req, res) {
    try {
      const result = await RetailersService.list(req.user.id, req.query);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async detail(req, res) {
    try {
      const result = await RetailersService.detail(req.params.uid, req.user.id);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const result = await RetailersService.update(req.params.uid, req.user.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
