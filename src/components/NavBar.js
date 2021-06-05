import Link from "next/link";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { useContext } from "react";
import Cookie from "js-cookie";

const NavBar = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api / auth / accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out." } });
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Next-Mongo-Ecom</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item" style={{ marginRight: "20px" }}>
              <Link href="/cart">
                <a className={"nav-link" + isActive("/cart")}>
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden="true"
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: "2px 4px",
                        backgroundColor: "rgba(255,69,0, 0.8)",
                        borderRadius: "50%",
                        top: "-10px",
                        left: "10px",
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </i>{" "}
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Cart
                  </span>
                </a>
              </Link>
            </li>

            {Object.keys(auth).length === 0 ? (
              <li className="nav-item">
                <Link href="/signin">
                  <a className={"nav-link" + isActive("/signin")}>
                    <i className="fas fa-sign-in-alt" aria-hidden="true"></i>{" "}
                    Sign in
                  </a>
                </Link>
              </li>
            ) : (
              <li>
                <DropdownButton
                  id="dropdown-item-button"
                  title={auth?.user?.name}
                  variant="secondary"
                >
                  <Link href="/profile">
                    <Dropdown.Item as="button">Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
