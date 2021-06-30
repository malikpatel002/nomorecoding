import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import HeaderPage from "../components/headerPage";
import useSWR from "swr";
import { useRouter } from "next/router";

let reload = true;
function productsList() {
  const [productsList, setProductsList] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(true);
  const [productName, setProductName] = useState("");
  const [productIcon, setProductIcon] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [productId, setProductId] = useState();

  const router = useRouter();
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (data && data.error) {
    router.push("/");
  }
  if (reload) getproductsListAPI();
  function getproductsListAPI() {
    reload = false;
    fetch("/api/getProductsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        get: true,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);

        setProductsList(data.productsList);
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
        productId,
        productName,
        productIcon,
        isActive: document.getElementById("productStatusActive").checked,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        // document.getElementById("addproductForm").modal("toggle");
        if (data.Success) {
          setSuccess(
            `Product ${addOrEdit ? "entered" : "updated"} successfully!!!`
          );
        } else {
          setError(data.error);
        }
        reload = true;
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
                  <div className="text-right">
                    <a
                      href="/addOrEditProduct"
                      className="btn icon icon-right btn-secondary"
                    >
                      Add Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="card">
                <div className="card-body">
                  <table className="table table-striped" id="productsList">
                    <thead>
                      <tr>
                        <th>index</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Rating</th>
                        <th>Added Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="productsList">
                      {productsList &&
                        productsList.map((product) => (
                          <tr id={product._id} key={product._id}>
                            <td>{productsList.indexOf(product) + 1}</td>
                            <td>{product.name}</td>
                            <td>
                              {product.detail
                                ? product.detail.length > 20
                                  ? product.detail.substring(0, 20) + "..."
                                  : product.detail
                                : "---"}
                            </td>
                            <td>{product.avgrating || 0}</td>
                            <td>{product.dateAdded.substring(0, 10)}</td>
                            <td>
                              {product.isActive && (
                                <span className="badge bg-success">Active</span>
                              )}
                              {!product.isActive && (
                                <span className="badge bg-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <a
                                href={"/addOrEditProduct?id=" + product._id}
                                className="btn btn-sm btn-primary"
                              >
                                <i className="bi bi-pencil-square" />
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div
                    className="modal text-left"
                    id="addProductForm"
                    tabIndex="-1"
                    aria-labelledby="myModalLabel6"
                    aria-hidden="true"
                    display="false"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title" id="myModalLabel6">
                            {addOrEdit ? "Add" : "Edit"} Product
                          </h4>
                        </div>
                        <form
                          onSubmit={(e) => {
                            addproductsListAPI(e);
                          }}
                        >
                          <div className="modal-body">
                            <label> Product: </label>
                            <div className="form-group">
                              <input
                                type="text"
                                id="productName"
                                placeholder="Input product name"
                                className="form-control"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                              />
                            </div>
                            <label>Icon: </label>
                            <div className="form-group">
                              <input
                                type="text"
                                id="productIcon"
                                placeholder="Set Icon"
                                className="form-control"
                                value={productIcon}
                                onChange={(e) => setProductIcon(e.target.value)}
                                required
                              />
                            </div>
                            <label>Status: </label>
                            <div className="form-group">
                              <div className="form-check form-check-primary">
                                <input
                                  className="form-check-input"
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
                              <div className="form-check form-check-danger">
                                <input
                                  className="form-check-input"
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
                          </div>
                          <div>
                            {error && (
                              <div className="alert alert-danger">{error}</div>
                            )}
                          </div>
                          <div>
                            {success && (
                              <div className="alert alert-success">
                                {success}
                              </div>
                            )}
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-light-secondary"
                              data-bs-dismiss="modal"
                            >
                              <i className="bx bx-x d-block d-sm-none"></i>
                              <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary ml-1"
                            >
                              <i className="bx bx-check d-block d-sm-none"></i>
                              <span className="d-none d-sm-block">
                                {addOrEdit ? "Add" : "Edit"}
                              </span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <script src="/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script> */}
      <script src="/js/bootstrap.bundle.min.js"></script>

      {/* <script src="/vendors/simple-datatables/simple-datatables.js"></script> */}
      {/* <script>
        // Simple Datatable // let table1 = document.querySelector('#table1');
        //let dataTable = new simpleDatatables.DataTable(table1);
      </script> */}
      <script src="/js/main.js"></script>
    </div>
  );
}

export default productsList;
