import { DomainValidationResult } from '../types/domain';

const KNOWN_SPECIAL_SUFFIXES = [
  'is-a.dev',
  'js.org',
  'github.io',
  'vercel.app',
  'workers.dev',
  'netlify.app',
  'duckdns.org',
  'eu.org',
  'onrender.com',
  'fly.dev',
  'glitch.me',
  'gitlab.io',
  'openrepos.org',
  'freedns.afraid.org'
];

/**
 * Normalizes raw domain query string by stripping protocol, path, port, whitespace, and trailing dots.
 */
export function normalizeDomainInput(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim().toLowerCase();
  
  // Remove protocols
  cleaned = cleaned.replace(/^[a-z]+:\/\//i, '');
  
  // Remove trailing slashes and paths
  const slashIdx = cleaned.indexOf('/');
  if (slashIdx !== -1) {
    cleaned = cleaned.substring(0, slashIdx);
  }
  
  // Remove port
  const colonIdx = cleaned.lastIndexOf(':');
  if (colonIdx !== -1 && !cleaned.includes(']')) {
    cleaned = cleaned.substring(0, colonIdx);
  }
  
  // Remove trailing dot if present
  if (cleaned.endsWith('.')) {
    cleaned = cleaned.slice(0, -1);
  }

  return cleaned;
}

/**
 * Validates domain according to RFC 1034 / RFC 1123 rules and parses SLD and TLD.
 */
export function validateDomainSyntax(raw: string): DomainValidationResult {
  const normalized = normalizeDomainInput(raw);

  if (!normalized) {
    return {
      isValid: false,
      domain: '',
      sld: '',
      tld: '',
      isSubdomain: false,
      isIdn: false,
      error: 'Please enter a domain name or hostname.'
    };
  }

  // Check total domain length (RFC 1035 max 253 characters)
  if (normalized.length > 253) {
    return {
      isValid: false,
      domain: normalized,
      sld: '',
      tld: '',
      isSubdomain: false,
      isIdn: false,
      error: 'Domain name is too long (maximum 253 characters allowed by RFC 1035).'
    };
  }

  const parts = normalized.split('.');

  // Check if at least 2 labels exist
  if (parts.length < 2) {
    return {
      isValid: false,
      domain: normalized,
      sld: normalized,
      tld: '',
      isSubdomain: false,
      isIdn: false,
      error: 'Domain must include an extension (e.g., example.com, myapp.is-a.dev, site.github.io).'
    };
  }

  let isIdn = false;

  // Validate each label
  for (let i = 0; i < parts.length; i++) {
    const label = parts[i];

    if (!label || label.length === 0) {
      return {
        isValid: false,
        domain: normalized,
        sld: '',
        tld: '',
        isSubdomain: false,
        isIdn: false,
        error: 'Domain contains an empty label (consecutive dots are not allowed).'
      };
    }

    if (label.length > 63) {
      return {
        isValid: false,
        domain: normalized,
        sld: '',
        tld: '',
        isSubdomain: false,
        isIdn: false,
        error: `Label "${label}" exceeds the 63-character limit for a single DNS label.`
      };
    }

    if (label.startsWith('-') || label.endsWith('-')) {
      return {
        isValid: false,
        domain: normalized,
        sld: '',
        tld: '',
        isSubdomain: false,
        isIdn: false,
        error: `Label "${label}" cannot start or end with a hyphen.`
      };
    }

    // Check for IDN punycode
    if (label.startsWith('xn--')) {
      isIdn = true;
    }

    // RFC standard characters: letters, digits, hyphen
    // IDN characters might be unencoded in some user inputs
    if (!/^[a-z0-9-]+$/i.test(label)) {
      // Check if it might be an unencoded IDN (unicode)
      if (/[^\u0000-\u007F]/.test(label)) {
        isIdn = true;
      } else {
        return {
          isValid: false,
          domain: normalized,
          sld: '',
          tld: '',
          isSubdomain: false,
          isIdn: false,
          error: `Label "${label}" contains invalid characters. Only letters, numbers, and hyphens are allowed.`
        };
      }
    }
  }

  // TLD check (the last part)
  const lastPart = parts[parts.length - 1];
  if (/^[0-9]+$/.test(lastPart)) {
    return {
      isValid: false,
      domain: normalized,
      sld: '',
      tld: lastPart,
      isSubdomain: false,
      isIdn: false,
      error: 'The top-level domain (extension) cannot be entirely numeric.'
    };
  }

  // Identify special multi-level suffixes
  let matchedSpecialSuffix = '';
  for (const special of KNOWN_SPECIAL_SUFFIXES) {
    if (normalized.endsWith('.' + special)) {
      matchedSpecialSuffix = special;
      break;
    }
  }

  let sld = '';
  let tld = '';
  let isSubdomain = false;
  let subdomainPart = '';

  if (matchedSpecialSuffix) {
    tld = matchedSpecialSuffix;
    const prefix = normalized.slice(0, -(matchedSpecialSuffix.length + 1));
    const prefixParts = prefix.split('.');
    sld = prefixParts[prefixParts.length - 1];
    isSubdomain = true;
    if (prefixParts.length > 1) {
      subdomainPart = prefixParts.slice(0, -1).join('.');
    }
  } else if (parts.length === 2) {
    sld = parts[0];
    tld = parts[1];
    isSubdomain = false;
  } else {
    // Standard 3+ parts (e.g. sub.example.com or sub.example.co.uk)
    // Check for common ccTLD two-part extensions like co.uk, com.au, org.uk
    const secondToLast = parts[parts.length - 2];
    const isTwoPartTld = ['co', 'com', 'org', 'edu', 'gov', 'net'].includes(secondToLast) && lastPart.length === 2;

    if (isTwoPartTld && parts.length >= 3) {
      tld = `${secondToLast}.${lastPart}`;
      sld = parts[parts.length - 3];
      if (parts.length > 3) {
        isSubdomain = true;
        subdomainPart = parts.slice(0, parts.length - 3).join('.');
      }
    } else {
      tld = lastPart;
      sld = parts[parts.length - 2];
      isSubdomain = true;
      subdomainPart = parts.slice(0, parts.length - 2).join('.');
    }
  }

  return {
    isValid: true,
    domain: normalized,
    sld,
    tld,
    isSubdomain,
    subdomainPart: subdomainPart || undefined,
    isIdn,
    suggestions: generateSuggestions(sld)
  };
}

/**
 * Generates alternative suggestions based on a base SLD
 */
export function generateSuggestions(baseSld: string): string[] {
  if (!baseSld) return [];
  const clean = baseSld.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return [];

  return [
    `${clean}.is-a.dev`,
    `${clean}.js.org`,
    `${clean}.github.io`,
    `${clean}.eu.org`,
    `${clean}.duckdns.org`,
    `${clean}.vercel.app`,
    `${clean}-app.is-a.dev`,
    `${clean}-dev.github.io`
  ];
}
