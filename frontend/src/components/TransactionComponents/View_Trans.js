import React, { useState } from "react";
import Web3 from "web3"; // Import Web3 for conversions
import { CheckAccountID } from "../../server/axiosApi";
import "../App.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  InputLabel,
  Input,
  FormGroup,
  FormControl,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { gettransactions } from "../../APIs/api";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
  max-height: 300px;
  min-height: 100px;
  overflow-y: auto;
`;

const Head = styled(TableRow)`
  background: black;
  & > th {
    color: #fff;
    font-size: 20px;
    border-bottom: 1px solid black;
  }
`;

const Container1 = styled(InputLabel)`
  color: aliceblue;
`;

const Container2 = styled(Input)`
  color: aliceblue;
`;

const Container3 = styled(TableCell)`
  color: aliceblue;
`;

const Container = styled(FormGroup)`
  padding: 5%;
  text-align: center;
  & > div {
    margin-top: 20px;
    color: white;
  }
`;

export default function View_Transac() {
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState({});
  const [Account, setAccount] = useState({ account_number: "" });
  const [showTable, setShowTable] = useState(false);

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

  const getAllTransactions = async () => {
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    let backendResponse = await CheckAccountID({
      customerID: localStorage.getItem("CustomerID"),
      account_number: Account.account_number,
    });
    if (backendResponse) {
      try {
        const response = await gettransactions(Account);
        const formattedTransactions = response.map((transaction) => ({
          ...transaction,
          amount: Web3.utils.fromWei(transaction.amount.toString(), "ether"), // Convert from BigInt to string before using fromWei
          date: new Date(Number(transaction.timestamp) * 1000).toLocaleString(), // Convert BigInt timestamp to Number
        }));

        setTransactions(formattedTransactions);
        setShowTable(true);
      } catch (error) {
        console.log("Error while fetching transactions:", error);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "91.8vh",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div style={{ paddingTop: "3vw", width: "100%" }}>
        <div className="Submission" style={{ margin: "0 auto" }}>
          <Container>
            <Typography variant="h4">View Transactions</Typography>
            <FormControl error={!!errors.account_number}>
              <Container1>Account number</Container1>
              <Container2 onChange={onValueChange} name="account_number" />
              {errors.account_number && (
                <FormHelperText>{errors.account_number}</FormHelperText>
              )}
            </FormControl>
            <Button
              variant="contained"
              onClick={getAllTransactions}
              style={{
                backgroundColor: "black",
                color: "white",
                marginTop: "10px",
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              View Transactions
            </Button>
          </Container>
        </div>
        {showTable && (
          <StyledTable>
            <TableHead>
              <Head>
                <TableCell align="center">Sender Account Number</TableCell>
                <TableCell align="center">Receiver Account Number</TableCell>
                <TableCell align="center">Amount (ETH)</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Date</TableCell>
              </Head>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <Container3 align="center">{transaction.from}</Container3>
                  <Container3 align="center">{transaction.to}</Container3>
                  <Container3 align="center">{transaction.amount}</Container3>
                  <Container3 align="center">
                    {transaction.transactionType}
                  </Container3>
                  <Container3 align="center">{transaction.date}</Container3>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        )}
      </div>
    </div>
  );
}
