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
    console.log(res);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  if (data && data.error) {
    console.log(data.message);
    router.push("/");
  }
  let loggedIn = false;
  if (data && data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <div>
        <Head>
          <title>Welcome to landing page</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* {!loggedIn && } */}
        <h1>Simplest login {data.email} </h1>
        {/* <p>Welcome {data.email} !!!</p> */}
        <button onClick={() => router.push("/profile")}>Profile</button>
        <br />
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
    </div>
  );
}

export default profile;
