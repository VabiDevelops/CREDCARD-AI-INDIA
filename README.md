# 🧠 Credit Card Recommendation AI

A minimal AI-powered frontend application that helps users get **personalized credit card recommendations** by answering a few simple questions. Built using React and OpenAI.

---

## 🔗 Live Demo

👉 [https://credcard-ai-india.onrender.com](https://credcard-ai-india.onrender.com)

---

## 📽 Demo Video

▶️ [Watch Demo](https://link-to-your-video.com)  

---

## 💡 Features

- Clean and intuitive React interface
- Prompt-based recommendations using OpenAI
- Real-time credit card suggestion based on:
  - Income
  - Spending habits
  - Credit score
- Fully responsive design

---

## 🧠 Agent Flow & Prompt Design

**Agent Flow:**

1. User inputs details (income, spending habits, credit score).
2. React frontend sends this info to the AI agent.
3. LangChain or direct OpenAI API processes the prompt.
4. Agent returns a recommended credit card and rationale.
5. UI displays result in a styled card format.

**Prompt Used:**

```text
You are a credit card advisor. Based on the following details:
- Income: {{income}}
- Spending Habits: {{spending}}
- Credit Score: {{credit_score}}

Recommend one card from the following: [Card A, Card B, Card C].
Provide a short explanation for your recommendation.
```

## ⚙️ Local Setup Instructions

Clone the repository and run it locally:
```
git clone https://github.com/VabiDevelops/CREDCARD-AI-INDIA.git
cd CREDCARD-AI-INDIA
npm install
```

Set your OpenAI API key:
```
echo "VITE_OPENAI_API_KEY=your-api-key-here" > .env
```
Run the development server:
```
npm run dev
```

Build for production:
```
npm run build
```
