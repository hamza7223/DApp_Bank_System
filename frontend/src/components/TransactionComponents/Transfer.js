import { TransferAmount } from "../../APIs/api.js";
import {
  CheckAccountID,
  CheckAccountThroughAccountID,
} from "../../server/axiosApi.js";
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
import Swal from "sweetalert2";

const defaultValue = {
  sender_account_number: "",
  recevier_account_number: "",
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

    if (Transaction.sender_account_number.trim() === "") {
      newErrors.sender_account_number = "Sender Account number is required";
    }

    if (Transaction.recevier_account_number.trim() === "") {
      newErrors.recevier_account_number = "Recevier Account number is required";
    }

    if (String(Transaction.amount).trim() === "") {
      newErrors.amount = "Amount is required";
    } else if (Number(Transaction.amount) <= 0) {
      newErrors.amount = "Amount Negative";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const Transfer_M = async () => {
    if (!validateFields()) {
      return;
    }
    let backendResponse = await CheckAccountID({
      customerID: localStorage.getItem("CustomerID"),
      account_number: Transaction.sender_account_number,
    });
    if (backendResponse) {
      let Res = await CheckAccountThroughAccountID({
        account_number: Transaction.recevier_account_number,
      });
      if (Res) {
        if (
          Transaction.sender_account_number !==
          Transaction.recevier_account_number
        ) {
          let response = await TransferAmount(Transaction);
          if (response) {
            navigate("/");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "error",
            text: "Using Same account for Sender and Receiver is Prohibited!!",
          });
        }
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
            <Typography variant="h4">Transfer Amount</Typography>
            <FormControl error={!!errors.sender_account_number}>
              <Container1>Sender Account number</Container1>
              <Container2
                onChange={onValueChange}
                name="sender_account_number"
              />
              {errors.sender_account_number && (
                <FormHelperText>{errors.sender_account_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.recevier_account_number}>
              <Container1>Receiver Account number</Container1>
              <Container2
                onChange={onValueChange}
                name="recevier_account_number"
              />
              {errors.recevier_account_number && (
                <FormHelperText>
                  {errors.recevier_account_number}
                </FormHelperText>
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
                onClick={Transfer_M}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Transfer
              </Button>
            </FormControl>
          </Container>
        </div>
      </div>
    </div>
  );
}
