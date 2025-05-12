import { Router } from "express";
import { fightsServices } from "../services/fightService.js";
import {   responseMiddleware  } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  responseMiddleware,
  async (req, res, next) => {
    try {
      const { fighter1, fighter2 } = req.body;
      if (!fighter1 || !fighter2) return res.error("Missing fighter IDs");

      const result = await fightsServices.startFight(fighter1, fighter2);
      if (!result) return res.error("Fight failed");

      res.success(result);
    } catch (err) {
      res.error("Fight error");
    } finally {
      next();
    }
  },
   
);

router.get(
  "/",
    responseMiddleware,

  async (req, res, next) => {
    try {
      const history = await fightsServices.getFightHistory();
      res.success(history);
    } catch (err) {
      res.error("Failed to get fight history");
    } finally {
      next();
    }
  },
   
);

export { router };
