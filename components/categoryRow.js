import React, { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext.js";

export default function Category({ category }) {
  return (
    <tr id={category.id}>
      <td>category.name</td>
      <td>category.icon</td>
      <td>category.dateAdded</td>
      <td>
        {category.isActive && <span className="badge bg-success">Active</span>}
        {!category.isActive && (
          <span className="badge bg-danger">Inactive</span>
        )}
      </td>
      <td>
        <button
          //   onClick={(e) => {
          //     editCategory(e);
          //   }}
          data-bs-toggle="modal"
          data-bs-target="#inlineForm"
          className="btn btn-sm btn-primary"
        >
          <i className="bi bi-pencil-square" />
          Edit
        </button>
      </td>
    </tr>
  );
}
