import cookie from "js-cookie";
import { useRouter } from "next/router";

const HeaderPage = () => {
  const router = useRouter();
  return (
    <header className="mb-3">
      <nav className="navbar navbar-expand navbar-light ">
        <div className="container-fluid">
          <a href="#" className="burger-btn d-block">
            <i className="bi bi-justify fs-3"></i>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="dropdown ms-auto">
              <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="user-menu d-flex">
                  <div className="user-name text-end me-3">
                    <h6 className="mb-0 text-gray-600">John Ducky</h6>
                    <p className="mb-0 text-sm text-gray-600">Administrator</p>
                  </div>
                  <div className="user-img d-flex align-items-center">
                    <div className="avatar avatar-md">
                      <img src="/images/faces/1.jpg" />
                    </div>
                  </div>
                </div>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <h6 className="dropdown-header">Hello, John!</h6>
                </li>
                <li>
                  <a className="dropdown-item" href="profile">
                    <i className="icon-mid bi bi-person me-2"></i> My Profile
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      cookie.remove("token");
                      router.push("/");
                    }}
                  >
                    <i className="icon-mid bi bi-box-arrow-left me-2"></i>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPage;
