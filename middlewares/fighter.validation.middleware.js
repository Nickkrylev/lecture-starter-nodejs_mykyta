import { FIGHTER } from "../models/fighter.js";

const isNumInRange = (val, min, max) => typeof val === 'number' && val >= min && val <= max;
const hasOnlyModelFields = (data, modelFields) => Object.keys(data).every(key => modelFields.includes(key));

const createFighterValid = (req, res, next) => {
  const data = req.body;
  const modelFields = Object.keys(FIGHTER).filter(k => k !== 'id' && k !== 'health');

  if (!hasOnlyModelFields(data, [...modelFields, 'health'])) return res.error("Extra fields not allowed");
  for (const field of modelFields) if (!data.hasOwnProperty(field)) return res.error(`Missing field: ${field}`);
  if ('id' in data) return res.error("'id' field not allowed");
  if (!isNumInRange(data.power, 1, 100)) return res.error("Invalid power");
  if (!isNumInRange(data.defense, 1, 10)) return res.error("Invalid defense");
  if ('health' in data && !isNumInRange(data.health, 80, 120)) return res.error("Invalid health");

  next();
};

const updateFighterValid = (req, res, next) => {
  const data = req.body;
  const modelFields = Object.keys(FIGHTER).filter(k => k !== 'id');

  if (!data || Object.keys(data).length === 0) return res.error("At least one field required");
  if (!hasOnlyModelFields(data, modelFields)) return res.error("Extra fields not allowed");
  if ('id' in data) return res.error("'id' field not allowed");
  if ('power' in data && !isNumInRange(data.power, 1, 100)) return res.error("Invalid power");
  if ('defense' in data && !isNumInRange(data.defense, 1, 10)) return res.error("Invalid defense");
  if ('health' in data && !isNumInRange(data.health, 80, 120)) return res.error("Invalid health");

  next();
};

export { createFighterValid, updateFighterValid };
