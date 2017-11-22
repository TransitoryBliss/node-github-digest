const crypto = require('crypto');

module.exports = secret => {
  return {
    validate(req) {
      const signature = req.headers['x-hub-signature'];
      if (!signature) return false;

      const digest = crypto
        .createHmac('sha1', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      return signature === `sha1=${digest}`;
    },
    sign(req) {
      const digest = crypto
        .createHmac('sha1', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      req.headers = req.headers || {};
      req.headers['x-hub-signature'] = `sha1=${digest}`;
      return req;
    },
  };
};
