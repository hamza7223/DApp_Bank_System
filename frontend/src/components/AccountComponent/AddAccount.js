import { Create_Account } from "../../server/axiosApi";
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
  balance: "",
  account_type: "",
  username: "",
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

export default function Add_New() {
  const [Account, setAccount] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setAccount({ ...Account, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};

    if (Account.account_number.trim() === "") {
      newErrors.account_number = "Account number is required";
    }

    if (Account.account_type.trim() === "") {
      newErrors.account_type = "Account type is required";
    }

    if (Account.username.trim() === "") {
      newErrors.username = "username is required";
    }

    if (Number(Account.balance) <= 0) {
      newErrors.balance = "Amount Negative";
    } else if (String(Account.balance).trim() === "") {
      newErrors.balance = "Amount is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const Add_Acc = async () => {
    if (!validateFields()) {
      return;
    }

    let response = await Create_Account(Account);
    if (response) {
      navigate("/");
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
        }}
      >
        <div className="Submission">
          <Container>
            <Typography variant="h4">Create New Account</Typography>

            <FormControl error={!!errors.account_number}>
              <Container1>Account number</Container1>
              <Container2 onChange={onValueChange} name="account_number" />
              {errors.account_number && (
                <FormHelperText>{errors.account_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.balance}>
              <Container1>Balance</Container1>
              <Container2 onChange={onValueChange} name="balance" />
              {errors.balance && (
                <FormHelperText>{errors.balance}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.account_type}>
              <Container1>Account Type</Container1>
              <Container2 onChange={onValueChange} name="account_type" />
              {errors.account_type && (
                <FormHelperText>{errors.account_type}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.username}>
              <Container1>Username</Container1>
              <Container2 onChange={onValueChange} name="username" />
              {errors.username && (
                <FormHelperText>{errors.username}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                onClick={Add_Acc}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Create Account
              </Button>
            </FormControl>
          </Container>
        </div>
      </div>
    </div>
  );
}
