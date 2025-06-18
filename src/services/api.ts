
import { ChatResponse, CreditCard, ApiError } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private sessionId: string | null = null;

  constructor() {
    this.sessionId = localStorage.getItem('chat_session_id');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.sessionId && { 'X-Session-ID': this.sessionId }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await this.request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        session_id: this.sessionId,
      }),
    });

    // Store session ID for subsequent requests
    if (response.session_id && response.session_id !== this.sessionId) {
      this.sessionId = response.session_id;
      localStorage.setItem('chat_session_id', this.sessionId);
    }

    return response;
  }

  async getRecommendations(): Promise<CreditCard[]> {
    return this.request<CreditCard[]>('/api/recommendations');
  }

  async restartSession(): Promise<void> {
    await this.request('/api/session/restart', {
      method: 'POST',
    });
    
    this.sessionId = null;
    localStorage.removeItem('chat_session_id');
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request('/api/health');
  }
}

export const apiService = new ApiService();
