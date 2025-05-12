import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.error("Missing email or password");
      }

      const user = await authService.login(email, password);
      if (!user) {
        return res.error("Invalid credentials", 404);
      }

      res.success(user);
    } catch (err) {
      res.error("Login failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
