import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async getAllUsers() {
    return userRepository.getAll();
  }

  async getUserById(id) {
    return userRepository.getOne({ id });
  }

  async createUser(data) {
    const existingByEmail = await userRepository.getOne({ email: data.email });
    const existingByPhone = await userRepository.getOne({ phone: data.phone });

    if (existingByEmail || existingByPhone) return null;

    return userRepository.create(data);
  }

  async updateUser(id, data) {
    const user = await userRepository.getOne({ id });
    if (!user) return null;

    // Якщо оновлюється email або phone — перевірка унікальності
    if (data.email) {
      const emailConflict = await userRepository.getOne({ email: data.email });
      if (emailConflict && emailConflict.id !== id) return null;
    }

    if (data.phone) {
      const phoneConflict = await userRepository.getOne({ phone: data.phone });
      if (phoneConflict && phoneConflict.id !== id) return null;
    }

    return userRepository.update(id, data);
  }

  async deleteUser(id) {
    const user = await userRepository.getOne({ id });
    if (!user) return null;
    return userRepository.delete(id);
  }

  async search(search) {
    return userRepository.getOne(search);
  }

  async login(email, password) {
    const user = await userRepository.getOne({ email });
    if (!user || user.password !== password) return null;
    return user;
  }
}

const userService = new UserService();

export { userService };
