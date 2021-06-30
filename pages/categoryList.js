import React, { useContext, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar";
import useSWR from "swr";
import { useRouter } from "next/router";
import HeaderPage from "../components/headerPage";

let index = 1;
function categoryList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categoryId, setCategoryId] = useState();

  const router = useRouter();
  const { data } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });

  if (data && data.error) {
    router.push("/");
  }

  if (index == 1) getCategoryListAPI();
  function getCategoryListAPI() {
    fetch("/api/getCategoryList", {
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
        index = 0;
        setCategoriesList(data.categoryList);
      });
  }
  function addCategoryListAPI(e) {
    setSuccess("");
    setError("");
    e.preventDefault();
    const date = new Date().toISOString();

    fetch("/api/getCategoryList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        get: false,
        addOrEdit,
        categoryId,
        categoryName,
        categoryIcon,
        date,
        isActive: document.getElementById("categoryStatusActive").checked,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        // document.getElementById("addCategoryForm").modal("toggle");
        if (data.Success) {
          setSuccess(
            `Category ${addOrEdit ? "entered" : "updated"} successfully!!!`
          );
          getCategoryListAPI();
        } else {
          setError(data.error);
        }
      });
  }

  const editCategory = (e) => {
    setSuccess("");
    setError("");
    setAddOrEdit(false);
    let id = e.target.parentNode.parentNode.id;
    let rowId = parseInt(
      e.target.parentNode.parentNode.childNodes[0].outerText - 1
    );
    if (typeof rowId === "number") {
      // console.log(typeof rowId);
      setCategoryId(id);
      setCategoryName(categoriesList[rowId].name);
      setCategoryIcon(categoriesList[rowId].icon);
      if (categoriesList[rowId].isActive)
        document.getElementById("categoryStatusActive").checked = true;
      else document.getElementById("categoryStatusInactive").checked = true;
    } else {
      alert("Please select again!!!!");
    }
    // alert("Name: " + name + "\nAge: " + age);
  };

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
                  <h3>Category List</h3>
                  <div className="text-right">
                    <button
                      onClick={() => {
                        console.log("pressed add category");
                        document.getElementById("manipulateCategory").reset();
                        setAddOrEdit(true);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#addCategoryForm"
                      className="btn icon icon-right btn-secondary"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="card">
                <div className="card-body">
                  <table className="table table-striped" id="categoryList">
                    <thead>
                      <tr>
                        <th>index</th>
                        <th>Name</th>
                        <th>Icon</th>
                        <th>Added Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="categoryList">
                      {categoriesList &&
                        categoriesList.map((category) => (
                          <tr id={category._id} key={category._id}>
                            <td>{categoriesList.indexOf(category) + 1}</td>
                            <td>{category.name}</td>
                            <td>{category.icon}</td>
                            <td>{category.dateAdded.substring(0, 10)}</td>
                            <td>
                              {category.isActive && (
                                <span className="badge bg-success">Active</span>
                              )}
                              {!category.isActive && (
                                <span className="badge bg-danger">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={(e) => {
                                  editCategory(e);
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#addCategoryForm"
                                className="btn btn-sm btn-primary"
                              >
                                <i className="bi bi-pencil-square" />
                                Edit
                              </button>
                            </td>
                          </tr>
                          // <categoryRow category={category} />
                        ))}
                    </tbody>
                  </table>
                  <div
                    className="modal text-left"
                    id="addCategoryForm"
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
                            {addOrEdit ? "Add" : "Edit"} Category
                          </h4>
                          {/* <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i data-feather="x"></i>
                          </button> */}
                        </div>
                        <form
                          onSubmit={(e) => {
                            addCategoryListAPI(e);
                          }}
                          id="manipulateCategory"
                        >
                          <div className="modal-body">
                            <label> Category: </label>
                            <div className="form-group">
                              <input
                                type="text"
                                id="categoryName"
                                placeholder="Input category name"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) =>
                                  setCategoryName(e.target.value)
                                }
                                required
                              />
                            </div>
                            <label>Icon: </label>
                            <div className="form-group">
                              <input
                                type="text"
                                id="categoryIcon"
                                placeholder="Set Icon"
                                className="form-control"
                                value={categoryIcon}
                                onChange={(e) =>
                                  setCategoryIcon(e.target.value)
                                }
                                required
                              />
                            </div>
                            <label>Status: </label>
                            <div className="form-group">
                              <div className="form-check form-check-primary">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="categoryStatusActive"
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
                                  id="categoryStatusInactive"
                                  type="radio"
                                  name="status"
                                  // onClick={(e) => {
                                  //   // console.log(isActive + "onClick");
                                  //   if (e.target.checked) setIsActive(false);
                                  //   console.log("unchecked :" + isActive);
                                  // }}
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
                              // data-bs-dismiss="modal"
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

      <script src="/js/main.js"></script>
    </div>
  );
}

export default categoryList;
