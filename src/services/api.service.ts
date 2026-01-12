import { API_CONFIG, LOGGER_CONFIG } from '@/config/constants';

class ApiService {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private log(message: string, data?: any): void {
    if (LOGGER_CONFIG.ENABLED) {
      console.log(message, data || '');
    }
  }

  private logError(message: string, error: any): void {
    if (LOGGER_CONFIG.ENABLED) {
      console.error(message, error);
    }
  }

  private getAuthHeaders(token?: string): HeadersInit {
    if (!token) return {};

    return {
      Authorization: `${API_CONFIG.HEADERS.AUTHORIZATION_PREFIX} ${token}`,
    };
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    this.log('API Request:', url);

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          error.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      this.logError('API Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });
  }

  async post<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.getAuthHeaders(token),
    });
  }

  async put<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.getAuthHeaders(token),
    });
  }

  async patch<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.getAuthHeaders(token),
    });
  }

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    });
  }
}

export const apiService = new ApiService(API_CONFIG.BASE_URL);
