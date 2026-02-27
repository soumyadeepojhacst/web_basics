class BankAccount {
  public accountHolder: string;
  private balance: number;
  protected accountType: string = "Standard";

  constructor(holder: string, initialBalance: number) {
    this.accountHolder = holder;
    this.balance = initialBalance;
  }

  public deposit(amount: number) {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  protected getBalance() {
    return this.balance;
  }
}

const myAccount = new BankAccount("Razi", 1000);
myAccount.deposit(500);
// myAccount.balance is not accessible here
