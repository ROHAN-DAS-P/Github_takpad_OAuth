import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';

function IssueList() {
  const { id } = useParams();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/repo/${id}/issues`, { withCredentials: true })
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <Container>
      <h3 className="my-4">Open Issues</h3>
      <ListGroup>
        {issues.map(issue => (
          <ListGroup.Item key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title}
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

export default IssueList;
