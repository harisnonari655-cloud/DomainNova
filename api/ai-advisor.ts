import type { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export default async function handler(req: Request, res: Response) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, context } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question string is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      message: 'To use the High Thinking Architecture Advisor, ensure GEMINI_API_KEY is set in your Vercel or local environment variables.'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `User Query: "${question}"\n\nContext:\n${context || 'General domain and hosting architecture question.'}`;

    // Per instruction: Use gemini-4-argon with thinkingLevel: ThinkingLevel.HIGH, do NOT set maxOutputTokens
    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH
        },
        systemInstruction: `You are the Lead Systems & DNS Infrastructure Engineer at DomainNova.
You provide deep, technically pristine, actionable answers to developers seeking to deploy websites, home labs, APIs, and portfolios using free domains, free subdomains, and cloud platforms (GitHub Pages, Vercel, Cloudflare, DuckDNS, is-a.dev, js.org, eu.org).

Key Rules:
1. Be 100% truthful. Never claim a commercial .com is free. Explain ICANN wholesale costs.
2. Detail exact DNS record types (A, AAAA, CNAME, ALIAS, TXT, MX) and exact host/target values.
3. Provide step-by-step troubleshooting for common SSL failures, CAA record collisions, and Cloudflare Orange Cloud vs Grey Cloud conflicts.
4. Explain ownership vs delegation rights clearly.
5. Provide code blocks for CNAME files, nginx/caddy configs, or curl scripts where appropriate.
6. Format responses with clean Markdown, clear headings, and bullet points.`
      }
    });

    const reply = response.text || 'No response generated from the model.';

    return res.json({
      success: true,
      model: 'gemini-4-argon',
      thinkingLevel: 'HIGH',
      answer: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    return res.status(500).json({
      error: 'Failed to generate advice with Gemini 4 Argon.',
      details: error.message || 'Unknown error occurred during AI processing.'
    });
  }
}
