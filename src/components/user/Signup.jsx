import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      // Making the POST request to the backend
      const response = await axios.post('http://localhost:8080/api/users/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // On successful response
      setSuccessMessage('SignUp successful!');
      setErrorMessage('');
      console.log('Response:', response.data);
      window.location.href="/login"
      
    } catch (error) {
      // Handle errors
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setSuccessMessage('');
      console.log('Error:', error.response?.data);
    }
  };

  return (
    <div className="row mt-3">
      <h1 className="col-6 offset-3">SignUp on Wanderlust</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Success and Error Messages */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-success">SignUp</button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
// export default SignUp;
