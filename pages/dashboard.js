import React from "react";
import Head from "next/head";
import useSWR from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";
// import { Navigation } from "react-minimal-side-navigation";
// import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

function profile() {
  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    //console.log(res);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  if (data && data.error) {
    //console.log(data.message);
    router.push("/");
  }
  let loggedIn = false;
  if (data && data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NoMoreCoding Dashboard</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
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
        <div id="sidebar" class="active">
          <div class="sidebar-wrapper active">
            <div class="sidebar-header">
              <div class="d-flex justify-content-between">
                <div class="logo">
                  <a href="/" className="page-heading">
                    <img src="/images/logo/logo.png" alt="Logo" />
                    NoMoreCoding
                  </a>
                </div>
                {/* <div class="toggler">
                  <a href="#" class="sidebar-hide d-xl-none d-block">
                    <i class="bi bi-x bi-middle"></i>
                  </a>
                </div> */}
              </div>
            </div>
            <div class="sidebar-menu">
              <ul class="menu">
                <li className="sidebar-item  ">
                  <a href="#" className="sidebar-link">
                    <i className="bi bi-grid-fill"></i>
                    <span>Dashboard</span>
                  </a>
                </li>

                <li class="sidebar-item  ">
                  <a href="/profile" class="sidebar-link">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li class="sidebar-item  ">
                  <a
                    onClick={() => {
                      cookie.remove("token");
                      router.push("/");
                    }}
                    class="sidebar-link"
                  >
                    <i class="bi"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
            <button class="sidebar-toggler btn x">
              <i data-feather="x"></i>
            </button>
          </div>
        </div>
        <div id="main">
          {/* <header class="mb-3">
            <a href="#" class="burger-btn d-block d-xl-none">
              <i class="bi bi-justify fs-3"></i>
            </a>
          </header> */}

          <div class="page-heading">
            <div class="page-title">
              <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                  <h3>Dashboard</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
      <script src="/js/bootstrap.bundle.min.js"></script>

      <script src="/js/main.js"></script>

      {/* // <div>
    //   <div>
    //     <Head>
    //       <title>Welcome to landing page</title>
    //       <meta>
    //         name="viewport"
    //         content="initial-scale=1.0, width=device-width"
    //       />
    //     </Head>
    //     {!loggedIn && }
    //     <h1>Simplest login {data.email} </h1>
    //      <p>Welcome {data.email} !!!</p>
    //     <button onClick={() => router.push("/profile")}>Profile</button>
    //     <br />
    //     <button
    //       onClick={() => {
    //         cookie.remove("token");
    //         //revalidate();
    //         router.push("/");
    //       }}
    //     >
    //       Logout
    //     </button>
    //   </div>
    // </div> */}
    </div>
  );
}

export default profile;
