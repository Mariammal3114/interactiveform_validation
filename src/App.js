import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {  
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);  
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };


return (
  <>
    {!showForm ? (
      <div className="welcome-page">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM Logo" className="ibm-logo"/>
        <p>At IBM, innovation meets purpose. We’re shaping the future of technology through intelligent solutions that empower businesses, communities, and individuals worldwide. Whether you're building smarter systems, exploring AI, or driving digital transformation, your journey starts here. Join us in redefining what's possible</p>
        <button onClick={() => setShowForm(true)}>Get Started</button>
      </div>
    ) : (
      <div className="wrapper">
        <div className="card">
          <div className="left-panel">
            <div className="welcome-text">
              <h3>Welcome to IBM</h3>
              <p>Innovating with intelligence. Join us to shape the future of technology.</p>
            </div>
            <img src="/myform.jpeg" alt="Form illustration" />
          </div>
          <div className="right-panel">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} noValidate>
              {['name', 'email', 'password'].map((field) => (
                <div
                  className={`form-group ${
                    errors[field] && touched[field] ? 'error' : ''
                  }`}
                  key={field}
                >
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="input-icon-wrapper">
                    <i
                      className={`fas fa-${
                        field === 'name'
                          ? 'user'
                          : field === 'email'
                          ? 'envelope'
                          : 'lock'
                      }`}
                    ></i>
                    <input
                      type={
                        field === 'password'
                          ? 'password'
                          : field === 'email'
                          ? 'email'
                          : 'text'
                      }
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      onBlur={() =>
                        setTouched({ ...touched, [field]: true })
                      }
                      placeholder={`Enter your ${field}`}
                    />
                  </div>
                  {errors[field] && touched[field] && (
                    <span className="error-message">{errors[field]}</span>
                  )}
                </div>
              ))}
              <button type="submit">Submit</button>
              <div className="social-login">
                <div className="login-divider">
                  <span>or login with</span>
                </div>
                <div className="social-icons">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                    alt="Google"
                    className="social-icon"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default App;
