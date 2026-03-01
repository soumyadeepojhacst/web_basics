export class TransactionService {
    constructor() {
        this.transactions = [];
        this.loadData();
    }
    // Load transactions from local storage
    loadData() {
        const storedData = localStorage.getItem("transactions");
        if (storedData) {
            this.transactions = JSON.parse(storedData);
        }
        else {
            this.transactions = [];
        }
    }
    // Save transactions to local storage
    saveData() {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }
    // Getter
    get getTransactions() {
        return this.transactions;
    }
    // Add transaction
    addTransaction(description, amount, category, date) {
        const newTransaction = {
            id: Date.now().toString(),
            description,
            amount,
            category: category,
            date
        };
        this.transactions.push(newTransaction);
        this.saveData();
    }
    // Remove transaction
    removeTransaction(id) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1)
            throw new Error("Transaction not found");
        this.transactions.splice(index, 1);
        this.saveData();
    }
    // Update transaction
    updateTransaction(id, updatedData) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1)
            throw new Error("Transaction not found");
        this.transactions[index] = Object.assign(Object.assign({}, this.transactions[index]), updatedData);
        this.saveData();
    }
    // Total balance
    getTotalBalance() {
        return this.transactions.reduce((sum, t) => sum + t.amount, 0);
    }
    // Monthly balance for any month/year
    getMonthlyBalanceBy(month, year) {
        const monthlyTransactions = this.transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });
        return monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);
    }
}
