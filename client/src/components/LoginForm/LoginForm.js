import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "/signin", payload)
      .then(function (response) {
        if (response.status === 200) {
          const user = {
            token: response.data.token,
            id: response.data.result._id,
            name: response.data.result.firstName,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToHome();
          props.showError(null);
        } else if (response.status === 400) {
          props.showError("Username or password do not match");
        } else {
          props.showError("this email is not registered");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/alljournals");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="login col-lg-6  col-md-6 col-sm-6 ">{/* logo content  */}</div>
          <div className="card col-lg-4 col-md-3  col-sm-4 login-card offset-8 mt-2 hv-center">
            <form className="loginForm">
              <div className="form-group text-center">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={state.email}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group text-center">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check"></div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </form>
            <div
              className="alert alert-success mt-2"
              style={{ display: state.successMessage ? "block" : "none" }}
              role="alert"
            >
              {state.successMessage}
            </div>
            <div className="registerMessage">
              <span>Don't have an account? </span>
              <span className="loginText" onClick={() => redirectToRegister()}>
                Register
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LoginForm);
