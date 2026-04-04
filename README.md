# ⚡ SocialAI – AI-Powered Social Media Content Generator & Analyzer

> **B.Tech CSE Final Year Project** | React.js + Node.js + MongoDB + AI

---

## 📌 Project Overview

SocialAI is a full-stack web application that helps users generate AI-powered social media content, discover trending topics, and analyze post engagement — all from a single sleek dashboard.

---

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, React Router, Chart.js    |
| Styling    | Custom CSS (dark theme), CSS vars   |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose ODM)              |
| Auth       | JWT (JSON Web Tokens), bcryptjs     |
| AI Engine  | Hugging Face API (free) + Templates |
| Charts     | Chart.js via react-chartjs-2        |

---

## 📁 Folder Structure

```
socialai/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (name, email, interests)
│   │   └── Post.js          # Post schema (content, analytics, schedule)
│   ├── routes/
│   │   ├── auth.js          # Register, Login, Profile APIs
│   │   ├── content.js       # AI Content Generation APIs
│   │   ├── trending.js      # Trending Topics APIs
│   │   ├── analytics.js     # Engagement Analytics APIs
│   │   └── scheduler.js     # Post Scheduler APIs
│   ├── middleware/
│   │   └── auth.js          # JWT authentication guard
│   ├── utils/
│   │   └── aiGenerator.js   # AI + Template content engine
│   ├── server.js            # Main Express app entry point
│   ├── package.json
│   └── .env.example         # Sample environment variables
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── context/
        │   └── AuthContext.js   # Global auth state + Axios config
        ├── components/
        │   └── Layout/
        │       └── Layout.js    # Sidebar navigation layout
        ├── pages/
        │   ├── LoginPage.js     # Login screen
        │   ├── RegisterPage.js  # Sign up + interest selection
        │   ├── Dashboard.js     # Overview + quick actions
        │   ├── Generator.js     # AI content generator
        │   ├── Trending.js      # Trending topics browser
        │   ├── Analyzer.js      # Charts + engagement analytics
        │   └── Scheduler.js     # Post scheduler + drafts
        ├── App.js               # Routing setup
        ├── index.js             # React entry point
        └── index.css            # Global dark theme styles
```

---

## ⚙️ Setup Instructions (Step by Step)

### Prerequisites
- Node.js v18+ installed ([download](https://nodejs.org))
- MongoDB installed locally OR a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- Git (optional)

---

### Step 1 – Clone / Download the Project
```bash
# If using git:
git clone <your-repo-url>
cd socialai

# Or just extract the ZIP and open the folder
```

---

### Step 2 – Setup the Backend

```bash
cd backend
npm install
```

Copy the sample env file and fill it in:
```bash
cp .env.example .env
```

Open `.env` and set:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialai
JWT_SECRET=any_long_random_string_here
```

> 💡 **For MongoDB Atlas (cloud):** Replace MONGO_URI with your Atlas connection string.
> It looks like: `mongodb+srv://username:password@cluster.mongodb.net/socialai`

> 💡 **For Hugging Face AI (optional, free):**
> Sign up at huggingface.co → Settings → Access Tokens → Create token
> Paste it as: `HF_API_KEY=hf_your_token_here`
> Without this, the app uses smart template-based generation (works great too!)

Start the backend:
```bash
npm run dev
# Server runs at http://localhost:5000
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

---

### Step 3 – Setup the Frontend

Open a **new terminal**:
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

---

### Step 4 – Create a Test Account

1. Open `http://localhost:3000`
2. Click **Sign up**
3. Fill in your name, email, password
4. Select your interests (e.g., Technology, Business)
5. You're in! 🎉

---

## 🔑 Sample `.env` File (Backend)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/socialai
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRE=7d
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 Dummy Data for Testing

Use these example API calls in Postman:

**Register:**
```
POST http://localhost:5000/api/auth/register
Body: { "name":"Test User", "email":"test@demo.com", "password":"password123", "interests":["technology","business"] }
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body: { "email":"test@demo.com", "password":"password123" }
```

**Generate Content:**
```
POST http://localhost:5000/api/content/generate
Headers: Authorization: Bearer <token>
Body: { "interest":"technology", "tone":"funny", "platform":"twitter", "save":true }
```

---

## 📦 Core Features Explained

### 1. User Authentication
- JWT-based login/signup with bcrypt password hashing
- Token stored in localStorage, auto-attached to all API requests
- Protected routes redirect unauthenticated users to login

### 2. AI Content Generator
- Selects interest + tone + platform → calls AI engine
- AI engine tries Hugging Face API first, falls back to rich templates
- Shows character count, hashtag extraction, engagement prediction
- Option to generate-only or generate-and-save

### 3. Trending Topics
- Returns curated trending data per interest category
- "HOT" badge for rapidly rising topics
- Click any topic to navigate to generator

### 4. Engagement Analyzer
- Chart.js charts: Line (reach), Bar (likes), Line (engagement %), Doughnut (platform split)
- Shows top performing posts ranked by engagement
- Demo data shown for new users; real data pulls from saved posts

### 5. Post Scheduler
- Create posts with optional schedule datetime
- Saved as "draft" (no date) or "scheduled" (with date)
- Cancel scheduling to move back to drafts
- Full delete support

---

## 🎨 UI Highlights
- Full dark mode with CSS variable theming
- Collapsible sidebar navigation
- Animated skeleton loading states
- Toast notifications for all user actions
- Responsive grid layouts

---

## 👥 Team Details

| Name | Role |
|------|------|
| Member 1 | Frontend (React, UI/UX) |
| Member 2 | Backend (Node.js, APIs) |
| Member 3 | Database + Auth |
| Member 4 | AI Integration + Testing |

---

## 📚 References

1. React.js Documentation – https://react.dev
2. Node.js & Express.js Docs – https://expressjs.com
3. MongoDB Mongoose Docs – https://mongoosejs.com
4. Chart.js Documentation – https://www.chartjs.org
5. Hugging Face Inference API – https://huggingface.co/docs/api-inference
6. JWT Authentication Guide – https://jwt.io/introduction
7. React Router v6 – https://reactrouter.com

---

*Submitted in partial fulfillment of B.Tech CSE – 8th Semester*
