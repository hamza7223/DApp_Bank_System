import { Deposit_Money } from "../../APIs/api";
import { CheckAccountID } from "../../server/axiosApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
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

export default function Transfer() {
  const [Transaction, setTransaction] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setTransaction({ ...Transaction, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};

    if (Transaction.account_number.trim() === "") {
      newErrors.account_number = "Account number is required";
    }

    if (String(Transaction.amount).trim() === "") {
      newErrors.amount = "Amount is required";
    } else if (Number(Transaction.amount) <= 0) {
      newErrors.amount = "Amount Negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const Deposit_M = async () => {
    if (!validateFields()) {
      return;
    }

    let backendResponse = await CheckAccountID({
      customerID: localStorage.getItem("CustomerID"),
      account_number: Transaction.account_number,
    });
    if (backendResponse) {
      console.log(backendResponse.data);
      let response = await Deposit_Money(Transaction);
      if (response) {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "91.8vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="Submission">
          <Container>
            <Typography variant="h4">Deposit Money</Typography>
            <FormControl error={!!errors.account_number}>
              <Container1>Account number</Container1>
              <Container2 onChange={onValueChange} name="account_number" />
              {errors.account_number && (
                <FormHelperText>{errors.account_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.amount}>
              <Container1>Amount</Container1>
              <Container2 onChange={onValueChange} name="amount" />
              {errors.amount && (
                <FormHelperText>{errors.amount}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                onClick={Deposit_M}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Deposit
              </Button>
            </FormControl>
          </Container>
        </div>
      </div>
    </div>
  );
}
