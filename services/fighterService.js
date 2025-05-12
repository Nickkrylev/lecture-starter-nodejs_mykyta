import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getAllFighters() {
    return fighterRepository.getAll();
  }

  async getFighterById(id) {
    return fighterRepository.getOne({ id });
  }

  async createFighter(data) {
    const nameExists = await fighterRepository.getOneByFieldInsensitive("name", data.name);
    if (nameExists) return null;

    if (!data.health) data.health = 85;
    return fighterRepository.create(data);
  }

  async updateFighter(id, data) {
    const exists = await fighterRepository.getOne({ id });
    if (!exists) return null;

   
    if (data.name) {
      const conflict = await fighterRepository.getOneByFieldInsensitive("name", data.name);
      if (conflict && conflict.id !== id) return null;
    }

    return fighterRepository.update(id, data);
  }

  async deleteFighter(id) {
    const exists = await fighterRepository.getOne({ id });
    if (!exists) return null;

    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
