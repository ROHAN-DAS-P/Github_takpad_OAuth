# GitHub OAuth Dashboard

A full-stack web application that authenticates users via GitHub OAuth and displays their repositories, issues, and pull requests in a user-friendly dashboard.


## 🚀 Features

✅ GitHub OAuth authentication  
✅ View all your repositories  
✅ View repository details  
✅ See open issues per repository  
✅ See open pull requests per repository  
✅ Protected routes for logged-in users  


## 🔐 OAuth Setup (GitHub)

1. Go to [GitHub Developer Settings]
2. Create a new OAuth App:
3. Example:
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/auth/github/callback`
4. Get your:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`




## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/github-oauth-dashboard.git
```

### 2. Backend Setup
```bash
cd server 
npm install
cp .env.example .env
# Add your GitHub Client ID and Secret
node index.js
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

### 4. Visit
Open [http://localhost:3000](http://localhost:3000) and click "Authenticate with GitHub"
