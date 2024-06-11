import React, { useState } from 'react';
import api from '../../api/api';
import { Navigate, useNavigate, Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '', // Changed from username to email
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
          const response = await api.post('/api/login', formData);
          localStorage.setItem('token', response.data.token);
          console.log("token data", response.data);
      
          const department = response.data.department; // Extract department from response data
          console.log(department);
      
          if (department === 'Administration' && response.data.branch === 'Head Office') { // Check if department is Administration and branch is head office
            console.log('Navigating to admin head office');
            navigate('/Head-Admin-dashboard'); // Redirect to admin head office component
          } else if (department === 'Administration') { // Check if department is Administration
            console.log('Navigating to admin dashboard');
            navigate('/admin-dashboard'); // Redirect to admin dashboard
          } else {
            console.log('Navigating to employee dashboard');
            navigate('/employee-dashboard'); // Redirect to employee dashboard for non-admin users
          }
        } catch (error) {
          setMessage({
            type: 'danger',
            text: error.response?.data?.message || 'Error logging in',
          });
        }
      };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <div className="card p-4 shadow-sm">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    {message && (
                        <div className={`alert mt-3 alert-${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <div className="text-center mt-3">
                        <p>Not signed up?  <Link to="/register">Sign up here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
