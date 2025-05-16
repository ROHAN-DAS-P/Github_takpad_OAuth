import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RepoCard from '../components/RepoCard';

function Dashboard() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/repo', { withCredentials: true })
      .then(res => setRepos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <h2 className="my-4">Your Repositories</h2>
      <Row>
        {repos.map(repo => (
          <Col md={4} key={repo.id}>
            <RepoCard repo={repo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
