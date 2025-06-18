
import React, { useState } from 'react';
import { Check, Star, Gift, CreditCard, ArrowRight, BarChart3, ExternalLink, RefreshCw } from 'lucide-react';
import { CreditCard as CreditCardType, UserAnswers } from '../types/api';

interface SummaryProps {
  userAnswers: UserAnswers;
  recommendations: CreditCardType[];
  onRestart: () => void;
}

const Summary: React.FC<SummaryProps> = ({ userAnswers, recommendations, onRestart }) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCardSelect = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const calculateRewards = (card: CreditCardType) => {
    const monthlySpending = userAnswers.monthly_spending || 50000;
    const annualSpending = monthlySpending * 12;
    const rewardValue = annualSpending * (card.reward_rate / 100);
    return Math.round(rewardValue);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Summary Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          <Check className="h-4 w-4 mr-2" />
          Analysis Complete
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Recommendations</h2>
        <p className="text-lg text-gray-600">Based on your profile, here are the best credit cards for you</p>
      </div>

      {/* User Profile Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProfileStat
            icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
            label="Monthly Income"
            value={formatCurrency(userAnswers.monthly_income || 100000)}
          />
          <ProfileStat
            icon={<CreditCard className="h-5 w-5 text-green-500" />}
            label="Monthly Spending"
            value={formatCurrency(userAnswers.monthly_spending || 50000)}
          />
          <ProfileStat
            icon={<Star className="h-5 w-5 text-yellow-500" />}
            label="Primary Category"
            value={userAnswers.primary_category || 'Dining & Travel'}
          />
          <ProfileStat
            icon={<Gift className="h-5 w-5 text-purple-500" />}
            label="Reward Preference"
            value={userAnswers.reward_preference || 'Cashback'}
          />
        </div>
      </div>

      {/* Comparison Toggle */}
      {selectedCards.length > 1 && (
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showComparison ? 'Show All Cards' : `Compare Selected Cards (${selectedCards.length})`}
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div className={`grid gap-6 ${showComparison ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {recommendations
          .filter(card => !showComparison || selectedCards.includes(card.id))
          .map((card, index) => (
            <CreditCardComponent
              key={card.id}
              card={card}
              index={index}
              isSelected={selectedCards.includes(card.id)}
              onSelect={() => handleCardSelect(card.id)}
              canSelect={!selectedCards.includes(card.id) && selectedCards.length < 3}
              estimatedRewards={calculateRewards(card)}
              formatCurrency={formatCurrency}
              showComparison={showComparison}
            />
          ))}
      </div>

      {/* Restart Section */}
      <div className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Different Recommendations?</h3>
        <p className="text-gray-600 mb-6">Our AI can help you explore more options or analyze different spending scenarios.</p>
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

const ProfileStat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const CreditCardComponent: React.FC<{
  card: CreditCardType;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  canSelect: boolean;
  estimatedRewards: number;
  formatCurrency: (amount: number) => string;
  showComparison: boolean;
}> = ({ card, index, isSelected, onSelect, canSelect, estimatedRewards, formatCurrency, showComparison }) => (
  <div
    className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:border-gray-200'
    }`}
  >
    {/* Card Header */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {index === 0 && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                <Star className="h-3 w-3 mr-1" />
                Best Match
              </span>
            )}
            {index === 1 && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                Popular Choice
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{card.name}</h3>
          <p className="text-gray-600">{card.issuer}</p>
        </div>
        <button
          onClick={onSelect}
          className={`p-2 rounded-lg transition-colors ${
            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
          disabled={!canSelect && !isSelected}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>

      {/* Card Visual */}
      <div className="w-full h-32 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg mb-4 flex items-center justify-center">
        <CreditCard className="h-12 w-12 text-white" />
      </div>
    </div>

    {/* Card Details */}
    <div className="px-6 pb-6 space-y-4">
      {/* Fees */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Joining Fee</p>
          <p className="font-semibold text-gray-900">{formatCurrency(card.joining_fee)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Annual Fee</p>
          <p className="font-semibold text-gray-900">{formatCurrency(card.annual_fee)}</p>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-700">Estimated Annual Rewards</span>
          <Gift className="h-4 w-4 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-green-800">{formatCurrency(estimatedRewards)}</p>
        <p className="text-sm text-green-600">{card.reward_rate}% {card.reward_type.replace('_', ' ')}</p>
      </div>

      {/* Key Perks */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
        <div className="space-y-2">
          {card.perks.slice(0, showComparison ? card.perks.length : 3).map((perk, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation Reason */}
      {card.recommendation_reason && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Why This Card?</h4>
          <p className="text-sm text-blue-700">{card.recommendation_reason}</p>
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={() => window.open(card.apply_link, '_blank')}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>Apply Now</span>
        <ExternalLink className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default Summary;
