import React, { useState } from "react";
import Header from "../components/Header";
import HeaderPage from "../components/headerPage";
import SideBar from "../components/sidebar";
import useSWR from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";
let reload = true;
function userList() {
  const [usersList, setUsersList] = useState([]);
  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (data && data.error) {
    router.push("/");
  }

  if (reload) {
    getNameAPI();
    reload = false;
  }
  function getNameAPI() {
    fetch("/api/getUserList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setUsersList(data.userList);
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
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  <h3>User List</h3>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="card">
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>index</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Invide Code</th>
                        <th>From Invite</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList &&
                        usersList.map((user) => (
                          <tr id={user._id} key={user._id}>
                            <td>{usersList.indexOf(user) + 1}</td>
                            <td>{user.fullName || "---"}</td>
                            <td>{user.email || "---"}</td>
                            <td>{user.myInviteCode || "---"}</td>
                            <td>{user.fromInvitecode || "---"}</td>
                            <td>{user.dateAdded.substring(0, 10)}</td>
                            <td>
                              {user.IsVerified && (
                                <span className="badge bg-success">Active</span>
                              )}
                              {!user.IsVerified && (
                                <span className="badge bg-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <a
                                href={"/userProfile?userId=" + user._id}
                                className="btn btn-sm btn-primary"
                              >
                                <i className="bi bi-pencil-square" />
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/main.js"></script>
    </div>
  );
}

export default userList;
