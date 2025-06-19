# 🧠 Credit Card Recommendation AI

A minimal AI-powered frontend application that helps users get **personalized credit card recommendations** by answering a few simple questions. Built using React and OpenAI.

<div align="center">
  <img src="./assets/demo.gif" alt="Demo GIF" width="700"/>
</div>

---

## 🔗 Live Demo

👉 [https://credcard-ai.onrender.com](https://credcard-ai.onrender.com)

---

## 📽 Demo Video

▶️ [Watch Demo](https://link-to-your-video.com)  
*(Upload to Loom, YouTube unlisted, or Google Drive — make sure it's public)*

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

**Prompt Template:**

```text
You are a credit card advisor. Based on the following details:
- Income: {{income}}
- Spending Habits: {{spending}}
- Credit Score: {{credit_score}}

Recommend one card from the following: [Card A, Card B, Card C].
Provide a short explanation for your recommendation.
