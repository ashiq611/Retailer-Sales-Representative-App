import { AuthService } from "./auth.service.js";

export const AuthController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.status(200).json({
        success: true,
        message: "Login successful",
        token: result.token
      });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
};
