import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddNewFlowWork, CheckAccountID } from "../../server/axiosApi";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  FormHelperText,
} from "@mui/material";

const defaultValue = {
  account_number: "",
  department: "",
  numberOfAccounts: 0,
  accountNumbers: [],
  amount: 0,
};

const Container = styled(FormGroup)`
  padding: 5%;
  text-align: center;

  & > div {
    margin-top: 20px;
    color: white;
  }
`;

const Container1 = styled(InputLabel)`
  color: aliceblue;
`;

const Container2 = styled(Input)`
  color: aliceblue;
`;

export default function AddFlowWork() {
  const [formData, setFormData] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onAccountNumberChange = (index, value) => {
    const updatedAccountNumbers = [...formData.accountNumbers];
    updatedAccountNumbers[index] = value;
    setFormData({ ...formData, accountNumbers: updatedAccountNumbers });
  };

  const validateFields = () => {
    const newErrors = {};

    if (formData.department.trim() === "") {
      newErrors.department = "Department is required";
    }
    if (formData.account_number.trim() === "") {
      newErrors.account_number = "Account number is required";
    }
    if (formData.numberOfAccounts <= 0) {
      newErrors.numberOfAccounts = "Number of accounts must be greater than 0";
    }
    formData.accountNumbers.forEach((accountNumber, index) => {
      if (!accountNumber.trim()) {
        newErrors[`accountNumbers_${index}`] = "Account number is required";
      }
    });
    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderAdditionalAccountInputs = () => {
    const inputs = [];
    for (let i = 0; i < formData.numberOfAccounts; i++) {
      inputs.push(
        <FormControl key={i} error={!!errors[`accountNumbers_${i}`]}>
          <Container1>Account Number {i + 1}</Container1>
          <Container2
            onChange={(e) => onAccountNumberChange(i, e.target.value)}
            name={`accountNumbers_${i}`}
            value={formData.accountNumbers[i] || ""}
          />
          {errors[`accountNumbers_${i}`] && (
            <FormHelperText>{errors[`accountNumbers_${i}`]}</FormHelperText>
          )}
        </FormControl>
      );
    }
    return inputs;
  };

  const handleAddNow = async () => {
    if (!validateFields()) {
      console.log("Validation failed");
      return;
    }

    let backendResponse = await CheckAccountID({
      customerID: localStorage.getItem("CustomerID"),
      account_number: formData.account_number,
    });
    if (backendResponse) {
      try {
        await AddNewFlowWork(formData);
        navigate("/");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "120vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      <div className="Submission">
        <Container>
          <Typography variant="h4">Add New WorkFlow</Typography>
          <FormControl error={!!errors.account_number}>
            <Container1>Account Number</Container1>
            <Container2
              onChange={onValueChange}
              name="account_number"
              value={formData.account_number}
            />
            {errors.account_number && (
              <FormHelperText>{errors.account_number}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.department}>
            <Container1>Department</Container1>
            <Container2
              onChange={onValueChange}
              name="department"
              value={formData.department}
            />
            {errors.department && (
              <FormHelperText>{errors.department}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.numberOfAccounts}>
            <Container1>Number of Accounts</Container1>
            <Container2
              onChange={onValueChange}
              name="numberOfAccounts"
              type="number"
              value={formData.numberOfAccounts}
            />
            {errors.numberOfAccounts && (
              <FormHelperText>{errors.numberOfAccounts}</FormHelperText>
            )}
          </FormControl>
          {renderAdditionalAccountInputs()}
          <FormControl error={!!errors.amount}>
            <Container1>Amount</Container1>
            <Container2
              onChange={onValueChange}
              name="amount"
              type="number"
              value={formData.amount}
            />
            {errors.amount && <FormHelperText>{errors.amount}</FormHelperText>}
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              onClick={handleAddNow}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Add Now
            </Button>
          </FormControl>
        </Container>
      </div>
    </div>
  );
}
