import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "./Api";
import "./Form.css"
function Login({user, setUser}){
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Error state
    useEffect(() => {
        if (user) navigate("/");
      }, []);

    const handleSubmit = async evt => {
      try{
        evt.preventDefault();
        async function sendData(data){
            let res = await Api.login(data);
            return res;
        }

        let res = await sendData(formData);
        Api.token = res;
        console.log(res);
        let userData = await Api.getUser(formData.username);
        console.log("user Data");
        console.log(userData);
        setUser({
            username: userData.username,
            email: userData.email,
            collection: userData.collection,
            token: res
        });

        navigate('/')
      } catch (err){
        setError(err);
      }
    };


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    };

    return(
        <section className="formSection">
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>

          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button>Login</button>
        </form>
        <h3><Link to={"/register"}>Don't have an account?</Link></h3>
        </section>
    )
}

export default Login;