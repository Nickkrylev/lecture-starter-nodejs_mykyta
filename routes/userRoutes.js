import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  responseMiddleware,
  async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.success(users);
    } catch {
      res.error("Get users failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  responseMiddleware, 
  async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.error("User not found", 404);
      res.success(user);
    } catch {
      res.error("Get user failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  responseMiddleware, 
  createUserValid,
  async (req, res, next) => {
    try {
      const created = await userService.createUser(req.body);
      if (!created) return res.error("Duplicate email or phone");
      res.success(created);
    } catch {
      res.error("Create user failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  responseMiddleware, 
  updateUserValid,
  async (req, res, next) => {
    try {
      const updated = await userService.updateUser(req.params.id, req.body);
      if (!updated) return res.error("User not found", 404);
      res.success(updated);
    } catch {
      res.error("Update failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  responseMiddleware,
  async (req, res, next) => {
    try {
      const deleted = await userService.deleteUser(req.params.id);
      if (!deleted) return res.error("User not found", 404);
      res.success({ message: "User deleted" });
    } catch {
      res.error("Delete failed");
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
