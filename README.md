## Validate GitHub webhook signatures

Minimalistic package to validate the integrity of incoming GitHub webhooks with
zero dependencies.

### Usage

```js
// initialize with the secret
const secret = process.env.GITHUB_SECRET;
const { validate, sign } = require('github-digest')(secret);

// Validating:
if (!validate(req)) {
  res.status(400);
  return res.json({ message: 'Unauthorized' });
}

// You can also sign your own requests (useful for integration testing)
const payload = { body: { hello: 'world' } };
assert.ok(validate(sign(payload))); // => ok
```

### Tests

```sh
$ npm run test
```
