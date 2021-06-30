import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import HeaderPage from "../components/headerPage";
import useSWR from "swr";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";

let reload = true;
let reload2 = true;

function productsList() {
  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (data && data.error) {
    router.push("/");
  }
  const { id } = router.query;
  const [categoryList, setCategoryList] = useState([]);
  const [businessesList, setBusinessesList] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(true);
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productImageURL, setProductImageURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const date = new Date().toUTCString();
  // console.log(date);
  if (reload) {
    getBusinessListAPI();
    getCategoryListAPI();
    // console.log(id);
    reload = false;
  }
  if (id && reload2) {
    // console.log(id);
    setAddOrEdit(false);
    getProductAPI();
    reload2 = false;
  }

  function getBusinessListAPI() {
    fetch("/api/getBusinessList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        setBusinessesList(data.businessList);
      });
  }

  function getCategoryListAPI() {
    fetch("/api/getCategoryList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        get: true,
        activeCategory: true,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        setCategoryList(data.categoryList);
      });
  }

  function getProductAPI() {
    setSuccess("");
    setError("");
    fetch("/api/getProductsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        get: true,
        editId: id,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        setProductName(data.productsList[0].name || "-");
        setProductDetail(data.productsList[0].detail || "-");
        setProductImageURL(data.productsList[0].imagepath || "-");
        document.getElementById("productCategory").value =
          data.productsList[0].categoryId || -1;
        document.getElementById("productBusiness").value =
          data.productsList[0].businessid || -1;

        if (data.productsList[0].isActive)
          document.getElementById("productStatusActive").checked = true;
        else document.getElementById("productStatusInactive").checked = true;
      });
  }

  function addproductsListAPI(e) {
    setSuccess("");
    setError("");
    e.preventDefault();
    fetch("/api/getProductsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        get: false,
        addOrEdit,
        productId: id,
        productName,
        productDetail,
        categoryId: document.getElementById("productCategory").value,
        businessesId: document.getElementById("productBusiness").value,
        productImageURL,
        isActive: document.getElementById("productStatusActive").checked,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        // getProductAPI();
        if (data.Success) {
          setSuccess(
            `Product ${addOrEdit ? "added" : "updated"} successfully!!!`
          );
          setTimeout(() => router.push("/productsList"), 3000);
        } else {
          setError(data.error);
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
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  <h3>Products List</h3>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="card">
                <div className="card-body">
                  <form
                    className="form form-horizontal"
                    onSubmit={addproductsListAPI}
                  >
                    <div className="form-body">
                      <div className="row">
                        <div className="form-group">
                          <div className=" col-md-2 form-check form-check-primary">
                            <input
                              className="  form-check-input"
                              type="radio"
                              id="productStatusActive"
                              name="status"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Primary"
                            >
                              Active
                            </label>
                          </div>
                          <div className="col-md-2 form-check form-check-danger">
                            <input
                              className=" form-check-input"
                              id="productStatusInactive"
                              type="radio"
                              name="status"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Danger"
                            >
                              Inactive
                            </label>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <label>Name</label>
                        </div>
                        <div className="col-md-10 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="productName"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Details</label>
                        </div>
                        <div className="col-md-10 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="details"
                            placeholder="Basic Details"
                            value={productDetail}
                            onChange={(e) => setProductDetail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-2">
                          <label>Category</label>
                        </div>
                        <div className="col-md-10 form-group">
                          <fieldset className="form-group">
                            <select
                              className="form-select"
                              id="productCategory"
                            >
                              {categoryList &&
                                categoryList.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </option>
                                ))}
                            </select>
                          </fieldset>
                        </div>
                        <div className="col-md-2">
                          <label>Business</label>
                        </div>
                        <div className="col-md-10 form-group">
                          <fieldset className="form-group">
                            <select
                              className="form-select"
                              id="productBusiness"
                            >
                              {businessesList &&
                                businessesList.map((business) => (
                                  <option
                                    key={business._id}
                                    value={business._id}
                                  >
                                    {business.name}
                                  </option>
                                ))}

                              {/* <option>IT</option>
                              <option>Blade Runner</option>
                              <option>Thor Ragnarok</option> */}
                            </select>
                          </fieldset>
                        </div>
                        <div className="col-md-2">
                          <label>Image URL</label>
                        </div>
                        <div className="col-md-10 form-group">
                          <input
                            type="url"
                            className="form-control"
                            name="image-id"
                            placeholder="Paste Image URL here..."
                            value={productImageURL}
                            onChange={(e) => setProductImageURL(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-12 d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-primary me-1 mb-1"
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            onClick={() => {
                              if (!addOrEdit) router.push("/productsList");
                            }}
                            className="btn btn-light-secondary me-1 mb-1"
                          >
                            {addOrEdit ? "Reset" : "Cancel"}
                          </button>
                        </div>
                        <div>
                          {error && (
                            <div className="alert alert-danger">{error}</div>
                          )}
                        </div>
                        <div>
                          {success && (
                            <div className="alert alert-success">{success}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
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

export default productsList;
