
export const creditCardsData = [
  {
    id: "hdfc-regalia",
    name: "HDFC Bank Regalia Credit Card",
    issuer: "HDFC Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 2500,
    annual_fee: 2500,
    reward_type: "cashback",
    reward_rate: 1.3,
    eligibility_criteria: {
      min_income: 60000,
      min_credit_score: 750
    },
    perks: [
      "4 reward points per ₹150 spent on dining, travel & entertainment",
      "2 reward points per ₹150 spent on all other categories",
      "Complimentary airport lounge access",
      "Low foreign currency markup of 2%",
      "Annual fee waiver on spending ₹3 lakh"
    ],
    apply_link: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia"
  },
  {
    id: "sbi-cashback",
    name: "SBI Cashback Credit Card",
    issuer: "State Bank of India",
    image_url: "/api/placeholder/300/180",
    joining_fee: 999,
    annual_fee: 999,
    reward_type: "cashback",
    reward_rate: 5.0,
    eligibility_criteria: {
      min_income: 25000,
      min_credit_score: 700
    },
    perks: [
      "5% cashback on online spends",
      "1% cashback on offline spends",
      "No cashback capping",
      "Annual fee waiver on spending ₹2 lakh",
      "Fuel surcharge waiver"
    ],
    apply_link: "https://www.sbi.co.in/web/personal-banking/cards/credit-cards/cashback-credit-card"
  },
  {
    id: "axis-ace",
    name: "Axis Bank ACE Credit Card",
    issuer: "Axis Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 499,
    annual_fee: 499,
    reward_type: "cashback",
    reward_rate: 1.5,
    eligibility_criteria: {
      min_income: 25000,
      min_credit_score: 650
    },
    perks: [
      "5% cashback on Bill Payments & Mobile Recharges",
      "4% cashback on Google Pay, Paytm and other UPI",
      "2% cashback on Swiggy, Zomato & other food delivery apps",
      "1.5% cashback on all other spends",
      "No annual fee for lifetime"
    ],
    apply_link: "https://www.axisbank.com/retail/cards/credit-card/ace-credit-card"
  },
  {
    id: "icici-amazon-pay",
    name: "Amazon Pay ICICI Credit Card",
    issuer: "ICICI Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 0,
    annual_fee: 0,
    reward_type: "cashback",
    reward_rate: 2.0,
    eligibility_criteria: {
      min_income: 25000,
      min_credit_score: 650
    },
    perks: [
      "5% back on Amazon.in for Prime members",
      "3% back on Amazon.in for non-Prime members",
      "2% back on Amazon Pay partner merchants",
      "1% back on other purchases",
      "No joining fee and no annual fee"
    ],
    apply_link: "https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card"
  },
  {
    id: "hdfc-millennia",
    name: "HDFC Millennia Credit Card",
    issuer: "HDFC Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 1000,
    annual_fee: 1000,
    reward_type: "cashback",
    reward_rate: 2.5,
    eligibility_criteria: {
      min_income: 25000,
      min_credit_score: 700
    },
    perks: [
      "5% cashback on online spends up to ₹1000/month",
      "2.5% cashback on all other spends",
      "1% cashback on offline spends",
      "Annual fee waiver on spending ₹1 lakh",
      "Low foreign currency markup of 2%"
    ],
    apply_link: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card"
  },
  {
    id: "amex-gold",
    name: "American Express Gold Card",
    issuer: "American Express",
    image_url: "/api/placeholder/300/180",
    joining_fee: 4500,
    annual_fee: 4500,
    reward_type: "travel_points",
    reward_rate: 1.8,
    eligibility_criteria: {
      min_income: 60000,
      min_credit_score: 750
    },
    perks: [
      "4X rewards on dining, 3X on travel",
      "18,000 bonus points on joining",
      "Taj Epicure Plus membership",
      "Airport lounge access",
      "Travel insurance coverage"
    ],
    apply_link: "https://www.americanexpress.com/in/credit-cards/gold-card"
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Credit Card",
    issuer: "Citibank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 1000,
    annual_fee: 1000,
    reward_type: "travel_points",
    reward_rate: 1.6,
    eligibility_criteria: {
      min_income: 30000,
      min_credit_score: 700
    },
    perks: [
      "10X reward points on dining and entertainment",
      "2X reward points on grocery and utility bills",
      "1X reward point on all other spends",
      "No preset spending limit",
      "Annual fee reversal on spending ₹30,000"
    ],
    apply_link: "https://www.online.citibank.co.in/products-services/credit-cards/citi-rewards-credit-card"
  },
  {
    id: "kotak-white",
    name: "Kotak White Credit Card",
    issuer: "Kotak Mahindra Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 999,
    annual_fee: 999,
    reward_type: "cashback",
    reward_rate: 1.5,
    eligibility_criteria: {
      min_income: 25000,
      min_credit_score: 650
    },
    perks: [
      "5% cashback on Bill Payments",
      "4% cashback on Zomato and Swiggy",
      "2% cashback on online spends",
      "1% cashback on offline spends",
      "Annual fee waiver on spending ₹30,000"
    ],
    apply_link: "https://www.kotak.com/en/personal-banking/cards/credit-cards/kotak-white-credit-card.html"
  },
  {
    id: "yes-first-exclusive",
    name: "YES First Exclusive Credit Card",
    issuer: "YES Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 2499,
    annual_fee: 2499,
    reward_type: "travel_points",
    reward_rate: 1.8,
    eligibility_criteria: {
      min_income: 50000,
      min_credit_score: 720
    },
    perks: [
      "6 reward points per ₹200 on dining and travel",
      "3 reward points per ₹200 on all other spends",
      "Complimentary airport lounge access",
      "Annual fee waiver on spending ₹2 lakh",
      "Movie ticket offers"
    ],
    apply_link: "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/yes-first-exclusive-credit-card"
  },
  {
    id: "indusind-legend",
    name: "IndusInd Bank Legend Credit Card",
    issuer: "IndusInd Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 3000,
    annual_fee: 3000,
    reward_type: "travel_points",
    reward_rate: 2.0,
    eligibility_criteria: {
      min_income: 75000,
      min_credit_score: 750
    },
    perks: [
      "5 reward points per ₹150 on travel and dining",
      "2 reward points per ₹150 on all other spends",
      "Airport lounge access",
      "Golf privileges",
      "Concierge services"
    ],
    apply_link: "https://www.indusind.com/in/en/personal/cards/credit-card/legend.html"
  },
  {
    id: "sbi-prime",
    name: "SBI Card PRIME",
    issuer: "SBI Card",
    image_url: "/api/placeholder/300/180",
    joining_fee: 2999,
    annual_fee: 2999,
    reward_type: "travel_points",
    reward_rate: 1.7,
    eligibility_criteria: {
      min_income: 50000,
      min_credit_score: 720
    },
    perks: [
      "5X reward points on dining, grocery & departmental stores",
      "2X reward points on all other spends",
      "Milestone benefits",
      "Airport lounge access",
      "Annual fee waiver on spending ₹1.5 lakh"
    ],
    apply_link: "https://www.sbicard.com/en/personal/credit-cards/super-premium/sbi-card-prime.page"
  },
  {
    id: "axis-magnus",
    name: "Axis Bank Magnus Credit Card",
    issuer: "Axis Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 12500,
    annual_fee: 12500,
    reward_type: "travel_points",
    reward_rate: 2.4,
    eligibility_criteria: {
      min_income: 150000,
      min_credit_score: 780
    },
    perks: [
      "12 EDGE Miles per ₹200 on travel edge partners",
      "6 EDGE Miles per ₹200 on other spends",
      "25,000 bonus miles on achieving annual milestone",
      "Unlimited airport lounge access",
      "Golf privileges and concierge services"
    ],
    apply_link: "https://www.axisbank.com/retail/cards/credit-card/magnus-credit-card"
  },
  {
    id: "hdfc-infinia",
    name: "HDFC Bank Infinia Credit Card",
    issuer: "HDFC Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 12500,
    annual_fee: 12500,
    reward_type: "travel_points",
    reward_rate: 3.3,
    eligibility_criteria: {
      min_income: 200000,
      min_credit_score: 800
    },
    perks: [
      "5 reward points per ₹150 on all spends",
      "10 reward points per ₹150 on smartbuy",
      "Unlimited airport lounge access worldwide",
      "Golf privileges",
      "Priority Pass membership"
    ],
    apply_link: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card"
  },
  {
    id: "icici-sapphiro",
    name: "ICICI Bank Sapphiro Credit Card",
    issuer: "ICICI Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 3500,
    annual_fee: 3500,
    reward_type: "travel_points",
    reward_rate: 2.0,
    eligibility_criteria: {
      min_income: 60000,
      min_credit_score: 750
    },
    perks: [
      "4 reward points per ₹100 on dining and international spends",
      "2 reward points per ₹100 on all other spends",
      "Airport lounge access",
      "Golf privileges",
      "Annual fee waiver on spending ₹2 lakh"
    ],
    apply_link: "https://www.icicibank.com/personal-banking/cards/credit-card/sapphiro-credit-card"
  },
  {
    id: "standard-chartered-ultimate",
    name: "Standard Chartered Ultimate Credit Card",
    issuer: "Standard Chartered Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 5000,
    annual_fee: 5000,
    reward_type: "cashback",
    reward_rate: 3.3,
    eligibility_criteria: {
      min_income: 100000,
      min_credit_score: 750
    },
    perks: [
      "5% cashback on dining, grocery and departmental stores",
      "1.5% cashback on all other spends",
      "Unlimited domestic airport lounge access",
      "Exclusive dining privileges",
      "Annual fee waiver on spending ₹2 lakh"
    ],
    apply_link: "https://www.sc.com/in/credit-cards/ultimate-credit-card/"
  },
  {
    id: "amex-platinum-travel",
    name: "American Express Platinum Travel Credit Card",
    issuer: "American Express",
    image_url: "/api/placeholder/300/180",
    joining_fee: 3500,
    annual_fee: 3500,
    reward_type: "travel_points",
    reward_rate: 2.8,
    eligibility_criteria: {
      min_income: 60000,
      min_credit_score: 750
    },
    perks: [
      "5X membership rewards points on overseas spends",
      "3X points on dining",
      "40,000 bonus points on joining",
      "Comprehensive travel insurance",
      "Airport lounge access"
    ],
    apply_link: "https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card"
  },
  {
    id: "rbl-world-safari",
    name: "RBL Bank World Safari Credit Card",
    issuer: "RBL Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 3000,
    annual_fee: 3000,
    reward_type: "travel_points",
    reward_rate: 2.2,
    eligibility_criteria: {
      min_income: 50000,
      min_credit_score: 720
    },
    perks: [
      "6 reward points per ₹100 on travel and dining",
      "3 reward points per ₹100 on all other spends",
      "Airport lounge access",
      "Travel insurance",
      "Annual fee waiver on spending ₹1.5 lakh"
    ],
    apply_link: "https://www.rblbank.com/cards/credit-cards/world-safari-credit-card"
  },
  {
    id: "hsbc-cashback",
    name: "HSBC Cashback Credit Card",
    issuer: "HSBC Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 999,
    annual_fee: 999,
    reward_type: "cashback",
    reward_rate: 1.5,
    eligibility_criteria: {
      min_income: 40000,
      min_credit_score: 700
    },
    perks: [
      "10% cashback on dining for first 6 months",
      "1.5% unlimited cashback on all spends",
      "No cashback capping",
      "Annual fee waiver on spending ₹1 lakh",
      "Fuel surcharge waiver"
    ],
    apply_link: "https://www.hsbc.co.in/credit-cards/products/cashback/"
  },
  {
    id: "bob-eterna",
    name: "Bank of Baroda Eterna Credit Card",
    issuer: "Bank of Baroda",
    image_url: "/api/placeholder/300/180",
    joining_fee: 999,
    annual_fee: 999,
    reward_type: "travel_points",
    reward_rate: 1.8,
    eligibility_criteria: {
      min_income: 30000,
      min_credit_score: 680
    },
    perks: [
      "4 reward points per ₹100 on dining and entertainment",
      "2 reward points per ₹100 on all other spends",
      "Welcome bonus of 2500 points",
      "Fuel surcharge waiver",
      "Annual fee waiver on spending ₹60,000"
    ],
    apply_link: "https://www.bankofbaroda.in/personal-banking/digital-products/ways-to-bank/bob-cards/credit-cards/eterna"
  },
  {
    id: "federal-signet",
    name: "Federal Bank Signet Credit Card",
    issuer: "Federal Bank",
    image_url: "/api/placeholder/300/180",
    joining_fee: 499,
    annual_fee: 499,
    reward_type: "cashback",
    reward_rate: 1.2,
    eligibility_criteria: {
      min_income: 20000,
      min_credit_score: 650
    },
    perks: [
      "5% cashback on fuel and grocery",
      "2% cashback on online spends",
      "1% cashback on all other spends",
      "Annual fee waiver on spending ₹50,000",
      "Contactless payment facility"
    ],
    apply_link: "https://www.federalbank.co.in/personal/cards/credit-cards/signet"
  }
];
