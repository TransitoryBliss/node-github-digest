const secret = 'qwerty';
const crypto = require('crypto');
const validate = require('../')(secret);

const payload = {
  body: {
    hello: 'world',
  },
};

const sign = (req, token) => {
  const digest = crypto
    .createHmac('sha1', token)
    .update(JSON.stringify(req.body))
    .digest('hex');

  req.headers = req.headers || {};
  req.headers['x-hub-signature'] = `sha1=${digest}`;
  return req;
};

it('should return true when valid digest', () =>
  expect(validate(sign(payload, secret))).toBe(true));

it('should return false when invalid digest', () =>
  expect(validate(sign(payload, 'dvorak'))).toBe(false));

it('should return false when header is missing', () =>
  expect(validate(payload)).toBe(false));
