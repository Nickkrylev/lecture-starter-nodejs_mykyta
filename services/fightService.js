import { fighterRepository } from "../repositories/fighterRepository.js";
import { fightRepository } from "../repositories/fightRepository.js";

class fightsService {
  async startFight(fighter1Id, fighter2Id) {
    const fighter1 = fighterRepository.getOne({ id: fighter1Id });
const fighter2 = fighterRepository.getOne({ id: fighter2Id });



    if (!fighter1 || !fighter2) return null;

    let log = [];
    let round = 1;
    let f1Health = fighter1.health || 85;
    let f2Health = fighter2.health || 85;

    while (f1Health > 0 && f2Health > 0) {
      const f1Hit = this.calculateHit(fighter1.power, fighter2.defense);
      const f2Hit = this.calculateHit(fighter2.power, fighter1.defense);

      f2Health -= f1Hit;
      f1Health -= f2Hit;

      log.push(`Round ${round++}: ${fighter1.name} hit ${f1Hit}, ${fighter2.name} hit ${f2Hit}`);
    }

    const winner = f1Health > 0 ? fighter1.name : fighter2.name;

    const fightResult = {
      fighter1: fighter1.name,
      fighter2: fighter2.name,
      winner,
      rounds: round - 1,
      log,
    };

    await fightRepository.save(fightResult);
    return fightResult;
  }

  calculateHit(power, defense) {
    const raw = power - defense;
    return raw > 0 ? Math.floor(Math.random() * raw) + 1 : 1;
  }

  async getFightHistory() {
    return await fightRepository.getAll();
  }
}

const fightsServices = new fightsService();

export { fightsServices };
