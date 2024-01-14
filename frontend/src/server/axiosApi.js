import axios from "axios";
import Swal from "sweetalert2";
import "../components/App.css";
const URL = "http://localhost:3003";
// will add user
export const addCustomer = async (data) => {
  try {
    return await axios.post(`${URL}/customers/add`, data);
  } catch (error) {
    if (error.response.data.includes("username")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username already exists!!",
      });
    }
    if (error.response.data.includes("password")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password already exists!!",
      });
    }
    if (error.response.data.includes("cnic_number")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "CNIC Number already exists!!",
      });
    }
  }
};

// will display all user
export const getCustomers = async () => {
  try {
    return await axios.get(`${URL}/customers/all`);
  } catch (error) {
    console.log(`Error while getting the customers api`, error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

export const getCustomer = async (id) => {
  try {
    return await axios.get(`${URL}/customers/${id}`);
  } catch (error) {
    console.log(`Error while getting the customer detail api`, error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

export const editCustomer = async (user, id) => {
  try {
    return await axios.put(`${URL}/customers/${id}`, user);
  } catch (error) {
    if (error.response.data.includes("username")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Username already exists!!",
      });
    }
    if (error.response.data.includes("password")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password already exists!!",
      });
    }
    if (error.response.data.includes("cnic_number")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cnic Number already exists!!!",
      });
    }
  }
};

export const deleteCustomer = async (id) => {
  try {
    return await axios.delete(`${URL}/customers/${id}`);
  } catch (error) {
    console.log(`Error while deleting the customer detail api`, error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

export const signin = async (data) => {
  try {
    return await axios.post(`${URL}/managers/signin`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Username and Password do not exist!",
    });
  }
};

export const customerSignin = async (data) => {
  try {
    return await axios.post(`${URL}/customers/signin`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Username and Password do not exist!",
    });
  }
};

//Withdraw Amount
export const Withdraw_Money = async (data) => {
  try {
    console.log("DATD DFROM FRONTEND IS ", data);
    return await axios.post(
      `${URL}/customer/account/transaction/withdraw`,
      data
    );
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};

export const getWorkFlow = async (data) => {
  try {
    console.log("innnn ", data);

    return await axios.post(
      `${URL}/customer/account/autoSalary/accountNo`,
      data
    );
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};

//deposit Amount
export const Deposit_Money = async (data) => {
  try {
    const parsedData = {
      ...data,
      amount: parseInt(data.amount, 10), // Parse amount to integer
    };
    console.log(parsedData);
    return await axios.post(
      `${URL}/customer/account/transaction/deposit`,
      parsedData
    );
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};

//Create account Amount
export const Create_Account = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${URL}/customer/account/add`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};
//Create work flow for particular Account
export const AddNewFlowWork = async (data) => {
  try {
    return await axios.post(`${URL}/customer/account/autoSalary/add`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};

export const CheckAccountID = async (data) => {
  try {
    return await axios.post(`${URL}/customer/account/checkAccountNumber`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};

export const CheckAccountThroughAccountID = async (data) => {
  try {
    return await axios.post(`${URL}/customer/account/get`, data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response.data.message || error.response.data.error,
    });
  }
};
