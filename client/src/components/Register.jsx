import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setAuth }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await axios.post('/api/users', {
        email: values.email,
        password: values.password,
      });

      toast.success('Account created successfully! Redirecting to login...', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || 'Server error. Please try again.';
      setStatus(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="p-0 m-0 register-page">
      <ToastContainer />
      <Row className="vh-100 g-0">
        <Col xs={12} className="d-flex align-items-center justify-content-center position-relative">
          <img src="/login.jpg" alt="illustration" className="bg-image" />

          <Card className="register-card p-4 p-sm-5 shadow-lg">
            <div className="text-center mb-4">
              <h3 style={{ fontWeight: 600 }}>Create a New Account</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Fill in your details below to register
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ status, isSubmitting }) => (
                <Form>
                  {status && <Alert variant="danger">{status}</Alert>}

                  <div className="mb-3">
                    <label>Email address</label>
                    <Field name="email" type="email" className="form-control" />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <Field name="confirmPassword" type="password" className="form-control" />
                    <div className="text-danger small mt-1">
                      <ErrorMessage name="confirmPassword" />
                    </div>
                  </div>

                  <Button type="submit" className="w-100" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </Button>

                  <div className="text-center mt-3">
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                      Already have an account? <Link to="/login">Log in</Link>
                    </span>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>

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
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          max-width: 450px;
          width: 100%;
          z-index: 10;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
        }
      `}</style>
    </Container>
  );
};

export default Register;
