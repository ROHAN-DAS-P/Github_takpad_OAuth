import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';

function PullList() {
  const { id } = useParams();
  const [pulls, setPulls] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/repo/${id}/pull`, { withCredentials: true })
      .then(res => setPulls(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <Container>
      <h3 className="my-4">Open Pull Requests</h3>
      <ListGroup>
        {pulls.map(pr => (
          <ListGroup.Item key={pr.id}>
            <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
              {pr.title}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button className="mt-4" variant="secondary" as={Link} to="/dashboard">
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default PullList;
