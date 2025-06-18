
export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  image_url: string;
  joining_fee: number;
  annual_fee: number;
  reward_type: 'cashback' | 'travel_points' | 'vouchers';
  reward_rate: number;
  eligibility_criteria: {
    min_income: number;
    min_credit_score: number;
  };
  perks: string[];
  apply_link: string;
  recommendation_reason?: string;
  score?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quick_replies?: string[];
}

export interface UserAnswers {
  monthly_income?: number;
  monthly_spending?: number;
  primary_category?: string;
  reward_preference?: string;
  fee_preference?: string;
  existing_cards?: string[];
  credit_score?: number;
}

export interface ChatResponse {
  message: string;
  quick_replies?: string[];
  is_complete: boolean;
  user_answers?: UserAnswers;
  recommendations?: CreditCard[];
  session_id: string;
}

export interface ApiError {
  detail: string;
  error_code?: string;
}
