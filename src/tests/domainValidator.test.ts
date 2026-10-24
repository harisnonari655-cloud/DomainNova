import { validateDomainSyntax, normalizeDomainInput, generateSuggestions } from '../lib/domainValidator';
import { PROVIDERS } from '../data/providers';

export function runTests(): { passed: number; failed: number; errors: string[] } {
  let passed = 0;
  let failed = 0;
  const errors: string[] = [];

  function assert(condition: boolean, testName: string) {
    if (condition) {
      passed++;
      console.log(`[PASS] ${testName}`);
    } else {
      failed++;
      errors.push(testName);
      console.error(`[FAIL] ${testName}`);
    }
  }

  console.log('--- Running DomainNova Test Suite ---');

  // Test 1: Normalization
  assert(normalizeDomainInput('  https://EXAMPLE.COM/path?arg=1#hash  ') === 'example.com', 'Normalizes URL protocol, path, query and whitespace');
  assert(normalizeDomainInput('http://test.is-a.dev:8080/') === 'test.is-a.dev', 'Normalizes port and protocol');
  assert(normalizeDomainInput('mydomain.org.') === 'mydomain.org', 'Strips trailing dot');

  // Test 2: Standard valid domain syntax
  const validStandard = validateDomainSyntax('example.com');
  assert(validStandard.isValid === true, 'example.com is valid');
  assert(validStandard.sld === 'example', 'example.com sld is example');
  assert(validStandard.tld === 'com', 'example.com tld is com');
  assert(validStandard.isSubdomain === false, 'example.com is not marked as subdomain');

  // Test 3: Multi-level ccTLD
  const validCcTld = validateDomainSyntax('techblog.co.uk');
  assert(validCcTld.isValid === true, 'techblog.co.uk is valid');
  assert(validCcTld.sld === 'techblog', 'techblog.co.uk sld is techblog');
  assert(validCcTld.tld === 'co.uk', 'techblog.co.uk tld is co.uk');

  // Test 4: Special Community Free Subdomain (is-a.dev)
  const validDev = validateDomainSyntax('alice.is-a.dev');
  assert(validDev.isValid === true, 'alice.is-a.dev is valid');
  assert(validDev.sld === 'alice', 'alice.is-a.dev sld is alice');
  assert(validDev.tld === 'is-a.dev', 'alice.is-a.dev recognized special tld suffix');
  assert(validDev.isSubdomain === true, 'alice.is-a.dev is identified as subdomain');

  // Test 5: Special JS.ORG Subdomain
  const validJs = validateDomainSyntax('myreactapp.js.org');
  assert(validJs.isValid === true, 'myreactapp.js.org is valid');
  assert(validJs.sld === 'myreactapp', 'myreactapp.js.org sld is myreactapp');
  assert(validJs.tld === 'js.org', 'myreactapp.js.org tld is js.org');

  // Test 6: Invalid syntax - consecutive dots
  const invalidDots = validateDomainSyntax('test..com');
  assert(invalidDots.isValid === false, 'test..com is rejected for empty label');

  // Test 7: Invalid syntax - leading hyphen
  const invalidHyphen = validateDomainSyntax('-badname.com');
  assert(invalidHyphen.isValid === false, '-badname.com is rejected for leading hyphen');

  // Test 8: Invalid syntax - label > 63 chars
  const longLabel = 'a'.repeat(64) + '.com';
  const invalidLength = validateDomainSyntax(longLabel);
  assert(invalidLength.isValid === false, 'Label exceeding 63 characters is rejected');

  // Test 9: Suggestions generator
  const suggestions = generateSuggestions('novadev');
  assert(suggestions.length > 0, 'Generates community suggestions');
  assert(suggestions.includes('novadev.is-a.dev'), 'Contains is-a.dev suggestion');
  assert(suggestions.includes('novadev.github.io'), 'Contains github.io suggestion');

  // Test 10: Provider Data Integrity
  assert(PROVIDERS.length >= 8, 'Provider catalog has at least 8 verified entries');
  for (const p of PROVIDERS) {
    assert(!!p.id && !!p.name && !!p.claimUrl, `Provider ${p.name} has required id, name, and claimUrl`);
    assert(p.officialUrl.startsWith('https://'), `Provider ${p.name} has HTTPS official URL`);
    assert(p.lastVerifiedDate.length === 10, `Provider ${p.name} has valid ISO date`);
  }

  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
  return { passed, failed, errors };
}
