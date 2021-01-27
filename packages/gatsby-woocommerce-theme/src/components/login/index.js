import React, { useState } from "react";
import cartSpinnerGif from "../../images/cart-spinner.gif";
import { sanitize, setAuth } from "../../utils/functions";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import LOGIN from "../../mutations/login";
import { v4 } from "uuid";
import validateAndSanitizeLoginForm from "../../validator/login";
import loginimg from "../../images/login-img.png";
import Link from "gatsby-link";
import "./login.scss";

const Login = ({ setLoggedIn, setUserType }) => {
  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  // Login Mutation.
  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      variables: {
        input: {
          clientMutationId: v4(), // Generate a unique id.,
          username: loginFields.username,
          password: loginFields.password,
        },
      },
      onCompleted: (data) => {
        // If error.
        if (!isEmpty(loginError)) {
          setErrorMessage(loginError.graphQLErrors[0].message);
        }

        const { login } = data;
        const authData = {
          authToken: login.authToken,
          user: login.user,
        };

        setAuth(authData);
        setTimeout(() => {
          setLoggedIn(true);
        }, 600);
      },
      onError: (error) => {
        if (error) {
          if (!isEmpty(error)) {
            setErrorMessage(error.graphQLErrors[0].message);
          }
        }
      },
    }
  );

  const onFormSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validation and Sanitization.
    const validationResult = validateAndSanitizeLoginForm({
      username: loginFields.username,
      password: loginFields.password,
    });

    if (validationResult.isValid) {
      setLoginFields({
        username: validationResult.sanitizedData.username,
        password: validationResult.sanitizedData.password,
      });
      login();
    } else {
      setClientSideError(validationResult);
    }
  };

  /**
   * Sets client side error.
   *
   * Sets error data to result received from our client side validation function,
   * and statusbar to true so that its visible to show the error.
   *
   * @param {Object} validationResult Validation Data result.
   */
  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password) {
      setErrorMessage(validationResult.errors.password);
    }

    if (validationResult.errors.username) {
      setErrorMessage(validationResult.errors.username);
    }
  };

  const handleOnChange = (event) => {
    setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
  };

  const { username, password } = loginFields;
  return (
    // <div className="login-form col-md-6">
    //   <h4 className="mb-4">Login</h4>

    //   <form onSubmit={onFormSubmit}>
    //     <label className="form-group">
    //       Username:
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="username"
    //         value={username}
    //         onChange={handleOnChange}
    //       />
    //     </label>
    //     <br />
    //     <label className="form-group">
    //       Password:
    //       <input
    //         type="password"
    //         className="form-control"
    //         name="password"
    //         value={password}
    //         onChange={handleOnChange}
    //       />
    //     </label>
    //     <br />
    //     <button className="btn btn-dark mb-3" type="submit">
    //       Login
    //     </button>
    //     {loginLoading && (
    //       <img
    //         className="woo-next-cart-item-spinner"
    //         src={cartSpinnerGif}
    //         alt="loading"
    //       />
    //     )}
    //   </form>
    // </div>

    <div className="left-block">
      <div className="login-form">
        <h3>Log in.</h3>
        {loginLoading && (
          <img
            className="woo-next-cart-item-spinner"
            src={cartSpinnerGif}
            alt="loading"
          />
        )}

        {!isEmpty(errorMessage) && (
          <div
            className="alert alert-danger"
            dangerouslySetInnerHTML={{ __html: sanitize(errorMessage) }}
          />
        )}
        <p>Log in with your data that you entered during your registration. </p>
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label>Email address *</label>
            <input
              type="email"
              name="username"
              value={username}
              onChange={handleOnChange}
              className="form-control"
              placeholder="enter your email address"
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              name="password"
              value={password}
              onChange={handleOnChange}
              type="password"
              className="form-control"
              placeholder="enter your password"
            />
          </div>
          <div className="form-group check">
            <input type="checkbox" id="keeplog" />{" "}
            <label htmlFor="keeplog">Keep me logged in</label>
          </div>
          <div className="form-group">
            <button className="login-btn" type="submit">
              Log in
            </button>
          </div>
          <div className="already">
            <span>Don’t have an account?</span>{" "}
            <a
              href="javaScript:void(0)"
              onClick={() => setUserType("register")}
            >
              Sign up
            </a>
          </div>
          {/* <div className="forget-pass">
            <Link to="/">Forgot password?</Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};
export default Login;
