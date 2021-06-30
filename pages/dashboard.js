import React from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import HeaderPage from "../components/headerPage";
import useSWR from "swr";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (data && data.error) {
    router.push("/");
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
                  <h3>Dashboard</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/main.js"></script>
    </div>
  );
}

export default Dashboard;
