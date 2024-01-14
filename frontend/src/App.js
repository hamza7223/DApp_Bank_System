import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/OtherComponents/NavBar";
import Login from "./components/ManagerComponents/Login";
import AddCustomer from "./components/CustomerComponents/AddCustomer";
import AllCustomers from "./components/CustomerComponents/AllCustomers";
import EditCustomer from "./components/CustomerComponents/EditCustomers";
import HomeScreen from "./components/OtherComponents/HomeScreen";
// Customer Modules
import Withdrawal from "./components/TransactionComponents/Withdraw.js";
import Deposit from "./components/TransactionComponents/Deposit.js";
import Transfer from "./components/TransactionComponents/Transfer.js";
import Loan from "./components/TransactionComponents/Loan.js";
import View from "./components/TransactionComponents/View_Trans.js";
import Add_Account from "./components/AccountComponent/AddAccount.js";
import AddFlowWork from "./components/AccountComponent/AddFlowWork.js";
import ViewFlowWork from "./components/AccountComponent/ViewFlowWork.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <>
      <NavBar isLogin={isLogin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login loginHandler={handleLogin} />} />
        {isLogin ? (
          <>
            {localStorage.getItem("AsManager") === "true" ? (
              <>
                <Route path="/customers/all" element={<AllCustomers />} />
                <Route path="/customers/add" element={<AddCustomer />} />
                <Route path="/customers/edit/:id" element={<EditCustomer />} />
              </>
            ) : (
              <>
                <Route
                  path="/customer/account/transaction/withdraw"
                  element={<Withdrawal />}
                />
                <Route
                  path="/customer/account/transaction/deposit"
                  element={<Deposit />}
                />
                <Route
                  path="/customer/account/transaction/transfer"
                  element={<Transfer />}
                />
                <Route
                  path="/customer/account/transaction/loan"
                  element={<Loan />}
                />
                <Route
                  path="/customer/account/transaction/all"
                  element={<View />}
                />
                <Route
                  path="/customer/account/transaction/salary/add_workflow"
                  element={<AddFlowWork />}
                />
                <Route
                  path="/customer/account/transaction/salary/view_workflow"
                  element={<ViewFlowWork />}
                />
                <Route path="/customer/account/add" element={<Add_Account />} />
              </>
            )}

            <Route path="*" element={<h1>404, Page Not Found!!</h1>} />
          </>
        ) : (
          <Route path="*" element={<h1>404, Page Not Found!!</h1>} />
        )}
      </Routes>
    </>
  );
}

export default App;
