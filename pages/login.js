import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import validator from "validator";
import Head from "next/head";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);
    setLoginError("");
    if (!validator.isEmail(email)) {
      e.target.setCustomValidity("Enter valid email");
    } else e.target.setCustomValidity("");
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/api/logIn", {
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
        // console.log(data);
        if (data && !data.Success) {
          setLoginError(data.error);
        }
        if (data && data.token) {
          cookie.set("token", data.token, { expires: 2 });
          router.push("/dashboard");
        }
      });
  }
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login - NoMoreCoding Admin Dashboard</title>
        {/* <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet"> */}
        <link rel="stylesheet" href="/css/bootstrap.css" type="text/css" />
        <link
          rel="stylesheet"
          href="/vendors/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/app.css" />
        <link rel="stylesheet" type="text/css" href="/css/pages/auth.css" />
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
              <h1 className="auth-title">Log in.</h1>
              <p className="auth-subtitle mb-5">
                Log in with your data that you entered during registration.
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError("");
                    }}
                    name="password"
                    required
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>
                </div>
                {loginError && (
                  <div className="alert alert-danger">{loginError}</div>
                )}
                <input
                  className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                  type="submit"
                  value="Log In"
                />
              </form>
              <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                  Don't have an account?
                  <a href="signup" className="font-bold">
                    Sign up
                  </a>
                  .
                </p>
                <p>
                  <a className="font-bold" href="#">
                    Forgot password?
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

export default Login;
