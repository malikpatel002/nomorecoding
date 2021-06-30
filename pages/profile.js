import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import HeaderPage from "../components/headerPage";
import useSWR from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import validator from "validator";
// let getName = true;
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
  if (data && data.error) {
    router.push("/");
  }

  // if (getName) {
  //   getNameAPI();
  // }

  // const validateUserName = (e) => {
  //   e.preventDefault();
  //   let userName = e.target.value;
  //   //const regex = /^[A-Za-z]+$/;
  //   setUserName(userName);
  //   if (validator.isAlpha(userName) && userName.length >= 3) {
  //     e.target.setCustomValidity("");
  //     nameSubmit.disabled = false;
  //   } else {
  //     e.target.setCustomValidity("Please Enter valid User Name");
  //     nameSubmit.disabled = true;
  //   }
  // };

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
  // function getNameAPI() {
  //   fetch("/api/getProfile", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: data.userId,
  //       callFor: "getUserName",
  //     }),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       document.getElementById("updateName").value = data.userName;
  //       //console.log(data);
  //       getName = false;
  //     });
  // }
  // function updateNameAPI() {
  //   //console.log(userName);
  //   fetch("/api/getProfile", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: data.userId,
  //       callFor: "updateUserName",
  //       userName: userName,
  //     }),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       if (data && data.Success) {
  //         setUpdateNameField(false);
  //         getName = true;
  //         getNameAPI();
  //       } else {
  //         setError(data.error);
  //       }
  //     });
  // }
  function updatePassAPI() {
    // console.log("update password");
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
        // console.log(data);
        if (data && data.Success) {
          setUpdatePassField(false);
          alert(data.message);
          // console.log("got success");
          // getPass = true;
          // getAPI();
        } else {
          // console.log(data.error);
          setError(data.message);
        }
      });
  }

  return (
    <div>
      <Header />
      <div id="app">
        <SideBar />
        <div id="main">
          <HeaderPage />
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
                          {/* <div className="row">
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
                          </div> */}
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
                                  // console.log("update Pass");
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
                            {error && (
                              <p style={{ color: "red" }}>{setError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <script src="/js/bootstrap.bundle.min.js"></script>

        <script src="/js/main.js"></script>
      </div>
    </div>
  );
}

export default profile;
