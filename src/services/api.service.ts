import { API_CONFIG, LOGGER_CONFIG } from '@/config/constants';
import { tokenStorage } from './token.service';

class ApiService {
  private readonly baseURL: string;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private logError(message: string, error: unknown): void {
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

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(
      `${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      tokenStorage.clearAll();
      window.location.href = '/login';
      throw new Error('Refresh token expired');
    }

    const data = await response.json();

    tokenStorage.setAccessToken(data.accessToken);
    tokenStorage.setRefreshToken(data.refreshToken);

    return data.accessToken;
  }

  private onAccessTokenRefreshed(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private notifySubscribers(token: string): void {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
    accessToken?: string
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
        ...this.getAuthHeaders(accessToken),
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 401) {
        console.warn('🔑 Access token expired, attempting refresh...');

        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.onAccessTokenRefreshed(newToken => {
              this.request<T>(endpoint, options, newToken)
                .then(resolve)
                .catch(reject);
            });
          });
        }

        this.isRefreshing = true;

        try {
          const newAccessToken = await this.refreshAccessToken();
          this.isRefreshing = false;

          this.notifySubscribers(newAccessToken);

          return this.request<T>(endpoint, options, newAccessToken);
        } catch (refreshError) {
          this.isRefreshing = false;
          this.logError('Failed to refresh token:', refreshError);
          throw new Error('Session expired. Please login again.');
        }
      }

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

  public async get<T>(endpoint: string, accessToken?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, accessToken);
  }

  public async post<T>(
    endpoint: string,
    body?: unknown,
    accessToken?: string
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
      },
      accessToken
    );
  }

  public async patch<T>(
    endpoint: string,
    body: unknown,
    accessToken?: string
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
      accessToken
    );
  }

  public async put<T>(
    endpoint: string,
    body: unknown,
    accessToken?: string
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      accessToken
    );
  }

  public async delete<T>(endpoint: string, accessToken?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, accessToken);
  }
}

export const apiService = new ApiService(API_CONFIG.BASE_URL);
