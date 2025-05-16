const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  profile.accessToken = accessToken;
  return done(null, profile);
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

app.get('/', (req, res) => {
  res.send('Welcome to the GitHub OAuth Dashboard API');
}
);


app.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));
// app.get('auth/github', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('http://localhost:3000/dashboard');
// }
// );
app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  session: true
}), (req, res) => {
  console.log('User authenticated:', req.user);
  res.redirect('http://localhost:3000/dashboard');
});

app.get('/api/repo', ensureAuthenticated, async (req, res) => {
  const { accessToken } = req.user;
  try {
    const { data } = await axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `token ${accessToken}` }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

app.get('/api/repo/:id', ensureAuthenticated, async (req, res) => {
  const { accessToken } = req.user;
  const repoId = req.params.id;
  try {
    const { data } = await axios.get(`https://api.github.com/repositories/${repoId}`, {
      headers: { Authorization: `token ${accessToken}` }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repo details' });
  }
});

app.get('/api/repo/:id/issues', ensureAuthenticated, async (req, res) => {
  const { accessToken } = req.user;
  const repoId = req.params.id;
  try {
    const { data } = await axios.get(`https://api.github.com/repositories/${repoId}/issues`, {
      headers: { Authorization: `token ${accessToken}` }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

app.get('/api/repo/:id/pull', ensureAuthenticated, async (req, res) => {
  const { accessToken } = req.user;
  const repoId = req.params.id;
  try {
    const { data } = await axios.get(`https://api.github.com/repositories/${repoId}/pulls`, {
      headers: { Authorization: `token ${accessToken}` }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pull requests' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
