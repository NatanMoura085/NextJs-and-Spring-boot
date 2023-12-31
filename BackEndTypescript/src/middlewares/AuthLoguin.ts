import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.register.findFirst({ where: { email: email } });
    console.log(user?.email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = sign({ id: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    next();

    return res.json({ message: "usuario autenticado com sucesso",token });
  } catch (error) {
    console.log(error);
    next();
    return res.json({ message: "error internal serve" });
  }
};

export default login;
