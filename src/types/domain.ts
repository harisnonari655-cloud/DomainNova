export interface DomainValidationResult {
  isValid: boolean;
  domain: string;
  sld: string;
  tld: string;
  isSubdomain: boolean;
  subdomainPart?: string;
  unicodeDomain?: string;
  isIdn: boolean;
  error?: string;
  suggestions?: string[];
}

export type AvailabilityStatus =
  | 'likely_available'
  | 'registered'
  | 'reserved_or_restricted'
  | 'unsupported_extension'
  | 'check_official_registrar'
  | 'error';

export interface RdapEntity {
  handle?: string;
  roles?: string[];
}

export interface RdapResult {
  source: 'RDAP (ICANN / IANA / rdap.org)' | 'DNS Resolution Check' | 'Registrar Gateway' | 'None';
  status: AvailabilityStatus;
  statusDetails: string;
  checkedAt: string;
  domainName: string;
  registrar?: string;
  creationDate?: string;
  expirationDate?: string;
  updatedDate?: string;
  statusCodes?: string[];
  hasActiveDnsRecords?: boolean;
  dnsRecords?: {
    type: string;
    data: string;
    ttl?: number;
  }[];
  officialRegistrarUrl?: string;
  notes: string[];
}

export interface RecentSearchItem {
  id: string;
  query: string;
  timestamp: number;
  status?: AvailabilityStatus;
}
