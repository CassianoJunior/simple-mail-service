class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async find(id) {
    return await this.userRepository.find(id);
  }

  async create(data) {
    return await this.userRepository.create(data);
  }

  async update(id, data) {
    return await this.userRepository.update(id, data);
  }

  async delete(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
