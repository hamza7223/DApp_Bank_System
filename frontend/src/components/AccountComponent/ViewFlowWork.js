import React, { useState } from "react";
import "../App.css";
import { CheckAccountID } from "../../server/axiosApi";

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
import { getWorkFlow } from "../../server/axiosApi";
import { ExecuteWorkFlow } from "../../APIs/api";

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
  const [showTable, setShowTable] = useState(false); // State variable to track table visibility

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

  const getAllWorkFlow = async () => {
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
        console.log("THIS IS ACCOUNT NO ", Account);
        const response = await getWorkFlow(Account);
        console.log("DAta is ", response.data[0].workflows);

        setTransactions(response.data[0].workflows);
        setShowTable(true); // Show the table when transactions are fetched successfully
        console.log(transactions);
      } catch (error) {
        console.log("Error while fetching transactions:", error);
      }
    }
  };

  const handleExecuteWorkFlow = async (transaction) => {
    const transactionData = {
      ...transaction,
      account_number: Account.account_number, // Include the account number in the transaction data
    };

    await ExecuteWorkFlow(transactionData);
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
            <Typography variant="h4">View Work Flow</Typography>
            <FormControl error={!!errors.account_number}>
              <Container1>Account number</Container1>
              <Container2 onChange={onValueChange} name="account_number" />
              {errors.account_number && (
                <FormHelperText>{errors.account_number}</FormHelperText>
              )}
            </FormControl>
            <Button
              variant="contained"
              onClick={getAllWorkFlow}
              style={{
                backgroundColor: "black",
                color: "white",
                marginTop: "10px",
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              View Work Flow
            </Button>
          </Container>
        </div>
        {showTable && ( // Conditionally render the table based on the showTable state
          <StyledTable>
            <TableHead>
              <Head>
                <TableCell align="center">WorkFlow No</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Accounts</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </Head>
            </TableHead>

            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={transaction._id}>
                  <Container3 align="center">{index + 1}</Container3>
                  <Container3 align="center">
                    {transaction.department}
                  </Container3>
                  <Container3 align="center">
                    {transaction.account_numbers.map((accNum, index) => (
                      <div key={index}>{accNum} </div>
                    ))}
                  </Container3>
                  <Container3 align="center">{transaction.amount}</Container3>
                  <Container3 align="center">{transaction.date}</Container3>
                  <Container3 align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleExecuteWorkFlow(transaction)}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Execute WorkFlow
                    </Button>
                  </Container3>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        )}
      </div>
    </div>
  );
}
