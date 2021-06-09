import React, { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import validator from "validator";
let getName = true;
//
function profile() {
  const [updateNameField, setUpdateNameField] = useState(false);
  const [userName, setUserName] = useState("");
  const [updatePassField, setUpdatePassField] = useState(false);
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState("");
  if (typeof window === "object") {
    const nameSubmit = document.getElementById("nameSubmit");
    const passSubmit = document.getElementById("passSubmit");
  }
  // let validName = false;
  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  if (data && data.error) {
    //console.log(data.message);
    router.push("/");
  }
  if (getName) {
    getNameAPI();
  }

  const validateUserName = (e) => {
    e.preventDefault();
    let userName = e.target.value;
    //const regex = /^[A-Za-z]+$/;
    setUserName(userName);
    if (validator.isAlpha(userName) && userName.length >= 3) {
      e.target.setCustomValidity("");
      // validName = false;
      // console.log(validName);
      nameSubmit.disabled = false;
    } else {
      e.target.setCustomValidity("Please Enter valid User Name");
      //validName = true;
      // console.log(typeof userName);
      nameSubmit.disabled = true;
    }
  };

  const validatePass = (e) => {
    //console.log(e.target.value);
    e.preventDefault();
    setUserPass(e.target.value);
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
      passSubmit.disabled = false;
    } else {
      e.target.setCustomValidity(
        "Please Enter password of minimum 8 letter with minimum\n: 1 lowercase, 1 uppercase, 1 number and 1 symbol !!"
      );
      passSubmit.disabled = true;
    }
  };
  function getNameAPI() {
    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.userId,
        callFor: "getUserName",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        document.getElementById("updateName").value = data.userName;
        //console.log(data);
        getName = false;
      });
  }
  function updateNameAPI() {
    //console.log(userName);
    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.userId,
        callFor: "updateUserName",
        userName: userName,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.Success) {
          setUpdateNameField(false);
          getName = true;
          getNameAPI();
        } else {
          setError(data.error);
        }
      });
  }
  function updatePassAPI() {
    console.log("update password");
    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.userId,
        callFor: "updatePass",
        pass: userPass,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data && data.Success) {
          setUpdatePassField(false);
          alert(data.message);
          console.log("got success");
          // getPass = true;
          // getAPI();
        } else {
          console.log(data.error);
          setError(data.message);
        }
      });
  }

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NoMoreCoding Dashboard</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />

        <link
          rel="stylesheet"
          type="text/css"
          href="/vendors/perfect-scrollbar/perfect-scrollbar.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendors/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/app.css" />
        {/* <!-- <link rel="shortcut icon" href="assets/images/favicon.svg" type="image/x-icon"> --> */}
      </Head>

      <div id="app">
        <div id="sidebar" className="active">
          <div className="sidebar-wrapper active">
            <div className="sidebar-header">
              <div className="d-flex justify-content-between">
                <div className="logo">
                  <a href="/" className="page-heading">
                    <img src="/images/logo/logo.png" alt="Logo" />
                    NoMoreCoding
                  </a>
                </div>
                {/* <div className="toggler">
                  <a href="#" className="sidebar-hide d-xl-none d-block">
                    <i className="bi bi-x bi-middle"></i>
                  </a>
                </div> */}
              </div>
            </div>
            <div className="sidebar-menu">
              <ul className="menu">
                <li className="sidebar-item  ">
                  <a href="/dashboard" className="sidebar-link">
                    <i className="bi bi-grid-fill"></i>
                    <span>Dashboard</span>
                  </a>
                </li>

                <li className="sidebar-item  ">
                  <a href="#" className="sidebar-link">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li className="sidebar-item  ">
                  <a
                    onClick={() => {
                      cookie.remove("token");
                      router.push("/");
                    }}
                    className="sidebar-link"
                  >
                    <i className="bi"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
            <button className="sidebar-toggler btn x">
              <i data-feather="x"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>

        <div className="page-heading">
          <div className="page-title row col-12 col-md-6 order-md-1 order-last">
            <h3>Profile </h3>
          </div>

          <section id="basic-horizontal-layouts">
            <div className="row match-height">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-2">
                            <label>User Name</label>
                          </div>
                          <div className="col-md-4 form-group">
                            <form
                              className="form form-horizontal"
                              onSubmit={(e) => {
                                e.preventDefault();
                                updateNameAPI(e);
                                //return e.which != 13;
                              }}
                            >
                              <input
                                type="text"
                                id="updateName"
                                className="form-control"
                                placeholder="User Name"
                                onChange={(e) => validateUserName(e)}
                                disabled={!updateNameField}
                              />
                            </form>
                          </div>

                          <div className="col-md-4 justify-content-end">
                            <button
                              id="nameSubmit"
                              onClick={(e) => {
                                if (updateNameField) updateNameAPI(e);
                                else {
                                  setUpdateNameField(true);
                                  nameSubmit.disabled = true;
                                }
                              }}
                              className="btn btn-primary me-1 mb-1"
                            >
                              {updateNameField ? "Submit" : "Edit"}
                            </button>
                            {updateNameField && (
                              <button
                                className="btn btn-light-secondary me-1 mb-1"
                                onClick={() => {
                                  setUpdateNameField(false);
                                  nameSubmit.disabled = false;
                                  getName = true;
                                }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-2">
                            <label>Password</label>
                          </div>
                          <div className="col-md-4 form-group">
                            <form
                              className="form form-horizontal"
                              onSubmit={(e) => {
                                e.preventDefault();
                                updatePassAPI(e);
                              }}
                            >
                              <input
                                type="password"
                                id="updatePass"
                                className="form-control"
                                name="password"
                                placeholder="Enter a new password"
                                onChange={(e) => validatePass(e)}
                                disabled={!updatePassField}
                              />
                            </form>
                          </div>
                          <div className="col-md-4 justify-content-end">
                            <button
                              id="passSubmit"
                              onClick={(e) => {
                                console.log("update Pass");
                                if (updatePassField) updatePassAPI(e);
                                else {
                                  setUpdatePassField(true);
                                  passSubmit.disabled = true;
                                }
                              }}
                              className="btn btn-primary me-1 mb-1"
                              // disabled={updatePassField}
                            >
                              {updatePassField ? "Submit" : "Edit"}
                            </button>
                            {updatePassField && (
                              <button
                                className="btn btn-light-secondary me-1 mb-1"
                                onClick={() => {
                                  setUpdatePassField(false);
                                  passSubmit.disabled = false;
                                }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                          {error && <p style={{ color: "red" }}>{setError}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <script src="/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
        <script src="/js/bootstrap.bundle.min.js"></script>

        <script src="/js/main.js"></script>
        {/* <div>
        <Head>
          <title>Welcome to profile page</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        // {!loggedIn && } 
        <h1> Login as {data.email} </h1>
        // <p>Welcome {data.email} !!!</p>
        <button
          onClick={() => {
            cookie.remove("token");
            //revalidate();
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
      <div cla  ssName="">
        <div className="">Profile Settings</div>
        <div className="">
          <table className="">
            <tbody className="">
              <tr className="">
                <td className="">Full Name </td>
                <td className="" id="userName">
                  {updateNameField && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        //return e.which != 13;
                      }}
                    >
                      <input
                        id="updateName"
                        onChange={(e) => validateUserName(e)}
                        pattern="^[a-zA-Z]+.{4,}"
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "Please enter valid User Name !!! "
                          )
                        }
                      ></input>
                    </form>
                  )}
                </td>
                <td className="" id="">
                  {!updateNameField && (
                    <span onClick={() => editUser()}>Edit</span>
                  )}
                  {updateNameField && (
                    <>
                      <button onClick={() => updateNameAPI()}>Update</button>
                      <button
                        onClick={() => {
                          setUpdateNameField(false);
                          getName = true;
                        }}
                      >
                        Cancel
                      </button>
                      (Enter Only character with minimum length 5)
                    </>
                  )}
                </td>
              </tr>

              <tr className="">
                <td className="">Password </td>
                {updatePassField && (
                  <td className="" id="userPass">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <input
                        id="updatePass"
                        onChange={(e) => validatePass(e)}
                        type="password"
                        placeholder="Enter Password"
                      ></input>
                    </form>
                    <br />
                    {updatePassError && (
                      <p style={{ color: "red" }}>{updatePassError}</p>
                    )}
                  </td>
                )}
                <td className="" id="">
                  {!updatePassField && (
                    <span onClick={() => setUpdatePassField(true)}>Edit</span>
                  )}
                  {updatePassField && (
                    <>
                      <button onClick={() => updatePassAPI()}>Update</button>
                      <button
                        onClick={() => {
                          setUpdatePassField(false);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default profile;
