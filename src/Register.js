import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "./Api";
import './Form.css'; // Import the CSS file

function Register({ user, setUser }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
      if (user && user.token) navigate("/");
    }, [user, navigate]);

    const handleSubmit = async (evt) => {
      try {
        evt.preventDefault();
        async function sendData(data) {
            let res = await Api.register(data);
            return res;
        }

        let res = await sendData(formData);

        setUser({
            username: formData.username,
            email: formData.email,
            token: res
        });

        navigate('/');
      } catch (err) {
        setError(err.message); // Use err.message for better error display
      }
    };

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    };

    return (
        <section className="formSection">
          {error && <p>{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>
          <h3><Link to="/login">Already Have An Account?</Link></h3>
        </section>
    );
}

export default Register;
