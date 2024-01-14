// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract bankingSystem {

        struct Transaction {
        address from;
        address to;
        uint amount;
        string transactionType;
        uint timestamp;
    }

    mapping(address => bool) public isDeposited;
    mapping(address => uint) public Balance;
    mapping(address => uint) public loan;
    mapping(address => bool) public isBorrowed;
    mapping(address => Transaction[]) private transactions;
    mapping(address => uint) public collateral;
    mapping(address => uint) public TimeOfDeposit;




    // Events
    event TransferMade(address indexed from, address indexed to, uint amount);
    event WithdrawalMade(address indexed user, uint amount);
    event DepositMade(address indexed user, uint amount);
    // Event for Already Active Deposit
    event DepositAlreadyActive(address indexed user,  bool success);
    // Event for No Deposit Scenario
    event NoDeposit(address indexed user,  bool success);
    // Event for Insufficient Balance
    event InsufficientBalance(address indexed user, uint requestedAmount, uint availableBalance,  bool success);
    // Event for Loan Attempt with Boolean Flag
    event LoanAttempt(address indexed user, uint amount, bool success);
    // Events for loan payoff disapproval
    event NoActiveLoan(address indexed user);
    event InsufficientBalanceToPayOff(address indexed user, uint loanBalance, uint userBalance);
    // Event for Insufficient Funds for transfering to multiple accounts
    event InsufficientFunds(address indexed user, uint totalRequired, uint userBalance);



    // Deposit function
    function deposit() payable public {

        require(isDeposited[msg.sender] == false, 'Error, deposit already active');
        require(msg.value >= 1e16, 'Error, deposit must be >= 0.01 ETH');
        Balance[msg.sender] += msg.value;
        TimeOfDeposit[msg.sender] = TimeOfDeposit[msg.sender] + block.timestamp;
        isDeposited[msg.sender] = true;
        emit DepositMade(msg.sender, msg.value);
        recordTransaction(msg.sender, address(this), msg.value, "deposit");

    }



        
    //  Withdraw function
    function withdraw() public {
        // Check if the user has made a deposit
        if (!isDeposited[msg.sender]) {
            emit NoDeposit(msg.sender, false);
            return; // Return early if the user has not made any deposit
        }

        require(isDeposited[msg.sender] == true, ' no previous deposits has been made');
        uint userBalance = Balance[msg.sender]; // For event

        uint depositTime = block.timestamp - TimeOfDeposit[msg.sender];
        uint interestPerSecond = 31679025 * (Balance[msg.sender] / 1e16);
        uint interest = interestPerSecond * depositTime;

        // Add interest to the user's balance before transfer
        uint totalAmount = Balance[msg.sender] + interest; 

        msg.sender.transfer(totalAmount); 

        TimeOfDeposit[msg.sender] = 0;
        Balance[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit WithdrawalMade(msg.sender, totalAmount); // Existing event
        recordTransaction(address(this), msg.sender, totalAmount, "withdrawal");

    }


    // Transfer Ether function
    function transferEther(address payable _to, uint _amount) public {
        // Check if the user has enough balance to transfer
        if (Balance[msg.sender] < _amount) {
            emit InsufficientBalance(msg.sender, _amount, Balance[msg.sender], false);
            return; // Return early if the user's balance is insufficient
        }
        require(Balance[msg.sender] >= _amount, "Insufficient balance");
        Balance[msg.sender] -= _amount;
        _to.transfer(_amount);
        emit TransferMade(msg.sender, _to, _amount);
        recordTransaction(msg.sender, _to, _amount, "transfer");

    }



    // Borrow function
    function borrow(uint _loanAmount) payable public {
        // if (isBorrowed[msg.sender]) {
        //     emit LoanAttempt(msg.sender, _loanAmount, false); // Emit event with false for already existing loan
        //     return; // Return early if the user already has a loan
        // }

        require(isBorrowed[msg.sender] == false, "Loan already taken");
        collateral[msg.sender] += msg.value;
        loan[msg.sender] += _loanAmount;

        // If the loan is successful:
        isBorrowed[msg.sender] = true;
        emit LoanAttempt(msg.sender, _loanAmount, true); // Emit event with true for successful loan
        recordTransaction(msg.sender, address(this), _loanAmount, "borrow");

    }





    // Function to transfer Ether to multiple accounts
    function transferToMultipleAccounts(address[] memory _accounts, uint _amount) public {
        uint totalAmount = _amount * _accounts.length;
        
        // Check if user has enough balance to transfer
        if (Balance[msg.sender] < totalAmount) {
            emit InsufficientFunds(msg.sender, totalAmount, Balance[msg.sender]);
            return; // Return early if insufficient funds
        }

        require(Balance[msg.sender] >= totalAmount, "Insufficient balance");

        for (uint i = 0; i < _accounts.length; i++) {
            Balance[msg.sender] -= _amount;
            (bool sent, ) = _accounts[i].call.value(_amount)("");
            require(sent, "Failed to send Ether");
            recordTransaction(msg.sender, _accounts[i], _amount, "workflow transfer");

        }
    }

    // Function to record a transaction
    function recordTransaction(address _from, address _to, uint _amount, string memory _transactionType) private {
        Transaction memory newTransaction = Transaction({
            from: _from,
            to: _to,
            amount: _amount,
            transactionType: _transactionType,
            timestamp: block.timestamp
        });

        transactions[_from].push(newTransaction);
        if (_from != _to) {
            transactions[_to].push(newTransaction);
        }
    }

    // Getter function to view transactions of a specific user
    function getTransactions(address _user) public view returns (Transaction[] memory) {
        return transactions[_user];
    }
}







