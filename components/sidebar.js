const sideBar = () => {
  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <a href="/" className="page-heading">
                <img src="/images/logo/logo.png" alt="Logo" />
                NoMoreCoding
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-item  ">
              <a href="/dashboard" className="sidebar-link">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item  ">
              <a href="/userList" className="sidebar-link">
                <i className="bi bi-person"></i>
                <span>User List</span>
              </a>
            </li>
            <li className="sidebar-item  ">
              <a href="/categoryList" className="sidebar-link">
                <i className="bi bi-person"></i>
                <span>Category List</span>
              </a>
            </li>
            <li className="sidebar-item  ">
              <a href="/productsList" className="sidebar-link">
                <i className="bi bi-person"></i>
                <span>Product List</span>
              </a>
            </li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x"></i>
        </button>
      </div>
    </div>
  );
};

export default sideBar;
