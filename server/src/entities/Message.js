const shortid = require('shortid');

class Message {
  constructor({ subject, body, senderId, recipientId }) {
    this.id = shortid.generate();
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.subject = subject;
    this.body = body;
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);
    const amountInvalid = propertyNames
      .map((property) => (!!this[property] ? null : `${property} is missing!`))
      .filter((item) => !!item);

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}

module.exports = Message;
