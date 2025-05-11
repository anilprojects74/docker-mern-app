// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="mb-4 text-center">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

