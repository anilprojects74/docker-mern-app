import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.warn('⚠️ Please enter both email and password');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login',{
        email,
        password
      });

      toast.success('✅ Logged in successfully!');
      setAuth(true);
      setTimeout(() => navigate('/dashboard'), 1500); // Wait for toast to finish

    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Login failed';
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <Container fluid className="p-0 m-0 login-page">
      <Row className="vh-100 g-0">
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-center position-relative"
        >
          <img
            src="/login.jpg"
            alt="illustration"
            className="bg-image"
          />

          <Card
            className="login-card p-4 p-sm-5 shadow-lg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '16px',
              zIndex: 10,
            }}
          >
            <div className="text-center mb-4">
              <h3 style={{ fontWeight: 600 }}>Login to Your Account</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Enter your credentials below
              </p>
            </div>

            <Form onSubmit={handleLogin}>
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

              <div className="d-flex justify-content-between mb-3">
                <Form.Check type="checkbox" label="Remember me" />
                <Link to="#" style={{ fontSize: '0.9rem' }}>Forgot password?</Link>
              </div>

              <Button type="submit" className="w-100" variant="primary" style={{ borderRadius: '8px' }}>
                Log In
              </Button>

              <div className="text-center mt-3">
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                  New here? <Link to="/register">Create an account</Link>
                </span>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-center" autoClose={2000} />

      <style jsx="true">{`
        .login-page {
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

        .login-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .login-card:hover {
          box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }
      `}</style>
    </Container>
  );
};

export default Login;
