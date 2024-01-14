import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const NavBar = ({ isLogin, handleLogout }) => {
  const AsManager = localStorage.getItem("AsManager");
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ fontSize: "1.5vw", fontWeight: 600 }}
        >
          Meezan Bank
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ margin: "auto" }}
          >
            {/* Conditional rendering based on isLogin and AsManager */}
            {isLogin && (
              <>
                {AsManager === "true" ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link  "
                        to="/customers/all"
                        style={{
                          color: "white",
                          fontSize: "0.9vw",
                          color: "#ffffffab",
                          padding: "15px",
                        }}
                      >
                        All Customers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link   "
                        to="/customers/add"
                        style={{
                          color: "white",
                          fontSize: "0.9vw",
                          color: "#ffffffab",
                          padding: "15px",
                        }}
                      >
                        Add Customer
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {AsManager === "false" ? (
                      <>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/customer/account/add"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Create Account
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/customer/account/transaction/deposit"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Deposit Amount
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/customer/account/transaction/withdraw"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Withdraw Amount
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link  "
                            to="/customer/account/transaction/transfer"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Transfer Amount
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link  "
                            to="/customer/account/transaction/all"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            View Transactions
                          </Link>
                        </li>
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle"
                            to="#"
                            id="salaryDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Send Salary
                          </Link>
                          <ul
                            className="dropdown-menu  bg-dark"
                            aria-labelledby="salaryDropdown"
                          >
                            <li>
                              <Link
                                className="dropdown-item menu-li"
                                to="/customer/account/transaction/salary/add_workflow"
                                style={{
                                  color: "white",
                                  fontSize: "0.9vw",
                                  color: "#ffffffab",
                                  padding: "15px",
                                }}
                              >
                                Add New Workflow
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item menu-li"
                                to="/customer/account/transaction/salary/view_workflow"
                                style={{
                                  color: "white",
                                  fontSize: "0.9vw",
                                  color: "#ffffffab",
                                  padding: "15px",
                                }}
                              >
                                View WorkFlows
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link  "
                            to="/customer/account/transaction/loan"
                            style={{
                              color: "white",
                              fontSize: "0.9vw",
                              color: "#ffffffab",
                              padding: "15px",
                            }}
                          >
                            Apply for loan
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {/* Conditional rendering for Login/Logout */}
            <li className="nav-item">
              {isLogin ? (
                <Link
                  className="nav-link   "
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    fontSize: "0.9vw",
                    // color: "#ffffffab",
                    padding: "15px",
                  }}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  className="nav-link  "
                  to="/login"
                  style={{
                    color: "white",
                    fontSize: "0.9vw",
                    color: "#ffffffab",
                    padding: "15px",
                  }}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
