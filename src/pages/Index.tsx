
import React, { useState } from 'react';
import Chat from '../components/Chat';
import Summary from '../components/Summary';
import { CreditCard, MessageSquare, Sparkles, Database, Zap } from 'lucide-react';
import { CreditCard as CreditCardType, UserAnswers } from '../types/api';

const Index = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [recommendations, setRecommendations] = useState<CreditCardType[]>([]);

  const handleRecommendationsReady = (answers: UserAnswers, cards: CreditCardType[]) => {
    setUserAnswers(answers);
    setRecommendations(cards);
    setShowSummary(true);
  };

  const handleRestart = () => {
    setShowSummary(false);
    setUserAnswers({});
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CREDCARD AI</h1>
                <p className="text-sm text-gray-600">AI-Powered Credit Card Advisor</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {showSummary && (
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showSummary ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Credit Card
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Our advanced AI analyzes your spending patterns and financial profile to recommend 
                the best credit cards from a curated database of 20+ Indian credit cards.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <Database className="h-8 w-8 text-blue-500" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">20+ Credit Cards</h3>
                    <p className="text-sm text-gray-600">Comprehensive Indian card database</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="h-8 w-8 text-green-500" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                    <p className="text-sm text-gray-600">OpenAI GPT-4 recommendations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">WhatsApp Ready</h3>
                    <p className="text-sm text-gray-600">Chat via WhatsApp or web</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="max-w-4xl mx-auto">
              <Chat onRecommendationsReady={handleRecommendationsReady} />
            </div>
          </>
        ) : (
          <Summary 
            userAnswers={userAnswers} 
            recommendations={recommendations}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 SmartCard AI. Powered by Python FastAPI + OpenAI + React.</p>
            <p className="text-sm mt-2">
              Backend: FastAPI + PostgreSQL + Twilio WhatsApp | Frontend: React + TypeScript + Tailwind CSS
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Disclaimer: Recommendations are AI-generated based on general criteria. Please verify details with card issuers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
