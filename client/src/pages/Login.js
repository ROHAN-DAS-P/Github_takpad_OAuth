import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/github';
  };

  return (
    <Container className="text-center mt-5">
      <h1>GitHub OAuth Dashboard</h1>
      <p>Authenticate with GitHub to view your repositories.</p>
      <Button variant="dark" onClick={handleLogin}>
        Authenticate with GitHub
      </Button>
    </Container>
  );
}

export default Login;
