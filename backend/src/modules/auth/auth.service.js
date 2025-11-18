import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db.js";

export const AuthService = {
  async login(username, password) {
    const admin = await prisma.adminUser.findUnique({ where: { username } });
    const rep = !admin ? await prisma.salesRep.findUnique({ where: { username } }) : null;

    const user = admin ?? rep;
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token };
  }
};
