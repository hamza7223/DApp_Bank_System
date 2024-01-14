import axios from "axios";
import Web3 from "web3";
import ABI from "../config"; 
import Swal from "sweetalert2";

//const contractAddress = "0x92F0Aaa2386c241ee3f66726B362dD938D7E8680"; 
//const contractAddress = "0x04fe954D789bEac4310Aa306F0e64769898bA7D4"; 
const contractAddress = "0xf52Af36cfDCFE05f3403bE1d220eaf743786cd56"; 


//deposit ammount
export const Deposit_Money = async (data) => {
  try {
    // Connect to Ganache
    const web3 = new Web3("http://localhost:7545"); // Default Ganache RPC server

    const contract = new web3.eth.Contract(ABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    const depositer = accounts.find(account => account.toLowerCase() === data.account_number.toLowerCase());

    if (!depositer) {
      throw new Error('depositer account not found in the available accounts');
    }
    console.log(depositer);
    const transactionParameters = {
      from: depositer, 
      value: web3.utils.toWei(data.amount.toString(), 'ether'), // Convert amount to wei
      gas: 3000000
    };
    // Call the deposit function of the contract
    const response = await contract.methods.deposit().send(transactionParameters);
    console.log(response);

    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
    console.log(error.message);
  }
};




export const callWithdraw = async (data) => {
  // Initialize Web3
  try {
    const web3 = new Web3("http://localhost:7545");

  // Set up the contract
  const contract = new web3.eth.Contract(ABI, contractAddress);

  // Get accounts from the provider
  const accounts = await web3.eth.getAccounts();
  
  if (accounts.length === 0) throw new Error("No accounts found. Make sure Ethereum client is configured correctly.");

  const fromAccount = accounts.find(account => account.toLowerCase() === data.account_number.toLowerCase());

    if (!fromAccount) {
      throw new Error('Withdrawal account not found in the available accounts');
    }
    const transactionParameters = {
      from: fromAccount, 
      gas: 3000000
    };
    console.log(fromAccount);
  // Call the withdraw function
  contract.methods.withdraw().send(transactionParameters)
      .then(function(receipt){
          // Check if the NoDeposit event was emitted in the transaction
        if (receipt.events.NoDeposit) {
            // Handle the NoDeposit event
            Swal.fire({
                icon: "error",
                title: "Withdrawal Error",
                text: "No deposit found for withdrawal.",
            });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Cash has been withdrawn to your wallet`,
          });
        }
      })
      .catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
        console.log(error.message);
      });
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
    console.log(error.message);
  }
  
}


// //Transfer Amount
// export const TransferAmount1 = async (data) => {
//   try {
//     const parsedData = {
//       ...data,
//       amount: parseInt(data.amount, 10), // Parse amount to integer
//     };
//     console.log(parsedData);
//     return await axios.post(
//       //use url over here
//       ``,
//       parsedData
//     );
//   } catch (error) {
//     console.log(`Error while calling transfer amount API: `, error);
//   }
// };



export const TransferAmount = async (transactionData) => {
  try {
    // Initialize web3 with Ganache
    const web3 = new Web3('http://localhost:7545');  // Replace with your Ganache instance

    // Create contract instance
    const contract = new web3.eth.Contract(ABI, contractAddress);

    // Get accounts from web3 (In Ganache, these are your test accounts)
    const accounts = await web3.eth.getAccounts();

    const senderAccount = accounts.find(account => account.toLowerCase() === transactionData.sender_account_number.toLowerCase());

    if (!senderAccount) {
      throw new Error('sender account not found in the available accounts');
    }

    // Call the transfer function of the contract
    const response = await contract.methods.transferEther(
        transactionData.recevier_account_number,  // Receiver's address
        web3.utils.toWei(transactionData.amount.toString(), 'ether'),  // Convert amount to Wei
    ).send({ from: senderAccount , gas: 6000000 });

    // Check for InsufficientBalance event in the receipt
    if (response.events && response.events.InsufficientBalance) {
      Swal.fire({
        icon: "error",
        title: "Transfer Error",
        text: "Insufficient balance for the transfer.",
      });
    } else {
      console.log(response);
      return response;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
    console.log(error.message);
  }
};







// //Apply for loan
// export const ApplyForLoan = async (data) => {
//   try {
//     const parsedData = {
//       ...data,
//       amount: parseInt(data.amount, 10), // Parse amount to integer
//       collateral: parseInt(data.collateral, 10)

//     };
//     console.log(parsedData);
//     return await axios.post(
//       //use url over here
//       `/url/`,
//       parsedData
//     );
//   } catch (error) {
//     console.log(`Error while calling loan amount API: `, error);
//   }
// };




export const ApplyForLoan = async (data) => {
  try {
    // Initialize Web3 and contract
    const web3 = new Web3("http://localhost:7545");
    const contract = new web3.eth.Contract(ABI, contractAddress);

    const accounts = await web3.eth.getAccounts();
    const borrowerAccount = accounts.find(account => account.toLowerCase() === data.account_number.toLowerCase());

    if (!borrowerAccount) {
      throw new Error('Borrower account not found in the available accounts');
    }

    // Convert loan amount and collateral from Ether to Wei
    const loanAmountWei = web3.utils.toWei(data.amount.toString(), 'ether');
    const collateralWei = web3.utils.toWei(data.collateral.toString(), 'ether');


    // Define transaction parameters
    const transactionParameters = {
      from: borrowerAccount,
      value: collateralWei, // Collateral in Wei
      gas: 6000000 // Adjust gas limit as needed
    };

    // Call the borrow function of the smart contract
    const tx = await contract.methods.borrow(loanAmountWei).send(transactionParameters).then((message)=>{
      console.log('Transaction successful:', message);
      return message
    }).catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "loan has already been taken!",
      });
    })
    return tx;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};






// Function to transfer Ether to multiple accounts
  export const ExecuteWorkFlow = async (data) => {
    console.log(data);
    const amount = data.amount
    const accounts = data.account_numbers;
  try {
    // Connect to Ganache
    const web3 = new Web3("http://localhost:7545");

    // Set up the contract
    const contract = new web3.eth.Contract(ABI, contractAddress);

    // Get accounts from Ganache
    const ganacheAccounts = await web3.eth.getAccounts();
    console.log(data.account_number);
    // Use one of the Ganache accounts as the sender
    const senderAccount = ganacheAccounts.find(account => account.toLowerCase() === data.account_number.toLowerCase());

    if (!senderAccount) {
      throw new Error('sender account not found in the available accounts');
    }
    // Convert amount to Wei
    const amountWei = web3.utils.toWei(amount.toString(), 'ether');

    // Call the smart contract function
    const response = await contract.methods.transferToMultipleAccounts(accounts, amountWei).send({
      from: senderAccount,
      gas: 6000000 // Adjust gas limit as needed
    });
    
    // Check for InsufficientBalance event in the receipt
    if (response.events && response.events.InsufficientFunds) {
      Swal.fire({
        icon: "error",
        title: "Transfer Error",
        text: "Insufficient balance for the transfer.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Department Name: ${data.department} `,
      });
      console.log(response);
      return response;
    }
    console.log('Transaction successful:', response);
    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
    console.error('Error while calling transferToMultipleAccounts function:', error);
  }
};



export const gettransactions = async (userAddress) => {
  console.log(userAddress);
  try {
    // Initialize Web3 and the contract
    const web3 = new Web3("http://localhost:7545"); // Replace with your Ethereum client URL
    const contract = new web3.eth.Contract(ABI, contractAddress);

    // Call the getTransactions function from the contract
    const transactions = await contract.methods.getTransactions(userAddress.account_number).call();

    console.log('Transactions:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
