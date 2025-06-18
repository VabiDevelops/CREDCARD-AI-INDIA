
// AI Agent for processing user messages and generating responses
export const aiAgent = {
  async processMessage(message, currentAnswers, questionIndex) {
    console.log('Processing message:', message, 'Current answers:', currentAnswers, 'Question index:', questionIndex);
    
    const questions = [
      {
        key: 'income',
        question: "Let's start! What's your monthly income? This helps me find cards you're eligible for.",
        quickReplies: ['₹50,000-₹1L', '₹1L-₹2L', '₹2L-₹5L', '₹5L+'],
        parser: (msg) => {
          const income = parseInt(msg.replace(/[₹,L]/g, '').replace('lakh', '00000').replace('L', '00000')) || 
                        (msg.includes('50') ? 75000 : 
                         msg.includes('1L-2L') ? 150000 :
                         msg.includes('2L-5L') ? 350000 :
                         msg.includes('5L+') ? 600000 : 100000);
          return { income };
        }
      },
      {
        key: 'spending',
        question: "Great! How much do you typically spend on your credit card each month?",
        quickReplies: ['₹20,000-₹40,000', '₹40,000-₹80,000', '₹80,000-₹1.5L', '₹1.5L+'],
        parser: (msg) => {
          const spending = parseInt(msg.replace(/[₹,L]/g, '').replace('lakh', '00000').replace('L', '00000')) || 
                          (msg.includes('20') ? 30000 :
                           msg.includes('40') ? 60000 :
                           msg.includes('80') ? 120000 :
                           msg.includes('1.5L') ? 200000 : 50000);
          return { spending };
        }
      },
      {
        key: 'primaryCategory',
        question: "What do you spend most on? This helps me find cards with the best rewards for your lifestyle.",
        quickReplies: ['Dining & Entertainment', 'Travel & Hotels', 'Fuel & Transportation', 'Groceries & Shopping'],
        parser: (msg) => ({ primaryCategory: msg })
      },
      {
        key: 'rewardPreference',
        question: "What type of rewards do you prefer?",
        quickReplies: ['Cashback', 'Travel Points', 'Shopping Vouchers', 'No Preference'],
        parser: (msg) => ({ rewardPreference: msg })
      },
      {
        key: 'feePreference',
        question: "How do you feel about annual fees?",
        quickReplies: ['Prefer low/no fees', 'Okay with premium fees for benefits', 'No preference'],
        parser: (msg) => ({ 
          feePreference: msg.includes('low') || msg.includes('no fees') ? 'low' : 
                        msg.includes('premium') ? 'premium' : 'none' 
        })
      },
      {
        key: 'existingCards',
        question: "Do you currently have any credit cards? This helps me avoid recommending similar ones.",
        quickReplies: ['None', '1-2 cards', '3+ cards', 'Looking to upgrade'],
        parser: (msg) => ({ existingCards: msg })
      }
    ];

    // If this is the first interaction, start with the first question
    if (questionIndex === 0 && Object.keys(currentAnswers).length === 0) {
      return {
        message: questions[0].question,
        quickReplies: questions[0].quickReplies,
        nextQuestion: 1,
        updatedAnswers: currentAnswers,
        isComplete: false
      };
    }

    // Parse the current answer
    const currentQ = questions[questionIndex - 1];
    if (currentQ && currentQ.parser) {
      const parsedAnswer = currentQ.parser(message);
      const updatedAnswers = { ...currentAnswers, ...parsedAnswer };

      // Check if we have more questions
      if (questionIndex < questions.length) {
        const nextQ = questions[questionIndex];
        return {
          message: `Got it! ${nextQ.question}`,
          quickReplies: nextQ.quickReplies,
          nextQuestion: questionIndex + 1,
          updatedAnswers,
          isComplete: false
        };
      } else {
        // All questions answered
        return {
          message: "Perfect! I have all the information I need. Let me analyze the best credit cards for your profile and spending patterns. This will just take a moment...",
          updatedAnswers,
          nextQuestion: questionIndex + 1,
          isComplete: true
        };
      }
    }

    // Fallback response
    return {
      message: "I didn't quite understand that. Could you please choose from the options provided or rephrase your answer?",
      quickReplies: currentQ ? currentQ.quickReplies : [],
      nextQuestion: questionIndex,
      updatedAnswers: currentAnswers,
      isComplete: false
    };
  }
};
