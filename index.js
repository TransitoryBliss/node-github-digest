const crypto = require('crypto');

module.exports = secret => {
  return req => {
    const signature = req.headers['x-hub-signature'];
    if (!signature) return false;

    const digest = crypto
      .createHmac('sha1', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    return signature === `sha1=${digest}`;
  };
};
