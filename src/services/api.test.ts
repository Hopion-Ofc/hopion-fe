import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { contactService, type ContactFormData } from './api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockCryptoSubtle = {
  importKey: vi.fn(),
  sign: vi.fn(),
};

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: mockCryptoSubtle,
  },
  writable: true,
});

describe('contactService', () => {
  const mockContactData: ContactFormData = {
    name: 'João Silva',
    email: 'joao@example.com',
    subject: 'Nova ideia de software',
    message: 'Gostaria de desenvolver um aplicativo',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockCryptoSubtle.importKey.mockResolvedValue({} as CryptoKey);
    
    const mockSignature = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    mockCryptoSubtle.sign.mockResolvedValue(mockSignature.buffer);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('sendContact', () => {
    it('deve enviar dados de contato com sucesso', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '123',
          ...mockContactData,
          createdAt: new Date().toISOString(),
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await contactService.sendContact(mockContactData);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('deve incluir headers HMAC na requisição', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      const fetchCall = mockFetch.mock.calls[0];
      const headers = fetchCall[1].headers;

      expect(headers['Content-Type']).toBe('application/json');
      expect(headers['X-HMAC-Signature']).toBeDefined();
      expect(headers['X-HMAC-Timestamp']).toBeDefined();
    });

    it('deve enviar o payload correto no body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      const fetchCall = mockFetch.mock.calls[0];
      const body = JSON.parse(fetchCall[1].body);

      expect(body).toEqual(mockContactData);
    });

    it('deve fazer requisição para o endpoint correto', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      const fetchCall = mockFetch.mock.calls[0];
      const url = fetchCall[0];

      expect(url).toContain('/emails');
    });

    it('deve usar método POST', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      const fetchCall = mockFetch.mock.calls[0];
      const method = fetchCall[1].method;

      expect(method).toBe('POST');
    });

    it('deve lançar erro quando a resposta não for ok', async () => {
      const mockError = {
        success: false,
        errors: [
          {
            field: 'email',
            message: 'Email inválido',
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      });

      await expect(contactService.sendContact(mockContactData)).rejects.toEqual(
        mockError
      );
    });

    it('deve lançar erro com múltiplos erros de validação', async () => {
      const mockError = {
        success: false,
        errors: [
          {
            field: 'name',
            message: 'Nome é obrigatório',
          },
          {
            field: 'email',
            message: 'Email inválido',
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      });

      await expect(contactService.sendContact(mockContactData)).rejects.toEqual(
        mockError
      );
    });

    it('deve gerar timestamp único para cada requisição', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);
      const firstTimestamp = mockFetch.mock.calls[0][1].headers['X-HMAC-Timestamp'];

      await new Promise(resolve => setTimeout(resolve, 10));

      await contactService.sendContact(mockContactData);
      const secondTimestamp = mockFetch.mock.calls[1][1].headers['X-HMAC-Timestamp'];

      expect(firstTimestamp).not.toBe(secondTimestamp);
    });

    it('deve chamar crypto.subtle.importKey para gerar chave HMAC', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      expect(mockCryptoSubtle.importKey).toHaveBeenCalled();
      const importKeyCall = mockCryptoSubtle.importKey.mock.calls[0];
      
      expect(importKeyCall[0]).toBe('raw');
      expect(importKeyCall[2]).toEqual({ name: 'HMAC', hash: 'SHA-256' });
      expect(importKeyCall[3]).toBe(false);
      expect(importKeyCall[4]).toEqual(['sign']);
    });

    it('deve chamar crypto.subtle.sign para assinar a requisição', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await contactService.sendContact(mockContactData);

      expect(mockCryptoSubtle.sign).toHaveBeenCalled();
      const signCall = mockCryptoSubtle.sign.mock.calls[0];
      
      expect(signCall[0]).toBe('HMAC');
      expect(signCall[1]).toBeDefined();
      expect(signCall[2]).toBeDefined();
    });

    it('deve lidar com erro de rede', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(contactService.sendContact(mockContactData)).rejects.toThrow(
        'Network error'
      );
    });

    it('deve retornar dados completos na resposta de sucesso', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 'abc-123',
          name: mockContactData.name,
          email: mockContactData.email,
          subject: mockContactData.subject,
          message: mockContactData.message,
          createdAt: '2024-12-02T10:30:00Z',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await contactService.sendContact(mockContactData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('createdAt');
    });
  });
});
