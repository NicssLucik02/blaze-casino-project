import { API_CONFIG, LOGGER_CONFIG } from '@/config/constants';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    if (LOGGER_CONFIG.ENABLED) {
      console.log('API Request:', url);
    }

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
      if (LOGGER_CONFIG.ENABLED) {
        console.error('API Error:', error);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: token
        ? {
            Authorization: `${API_CONFIG.HEADERS.AUTHORIZATION_PREFIX} ${token}`,
          }
        : {},
    });
  }

  async post<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: token
        ? {
            Authorization: `${API_CONFIG.HEADERS.AUTHORIZATION_PREFIX} ${token}`,
          }
        : {},
    });
  }
}

export const apiService = new ApiService(API_CONFIG.BASE_URL);
