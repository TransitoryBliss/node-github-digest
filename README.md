## Validate GitHub webhook signatures

Minimalistic package to validate the integrity of incoming GitHub webhooks.

```js
const secret = process.env.GITHUB_SECRET;
const isValid = require('validate-github-signature')(secret);
// ...
if (!isValid(req)) {
  res.status(400);
  return res.json({ message: 'Unauthorized' });
}
```

### Tests

```sh
$ npm run test
```
