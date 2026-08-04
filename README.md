# ⚡ NEYRIX AI – AI-Powered Social Media Content Generator & Analyzer

> **B.Tech CSE Final Year Project** | React.js + Node.js + MongoDB + AI

---

## 📌 Project Overview

NEYRIX AI is a full-stack web application that helps users generate AI-powered social media content, discover trending topics, and analyze post engagement — all from a single sleek dashboard.

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
