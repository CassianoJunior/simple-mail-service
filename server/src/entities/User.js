const shortid = require('shortid');

class User {
  constructor({ name, email }) {
    this.id = shortid.generate();
    this.name = name;
    this.email = email;
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

module.exports = User;
