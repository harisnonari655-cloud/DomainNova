import { RdapResult } from '../types/domain';

export async function checkDomainAvailability(domain: string): Promise<RdapResult> {
  try {
    const res = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data: RdapResult = await res.json();
    return data;
  } catch (err: any) {
    // If backend is not reached or network error occurs, return an honest fallback result
    const checkedAt = new Date().toISOString();
    return {
      source: 'None',
      status: 'check_official_registrar',
      statusDetails: 'Live availability check service is currently offline or unreachable. Please verify directly with the official registry or registrar.',
      checkedAt,
      domainName: domain,
      officialRegistrarUrl: `https://lookup.icann.org/en/lookup?q=${encodeURIComponent(domain)}`,
      notes: [
        'Live API check was unable to reach the authoritative lookup endpoint.',
        'Never assume a domain is available without authoritative confirmation.'
      ]
    };
  }
}

export interface AiAdvisorResponse {
  success: boolean;
  answer?: string;
  error?: string;
  message?: string;
  model?: string;
  thinkingLevel?: string;
}

export async function askAiAdvisor(question: string, context?: string): Promise<AiAdvisorResponse> {
  try {
    const res = await fetch('/api/ai/advisor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, context })
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Failed to communicate with AI Advisor',
        message: data.message
      };
    }

    return {
      success: true,
      answer: data.answer,
      model: data.model,
      thinkingLevel: data.thinkingLevel
    };
  } catch (err: any) {
    return {
      success: false,
      error: 'Network connection failed',
      message: 'Could not connect to the DomainNova AI Advisor endpoint. Check network or server status.'
    };
  }
}
