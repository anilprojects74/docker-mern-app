// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="mb-4 text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

