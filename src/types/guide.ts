export interface Guide {
  id: string;
  title: string;
  description: string;
  category: 'dns_basics' | 'hosting' | 'ssl' | 'troubleshooting' | 'open_source';
  readingTimeMinutes: number;
  lastUpdated: string;
  sections: {
    heading: string;
    content: string;
    codeExample?: {
      language: string;
      code: string;
      caption?: string;
    };
    tip?: string;
    warning?: string;
  }[];
  relatedProviders?: string[];
}
