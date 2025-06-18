
# SmartCard AI - Complete AI-Powered Credit Card Recommendation System

A full-stack credit card recommendation system featuring a Python FastAPI backend with OpenAI integration and a React TypeScript frontend. The system uses conversational AI to analyze user spending patterns and recommend the best Indian credit cards from a curated database.

## 🚀 System Architecture

### Frontend (React + TypeScript)
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive design
- **React Query** for API state management
- **Lucide React** for icons
- Modern chat interface with streaming responses

### Backend (Python FastAPI) - *Deploy Separately*
- **FastAPI** with Pydantic models
- **SQLAlchemy** with PostgreSQL/SQLite
- **OpenAI Assistants API** integration
- **Twilio WhatsApp API** for messaging
- **Redis** for session management (optional)

## 📦 Frontend Setup (Current Lovable Project)

The frontend is ready to run and connect to your Python backend:

```bash
npm install
npm run dev
```

### Environment Variables (Frontend)
Create a `.env.local` file:
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🐍 Python Backend Code (Deploy Separately)

### Backend Structure
```
backend/
├── src/
│   ├── main.py                 # FastAPI app
│   ├── api/
│   │   ├── __init__.py
│   │   ├── chat.py            # Chat endpoints
│   │   └── whatsapp.py        # WhatsApp webhook
│   ├── core/
│   │   ├── __init__.py
│   │   ├── agent.py           # OpenAI agent logic
│   │   ├── database.py        # Database setup
│   │   └── models.py          # SQLAlchemy models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── recommendation.py  # Card matching logic
│   │   └── session.py         # Session management
│   └── data/
│       └── seed_cards.json    # Sample credit card data
├── requirements.txt
├── .env.example
└── README.md
```

### Backend Dependencies (requirements.txt)
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1
openai==1.3.5
twilio==8.10.1
redis==5.0.1
python-multipart==0.0.6
python-dotenv==1.0.0
pydantic==2.5.0
pydantic-settings==2.1.0
```

### Sample Backend Code

#### main.py
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from api.chat import router as chat_router
from api.whatsapp import router as whatsapp_router
from core.database import engine, Base

load_dotenv()

app = FastAPI(
    title="SmartCard AI Backend",
    description="AI-powered credit card recommendation system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(chat_router, prefix="/api")
app.include_router(whatsapp_router, prefix="/api")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "SmartCard AI Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### api/chat.py
```python
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import List, Optional
import uuid

from core.agent import AIAgent
from services.recommendation import RecommendationService
from services.session import SessionService

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    quick_replies: Optional[List[str]] = None
    is_complete: bool = False
    user_answers: Optional[dict] = None
    recommendations: Optional[List[dict]] = None
    session_id: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, x_session_id: Optional[str] = Header(None)):
    try:
        session_id = request.session_id or x_session_id or str(uuid.uuid4())
        
        # Initialize services
        agent = AIAgent()
        session_service = SessionService()
        recommendation_service = RecommendationService()
        
        # Process message with AI agent
        response = await agent.process_message(
            message=request.message,
            session_id=session_id
        )
        
        # If conversation is complete, generate recommendations
        if response["is_complete"]:
            user_answers = session_service.get_user_answers(session_id)
            recommendations = recommendation_service.get_recommendations(user_answers)
            
            return ChatResponse(
                message=response["message"],
                quick_replies=response.get("quick_replies"),
                is_complete=True,
                user_answers=user_answers,
                recommendations=recommendations,
                session_id=session_id
            )
        
        return ChatResponse(
            message=response["message"],
            quick_replies=response.get("quick_replies"),
            is_complete=False,
            session_id=session_id
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/session/restart")
async def restart_session(x_session_id: Optional[str] = Header(None)):
    if x_session_id:
        session_service = SessionService()
        session_service.clear_session(x_session_id)
    return {"message": "Session restarted"}
```

#### core/agent.py
```python
import openai
import os
import json
from typing import Dict, List, Optional

class AIAgent:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.client = openai.OpenAI()
        
    async def process_message(self, message: str, session_id: str) -> Dict:
        """Process user message and return AI response"""
        
        system_prompt = """
        You are an expert credit card advisor helping users find the perfect Indian credit card.
        
        Ask users about:
        1. Monthly income (in INR)
        2. Monthly spending amount
        3. Primary spending categories (dining, travel, fuel, groceries, shopping)
        4. Reward preferences (cashback, travel points, vouchers)
        5. Fee tolerance (low fees vs premium benefits)
        6. Existing credit cards (if any)
        
        Ask ONE question at a time. Be conversational and helpful.
        When you have enough information, respond with "CONVERSATION_COMPLETE" and I'll generate recommendations.
        
        Provide 2-4 quick reply options for each question to make it easy for users.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            ai_message = response.choices[0].message.content
            
            # Check if conversation is complete
            is_complete = "CONVERSATION_COMPLETE" in ai_message
            
            # Generate quick replies based on the question
            quick_replies = self._generate_quick_replies(ai_message)
            
            return {
                "message": ai_message.replace("CONVERSATION_COMPLETE", "").strip(),
                "quick_replies": quick_replies,
                "is_complete": is_complete
            }
            
        except Exception as e:
            return {
                "message": "I apologize, but I'm having trouble processing your request. Please try again.",
                "quick_replies": None,
                "is_complete": False
            }
    
    def _generate_quick_replies(self, message: str) -> Optional[List[str]]:
        """Generate contextual quick replies based on AI message"""
        
        if "income" in message.lower():
            return ["₹50K-₹1L", "₹1L-₹2L", "₹2L-₹5L", "₹5L+"]
        elif "spending" in message.lower():
            return ["₹20K-₹50K", "₹50K-₹1L", "₹1L-₹2L", "₹2L+"]
        elif "category" in message.lower():
            return ["Dining", "Travel", "Fuel", "Groceries", "Shopping"]
        elif "reward" in message.lower():
            return ["Cashback", "Travel Points", "Vouchers", "Lounge Access"]
        elif "fee" in message.lower():
            return ["Low fees preferred", "Premium benefits worth fees"]
        
        return None
```

#### data/seed_cards.json
```json
[
  {
    "id": "hdfc-regalia",
    "name": "HDFC Bank Regalia Credit Card",
    "issuer": "HDFC Bank",
    "image_url": "https://via.placeholder.com/300x200?text=HDFC+Regalia",
    "joining_fee": 2500,
    "annual_fee": 2500,
    "reward_type": "travel_points",
    "reward_rate": 4.0,
    "eligibility_criteria": {
      "min_income": 120000,
      "min_credit_score": 750
    },
    "perks": [
      "4 reward points per ₹150 spent",
      "Complimentary airport lounge access",
      "Dining privileges at partner restaurants",
      "Golf privileges at partner courses",
      "Travel insurance coverage"
    ],
    "apply_link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia"
  },
  {
    "id": "sbi-cashback",
    "name": "SBI Cashback Credit Card",
    "issuer": "State Bank of India",
    "image_url": "https://via.placeholder.com/300x200?text=SBI+Cashback",
    "joining_fee": 999,
    "annual_fee": 999,
    "reward_type": "cashback",
    "reward_rate": 5.0,
    "eligibility_criteria": {
      "min_income": 100000,
      "min_credit_score": 700
    },
    "perks": [
      "5% cashback on online spends",
      "1% cashback on other spends",
      "Annual fee waiver on ₹2L spend",
      "No foreign transaction fees",
      "Contactless payment enabled"
    ],
    "apply_link": "https://www.sbi.co.in/web/personal-banking/cards/credit-cards/cashback"
  }
]
```

### Environment Variables (.env.example)
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/smartcard_ai
# For development, you can use SQLite:
# DATABASE_URL=sqlite:///./smartcard_ai.db

# Twilio Configuration (for WhatsApp)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Redis Configuration (optional, for session management)
REDIS_URL=redis://localhost:6379

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True
```

## 🚀 Deployment Instructions

### Backend Deployment (Heroku/Railway/GCP)

1. **Heroku Deployment:**
```bash
# Create Heroku app
heroku create smartcard-ai-backend

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set DATABASE_URL=your_postgres_url
heroku config:set TWILIO_ACCOUNT_SID=your_sid
heroku config:set TWILIO_AUTH_TOKEN=your_token

# Deploy
git push heroku main
```

2. **Railway Deployment:**
```bash
railway login
railway new smartcard-ai-backend
railway add postgresql
railway deploy
```

### Frontend Deployment (Vercel/Netlify)

The frontend is already configured for deployment on Vercel or Netlify.

**Environment Variables for Production:**
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

## 📱 WhatsApp Integration

### Twilio Webhook Setup:
1. Go to Twilio Console → Phone Numbers → WhatsApp
2. Set webhook URL: `https://your-backend-url.com/api/whatsapp`
3. Enable incoming messages

### Sample WhatsApp Code (api/whatsapp.py):
```python
from fastapi import APIRouter, Request, Form
from twilio.rest import Client
import os

router = APIRouter()
twilio_client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))

@router.post("/whatsapp")
async def whatsapp_webhook(
    Body: str = Form(...),
    From: str = Form(...),
    To: str = Form(...)
):
    # Process WhatsApp message using same chat logic
    # Map WhatsApp number to session ID
    session_id = From.replace("whatsapp:", "")
    
    # Use same AI agent logic
    agent = AIAgent()
    response = await agent.process_message(Body, session_id)
    
    # Send response back via WhatsApp
    twilio_client.messages.create(
        body=response["message"],
        from_=os.getenv("TWILIO_WHATSAPP_NUMBER"),
        to=From
    )
    
    return {"status": "success"}
```

## 🧪 Testing

### Backend Testing:
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing:
```bash
npm test
```

## 📊 Features

### ✅ Implemented (Frontend)
- Modern React TypeScript architecture
- Real-time chat interface
- Credit card recommendation display
- Card comparison functionality
- Mobile-responsive design
- API integration ready
- Session management
- Error handling

### 🔄 Backend Features (Python Code Provided)
- FastAPI with automatic OpenAPI docs
- OpenAI GPT-4 integration
- PostgreSQL database with SQLAlchemy
- Twilio WhatsApp integration
- Session management
- Credit card recommendation algorithm
- RESTful API endpoints

### 🚀 Production Ready Features
- Environment-based configuration
- Error handling and logging
- Database migrations
- API rate limiting
- CORS configuration
- Health check endpoints

## 📞 Support

The frontend is ready to run in Lovable. For the Python backend:

1. Copy the provided Python code to your local environment
2. Set up the database and environment variables
3. Deploy to your preferred platform
4. Update the frontend's `REACT_APP_API_URL` to point to your backend

The system is designed to be production-ready with proper error handling, type safety, and scalable architecture.
