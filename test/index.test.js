const secret = 'qwerty';
const crypto = require('crypto');
const index = require('../');
const githubDigest = index(secret);

const payload = {
  body: {
    hello: 'world',
  },
};

it('should return true when valid digest', () =>
  expect(githubDigest.validate(githubDigest.sign(payload))).toBe(true));

it('should return false when invalid digest', () => {
  const { sign } = index('dvorak');
  expect(githubDigest.validate(sign(payload))).toBe(false);
});

it('should return false when header is missing', () =>
  expect(githubDigest.validate(payload)).toBe(false));
