class MessageService {
  constructor({ messagesRepository }) {
    this.messagesRepository = messagesRepository;
  }

  async find(id) {
    return await this.messagesRepository.find(id);
  }

  async findByUser(userId) {
    return await this.messagesRepository.findByUser(userId);
  }

  async create(data) {
    return await this.messagesRepository.create(data);
  }

  async update(id, data) {
    return await this.messagesRepository.update(id, data);
  }

  async delete(id) {
    return await this.messagesRepository.delete(id);
  }
}

module.exports = MessageService;
