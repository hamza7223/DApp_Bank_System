import { callWithdraw } from "../../APIs/api.js";
import { CheckAccountID } from "../../server/axiosApi.js";
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

export default function Withdrawal() {
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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const WithdrawMoney = async () => {
    if (!validateFields()) {
      return;
    }
    let backendResponse = await CheckAccountID({
      customerID: localStorage.getItem("CustomerID"),
      account_number: Account.account_number,
    });
    if (backendResponse) {
      let receipt = await callWithdraw(Account);
      if (receipt) {
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
            <Typography variant="h4">Withdraw Money</Typography>
            <FormControl error={!!errors.account_number}>
              <Container1>Account number</Container1>
              <Container2 onChange={onValueChange} name="account_number" />
              {errors.account_number && (
                <FormHelperText>{errors.account_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                onClick={WithdrawMoney}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Withdraw
              </Button>
            </FormControl>
          </Container>
        </div>
      </div>
    </div>
  );
}
