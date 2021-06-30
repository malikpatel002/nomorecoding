import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import HeaderPage from "../components/headerPage";
import useSWR from "swr";
import { useRouter } from "next/router";
let reload = true;
// const userId = "5f9a7c2cf01ed8064aba8623";
function userProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [userInfo, setUserInfo] = useState([]);
  const [postList, setPostList] = useState([]);
  const [liked, setLiked] = useState(0);
  const [follower, setFollower] = useState(0);
  const [followed, setFollowed] = useState(0);
  const [bookmark, setBookmark] = useState(0);
  // console.log("in DashBoard");
  // const router = useRouter();
  // const { data, revalidate } = useSWR("/api/me", async function (args) {
  //   const res = await fetch(args);
  //   return res.json();
  // });

  // if (data && data.error) {
  //   router.push("/");
  // }

  if (userId && reload) {
    getUserInfoAPI();
    getPostListAPI();
    getLiked();
    getFollowerDetails();
    getBookmarks();
    reload = false;
  }
  function getBookmarks() {
    fetch("/api/getBookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.Success) {
          setBookmark(data.bookmarks);
        }
        reload = false;
      });
  }
  function getFollowerDetails() {
    fetch("/api/getFollowerDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        if (data.Success) {
          setFollowed(data.followed);
          setFollower(data.follower);
        }
        reload = false;
      });
  }
  function getLiked() {
    fetch("/api/getLiked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        if (data.Success) setLiked(data.liked);
        reload = false;
      });
  }
  function getUserInfoAPI() {
    fetch("/api/getUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        if (data.Success) setUserInfo(data.userInfo[0]);
        reload = false;
      });
  }
  function getPostListAPI() {
    fetch("/api/getUserPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        // console.log(typeof data.postList[0].productId.imagepath);
        if (data.Success) setPostList(data.postList);
        reload = false;
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
            <h3>Profile Statistics</h3>
          </div>
          <div className="page-content">
            <section className="row">
              <div className="col-12 col-lg-9">
                <div className="row">
                  <div className="col">
                    <div className="card">
                      <div className="card-body px-3 py-4-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="stats-icon purple">
                              <i className="iconly-boldShow"></i>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h6 className="text-muted font-semibold">Liked</h6>
                            <h6 className="font-extrabold mb-0">{liked}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <div className="card-body px-3 py-4-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="stats-icon blue">
                              <i className="iconly-boldProfile"></i>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h6 className="text-muted font-semibold">
                              Followers
                            </h6>
                            <h6 className="font-extrabold mb-0">{follower}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <div className="card-body px-3 py-4-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="stats-icon green">
                              <i className="iconly-boldAdd-User"></i>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h6 className="text-muted font-semibold">
                              Following
                            </h6>
                            <h6 className="font-extrabold mb-0">{followed}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <div className="card-body px-3 py-4-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="stats-icon red">
                              <i className="iconly-boldBookmark"></i>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h6 className="text-muted font-semibold">
                              Saved Post
                            </h6>
                            <h6 className="font-extrabold mb-0">{bookmark}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col">
                    <div className="card">
                      <div className="card-body px-3 py-4-5">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="stats-icon green">
                              <i className="iconly-boldAdd-User"></i>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h6 className="text-muted font-semibold">
                              Recommandations
                            </h6>
                            <h6 className="font-extrabold mb-0">80.000</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="card">
                      <div className="card-header">
                        <h4>Latest Comments</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-lg">
                            <thead>
                              <tr>
                                <th>Content</th>
                                <th>Likes</th>
                                <th>Rating</th>
                                <th>Category</th>
                                <th>Product</th>
                              </tr>
                            </thead>
                            <tbody>
                              {postList &&
                                postList.map((post) => (
                                  <tr key={post._id}>
                                    <td className="col-3">
                                      <div className="d-flex align-items-center">
                                        <div className="avatar">
                                          <img
                                            src={
                                              post.productId
                                                ? post.productId.imagepath
                                                : "/images/faces/5.jpg"
                                            }
                                          />
                                        </div>
                                        <p className="font-bold ms-3 mb-0">
                                          {post.content || "---"}
                                        </p>
                                      </div>
                                    </td>
                                    <td className="col-auto">
                                      <p className=" mb-0">
                                        {post.liked ? post.liked : "0"}
                                      </p>
                                    </td>
                                    <td className="col-auto">
                                      <p className=" mb-0">
                                        {post.rating ? post.rating : "0"}
                                      </p>
                                    </td>
                                    <td className="col-auto">
                                      <p className=" mb-0">
                                        {post.categoryId.name || "---"}
                                      </p>
                                    </td>
                                    <td className="col-auto">
                                      <p className=" mb-0">
                                        {post.productId
                                          ? post.productId.name
                                          : "---"}
                                      </p>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card">
                  <div className="card-content">
                    <img
                      src={userInfo.profilePic || "/images/faces/5.jpg"}
                      className="card-img-top img-fluid"
                      alt="singleminded"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {userInfo.username || "User Name"}
                      </h5>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      ( {userInfo.fullName || "Full Name"} )
                    </li>
                    <li className="list-group-item">
                      ( {userInfo.email || "User Email"} )
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/main.js"></script>
      <link rel="stylesheet" href="/vendors/iconly/bold.css" />
    </div>
  );
}

export default userProfile;
