import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import validator from "validator";
import Head from "next/head";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);
    setSignupError("");
    if (!validator.isEmail(email)) {
      e.target.setCustomValidity("Enter valid email");
    } else e.target.setCustomValidity("");
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    setSignupError("");
    if (
      validator.isStrongPassword(e.target.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity(
        "Please Enter password of minimum 8 letter with minimum\n: 1 lowercase, 1 uppercase, 1 number and 1 symbol!!"
      );
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.Success) {
          setSignupError(data.error);
        }
        if (data && data.token) {
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/dashboard");
        }
      });
  }

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login - Mazer Admin Dashboard</title>
        {/* <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet"/> */}
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link
          rel="stylesheet"
          href="/vendors/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/css/app.css" />
        <link rel="stylesheet" href="/css/pages/auth.css" />
      </Head>

      <div id="auth">
        <div className="row h-100">
          <div className="col-lg-5 col-12">
            <div id="auth-left">
              <div className="auth-logo">
                <a href="/" className="page-heading">
                  <img src="/images/logo/logo.png" alt="Logo" />
                  NoMoreCoding
                </a>
              </div>
              <h1 className="auth-title">Sign Up</h1>
              <p className="auth-subtitle mb-5">
                Input your data to register to our website.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    className="form-control form-control-xl"
                    placeholder="Email"
                    value={email}
                    id="email"
                    onChange={(e) => validateEmail(e)}
                    name="email"
                    type="email"
                    required
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-person"></i>
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => validatePassword(e)}
                    name="password"
                    required
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>
                </div>

                {signupError && (
                  <div className="alert alert-danger">{signupError}</div>
                )}

                <input
                  className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                  type="submit"
                  value="Sign Up"
                />
              </form>
              <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a href="login" className="font-bold">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-none d-lg-block">
            <div id="auth-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
