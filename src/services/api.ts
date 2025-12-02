const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const HMAC_SECRET = import.meta.env.VITE_HMAC_SECRET || '';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  message?: string;
}

async function generateHmacSignature(payload: string, timestamp: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(timestamp + payload);
  const key = encoder.encode(HMAC_SECRET);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const contactService = {
  async sendContact(data: ContactFormData): Promise<ApiResponse<unknown>> {
    const timestamp = Date.now().toString();
    const payload = JSON.stringify(data);
    const signature = await generateHmacSignature(payload, timestamp);

    const response = await fetch(`${API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-HMAC-Signature': signature,
        'X-HMAC-Timestamp': timestamp,
      },
      body: payload,
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },
};
