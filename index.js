class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }

    return this.isAllowed();
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return 0 - this.amount;
  }

  isAllowed() {
    return this.account.balance > this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((bal, t) => {
      return bal + t.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Deposit(120, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Transactions:', myAccount.transactions);
console.log('Balance: ', myAccount.balance);

const t4 = new Withdrawal(5, myAccount);
t4.commit();
console.log('Transaction 4', t4);

console.log('Transactions:', myAccount.transactions);
console.log('Balance:', myAccount.balance);
