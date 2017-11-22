const crypto = require('crypto');

module.exports = secret => {
  return req => {
    const digest = crypto
      .createHmac('sha1', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    return req.headers['x-hub-signature'] === `sha1=${digest}`;
  };
};
