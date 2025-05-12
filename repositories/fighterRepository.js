import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  async getOneByFieldInsensitive(field, value) {
    const all = await this.getAll();
    return all.find((item) => {
      const val = item[field];
      return typeof val === "string" && val.toLowerCase() === value.toLowerCase();
    }) || null;
  }
  // async getOne(condition) {
  // const all = await this.getAll();
  // return all.find((item) =>
  //   Object.entries(condition).every(([key, value]) => item[key] === value)
  // ) || null;
// }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
