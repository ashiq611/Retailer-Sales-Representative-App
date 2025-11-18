import { AuthService } from "./auth.service.js";

export const AuthController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
};
