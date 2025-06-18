
import { useState, useCallback } from 'react';
import { ChatMessage, ChatResponse, CreditCard, UserAnswers } from '../types/api';
import { apiService } from '../services/api';

export const useChat = (onRecommendationsReady?: (answers: UserAnswers, cards: CreditCard[]) => void) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response: ChatResponse = await apiService.sendMessage(content);
      
      // Add AI response
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        quick_replies: response.quick_replies,
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Update user answers if provided
      if (response.user_answers) {
        setUserAnswers(response.user_answers);
      }

      // If conversation is complete, trigger recommendations
      if (response.is_complete && response.recommendations && response.user_answers) {
        setTimeout(() => {
          onRecommendationsReady?.(response.user_answers!, response.recommendations!);
        }, 1000);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      // Add error message to chat
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [onRecommendationsReady]);

  const restartChat = useCallback(async () => {
    try {
      await apiService.restartSession();
      setMessages([]);
      setUserAnswers({});
      setError(null);
    } catch (err) {
      console.error('Failed to restart session:', err);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    userAnswers,
    restartChat,
  };
};
