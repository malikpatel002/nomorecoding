import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import validator from "validator";

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
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>
      <label htmlFor="email">
        email
        <input
          value={email}
          id="email"
          onChange={(e) => validateEmail(e)}
          name="email"
          type="email"
          required
        />
      </label>
      <br />

      <label for="password">
        password
        <input
          value={password}
          onChange={(e) => validatePassword(e)}
          name="password"
          type="password"
          required
        />
      </label>
      <br />

      <input type="submit" value="Submit" />
      {signupError && <p style={{ color: "red" }}>{signupError}</p>}
    </form>
  );
};

export default Signup;
