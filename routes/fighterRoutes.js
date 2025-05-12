import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
    responseMiddleware,
  async (req, res, next) => {
    try {
      const fighters = await fighterService.getAllFighters();
      res.success(fighters);
    } catch (err) {
      res.error("Failed to get fighters");
    } finally {
      next();
    }
  },
  
);

router.get(
  "/:id",
    responseMiddleware,
  async (req, res, next) => {
    try {
      const fighter = await fighterService.getFighterById(req.params.id);
      if (!fighter) return res.error("Fighter not found", 404);
      res.success(fighter);
    } catch (err) {
      res.error("Failed to get fighter");
    } finally {
      next();
    }
  },
  
);

router.post(
  "/",
    responseMiddleware,
  createFighterValid,
  async (req, res, next) => {
    try {
      const created = await fighterService.createFighter(req.body);
      if (!created) return res.error("Fighter already exists");
      res.success(created);
    } catch (err) {
      res.error("Failed to create fighter");
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
    responseMiddleware,
  updateFighterValid,
  async (req, res, next) => {
    try {
      const updated = await fighterService.updateFighter(req.params.id, req.body);
      if (!updated) return res.error("Fighter not found", 404);
      res.success(updated);
    } catch (err) {
      res.error("Failed to update fighter");
    } finally {
      next();
    }
  },
  
);

router.delete(
  "/:id",
  responseMiddleware,
  async (req, res, next) => {
    try {
      const deleted = await fighterService.deleteFighter(req.params.id);
      if (!deleted) return res.error("Fighter not found", 404);
      res.success({ message: "Fighter deleted" });
    } catch (err) {
      res.error("Failed to delete fighter");
    } finally {
      next();
    }
  },
  
);

export { router };
