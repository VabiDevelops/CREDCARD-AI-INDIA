
import { useState } from 'react';
import { creditCardsData } from '../data/creditCards';
import { aiAgent } from '../services/aiAgent';

export const useChat = (onRecommendationsReady) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const sendMessage = async (content) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Process the message with AI agent
      const response = await aiAgent.processMessage(content, userAnswers, currentQuestion);
      
      // Update user answers if new data is provided
      if (response.updatedAnswers) {
        setUserAnswers(response.updatedAnswers);
      }

      // Show typing dots first
    await new Promise((resolve) => setTimeout(resolve, 800)); // artificial delay

      // Add AI response
      const aiMessage = {
        role: 'assistant',
        content: response.message,
        quickReplies: response.quickReplies
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setCurrentQuestion(response.nextQuestion);

      // If conversation is complete, generate recommendations
      if (response.isComplete) {
        const recommendations = generateRecommendations(response.updatedAnswers);
        setTimeout(() => {
          onRecommendationsReady(response.updatedAnswers, recommendations);
        }, 1000);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Let me try to help you with a different approach."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = (answers) => {
    console.log('Generating recommendations for:', answers);
    
    // Filter and rank cards based on user answers
    let scoredCards = creditCardsData.map(card => {
      let score = 0;
      let reasonParts = [];

      // Income eligibility check
      if (answers.income >= card.eligibility_criteria.min_income) {
        score += 20;
      } else {
        score -= 50; // Heavy penalty for income mismatch
      }

      // Spending category match
      if (answers.primaryCategory) {
        if (answers.primaryCategory.toLowerCase().includes('dining') && 
            card.perks.some(perk => perk.toLowerCase().includes('dining') || perk.toLowerCase().includes('restaurant'))) {
          score += 15;
          reasonParts.push('excellent dining rewards');
        }
        if (answers.primaryCategory.toLowerCase().includes('travel') && 
            card.perks.some(perk => perk.toLowerCase().includes('travel') || perk.toLowerCase().includes('lounge'))) {
          score += 15;
          reasonParts.push('great travel benefits');
        }
        if (answers.primaryCategory.toLowerCase().includes('fuel') && 
            card.perks.some(perk => perk.toLowerCase().includes('fuel') || perk.toLowerCase().includes('petrol'))) {
          score += 15;
          reasonParts.push('fuel savings');
        }
        if (answers.primaryCategory.toLowerCase().includes('grocery') && 
            card.perks.some(perk => perk.toLowerCase().includes('grocery') || perk.toLowerCase().includes('supermarket'))) {
          score += 15;
          reasonParts.push('grocery rewards');
        }
      }

      // Reward preference match
      if (answers.rewardPreference) {
        if (answers.rewardPreference.toLowerCase().includes('cashback') && card.reward_type === 'cashback') {
          score += 10;
          reasonParts.push('direct cashback rewards');
        }
        if (answers.rewardPreference.toLowerCase().includes('points') && card.reward_type === 'travel_points') {
          score += 10;
          reasonParts.push('valuable reward points');
        }
      }

      // Fee sensitivity
      if (answers.feePreference === 'low' && card.annual_fee <= 5000) {
        score += 10;
        reasonParts.push('affordable fees');
      }
      if (answers.feePreference === 'premium' && card.annual_fee > 10000) {
        score += 5;
        reasonParts.push('premium features');
      }

      // Reward rate bonus
      score += card.reward_rate * 2;

      // Generate recommendation reason
      const baseReason = `Perfect for your ${answers.primaryCategory || 'spending'} needs with ${card.reward_rate}% ${card.reward_type}.`;
      const additionalReasons = reasonParts.length > 0 ? ` Features ${reasonParts.join(', ')}.` : '';
      
      return {
        ...card,
        score,
        recommendation_reason: baseReason + additionalReasons
      };
    });

    // Filter out cards that don't meet income requirements
    scoredCards = scoredCards.filter(card => card.score > 0);

    // Sort by score and return top 5
    scoredCards.sort((a, b) => b.score - a.score);
    
    return scoredCards.slice(0, 5);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    userAnswers
  };
};
