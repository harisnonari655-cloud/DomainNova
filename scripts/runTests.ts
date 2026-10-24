import { runTests } from '../src/tests/domainValidator.test';

const results = runTests();
if (results.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
