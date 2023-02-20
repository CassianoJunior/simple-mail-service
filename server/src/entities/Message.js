const shortid = require('shortid');

class Message {
  constructor({ subject, body, senderId, recipientId }) {
    this.id = shortid.generate();
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.subject = subject;
    this.body = body;
    this.isRead = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);
    const amountInvalid = propertyNames
      .map((property) =>
        !!this[property] || property === 'isRead'
          ? null
          : `${property} is missing!`
      )
      .filter((item) => !!item);

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}

module.exports = Message;
