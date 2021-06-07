import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import validator from "validator";

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
    // console.log(email);
    //call api
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
        console.log(data);
        if (data && data.error) {
          setLoginError(data.error);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          router.push("/dashboard");
        }
      });
    // fetch(`/api/logIn?email=${email}&password=${password}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Login</p>
      <label htmlFor="email">
        email
        <input
          value={email}
          // id="email"
          onChange={(e) => validateEmail(e)}
          name="email"
          type="email"
          required
        />
      </label>
      <br />

      <label htmlFor="password">
        password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          required
        />
      </label>
      <input type="submit" value="Submit" />
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </form>
  );
};

export default Login;
