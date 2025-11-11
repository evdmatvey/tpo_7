const { testLoginInvalidCredentials } = require('./tests/incorrect-credentials-login.test');
const { testLoginSuccess } = require('./tests/success-login.test');
const { sleep } = require('./utils/sleep');

async function runTests() {
  await sleep(5000);
  await testLoginSuccess();
  await sleep(5000);
  await testLoginInvalidCredentials();
}
runTests().catch(console.error);
