import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
      } else {
        setAuth(true);
        navigate('/dashboard');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Container fluid className="p-0 m-0 register-page">
      <Row className="vh-100 g-0">
        {/* FULL SCREEN – Background Image */}
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-center position-relative"
        >
          <img
            src="/login.jpg" // Image from public folder
            alt="illustration"
            className="bg-image"
          />
          
          {/* RIGHT SIDE – Registration Form */}
          <Card
            className="register-card p-4 p-sm-5 shadow-lg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '16px',
              zIndex: 10, // Higher z-index for the floating effect
            }}
          >
            <div className="text-center mb-4">
              <h3 style={{ fontWeight: 600 }}>Create a New Account</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Fill in your details below to register
              </p>
            </div>

            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Form.Check type="checkbox" label="I agree to the terms and conditions" />
              </div>

              <Button type="submit" className="w-100" variant="primary" style={{ borderRadius: '8px' }}>
                Register
              </Button>

              <div className="text-center mt-3">
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Already have an account? <Link to="/login">Log in</Link>
                </span>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Inline Styles */}
      <style jsx="true">{`
        .register-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f7fa;
          position: relative;
          overflow: hidden;
        }

        .bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .register-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .register-card:hover {
          box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }
      `}</style>
    </Container>
  );
};

export default Register;
