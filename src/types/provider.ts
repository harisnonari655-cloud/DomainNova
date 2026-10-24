export type ProviderCategory = 
  | 'developer_community'
  | 'static_hosting'
  | 'cloud_platform'
  | 'dynamic_dns'
  | 'public_suffix_registry';

export type DomainType = 
  | 'registrable_subdomain'
  | 'hosting_subdomain'
  | 'dynamic_dns_subdomain'
  | 'delegated_sld'
  | 'dns_hosting_only';

export type VerificationStatus = 
  | 'FREE VERIFIED'
  | 'CHECK OFFICIAL TERMS'
  | 'REQUIRES OPEN SOURCE'
  | 'RESTRICTED ELIGIBILITY';

export type PriceModel = 
  | '100% Free'
  | 'Freemium'
  | 'Free for Open Source'
  | 'Free Tier Included';

export type SslSupport = 
  | 'Automated Let\'s Encrypt'
  | 'Provider Managed'
  | 'DNS-01 ACME / Let\'s Encrypt'
  | 'Bring Your Own'
  | 'Platform Native SSL';

export type OwnershipModel =
  | 'Platform Hosted Subdomain (No Domain Ownership)'
  | 'Community Delegated Subdomain (DNS Control)'
  | 'Public Suffix Delegated SLD (Full Zone Delegation)'
  | 'Dynamic Hostname (IP/CNAME Control)';

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  category: ProviderCategory;
  domainType: DomainType;
  samplePattern: string;
  availableSuffixes: string[];
  priceModel: PriceModel;
  officialUrl: string;
  docsUrl: string;
  claimUrl: string;
  dnsSupport: boolean;
  dnsSupportDetails: string;
  supportedRecordTypes: string[];
  sslSupport: SslSupport;
  renewalConditions: string;
  renewalPeriodDays?: number;
  eligibility: string[];
  restrictions: string[];
  ownershipModel: OwnershipModel;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  evidence: string;
  stepByStepClaim: {
    step: number;
    title: string;
    description: string;
  }[];
  technicalPros: string[];
  technicalCons: string[];
  recommendedUseCases: string[];
  isPopular?: boolean;
}
