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
  const [updatePassError, setUpdatePassError] = useState("");

  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  if (data && data.error) {
    console.log(data.message);
    router.push("/");
  }
  if (getName) {
    getNameAPI();
  }

  const validateUserName = (e) => {
    let userName = e.target.value;
    const regex = /^[A-Za-z]+$/;
    setUserName(userName);
    if (!regex.test(userName) && userName.length <= 5) {
      e.target.setCustomValidity("Please Enter valid User Name");
    } else e.target.setCustomValidity("");
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
        document.getElementById("userName").innerHTML = data.userName;
        getName = false;
      });
  }
  function updateNameAPI() {
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
        console.log(data);
        if (data && data.Success) {
          setUpdateNameField(false);
          getName = true;
          getNameAPI();
        }
      });
  }
  function updatePassAPI() {
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
          setUpdatePassError(data.message);
        }
      });
  }
  const validatePass = (e) => {
    console.log(e.target.value);
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
    } else {
      e.target.setCustomValidity(
        "Please Enter password of minimum 8 letter with minimum\n: 1 lowercase, 1 uppercase, 1 number and 1 symbol !!"
      );
    }
  };
  function editUser() {
    setUpdateNameField(true);
    document.getElementById("userName").innerHTML = "";
  }

  return (
    <div>
      <div>
        <Head>
          <title>Welcome to profile page</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* {!loggedIn && } */}
        <h1> Login as {data.email} </h1>
        {/* <p>Welcome {data.email} !!!</p> */}
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
      <div className="">
        <div className="">Profile Settings</div>
        <div className="">
          <table className="">
            <tbody className="">
              <tr className="">
                <td className="">Full Name </td>
                <td className="" id="userName">
                  {updateNameField && (
                    <form>
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
                    <form>
                      <>
                        <input
                          id="updatePass"
                          onChange={(e) => validatePass(e)}
                          type="password"
                          placeholder="Enter Password"
                        ></input>
                      </>
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
      </div>
    </div>
  );
}

export default profile;
