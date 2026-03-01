import { Transaction } from "../model/transaction.js";

export class TransactionService {
    private transactions: Transaction[] = [];

    constructor() {
        this.loadData();
    }

    // Load transactions from local storage
    loadData(): void {
        const storedData = localStorage.getItem("transactions");
        if (storedData) {
            this.transactions = JSON.parse(storedData);
        } else {
            this.transactions = [];
        }
    }

    // Save transactions to local storage
    saveData(): void {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }

    // Getter
    get getTransactions(): Transaction[] {
        return this.transactions;
    }

    // Add transaction
    addTransaction(description: string, amount: number, category: string, date: string): void {
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            description,
            amount,
            category: category as any,
            date
        };
        this.transactions.push(newTransaction);
        this.saveData();
    }

    // Remove transaction
    removeTransaction(id: string): void {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Transaction not found");
        this.transactions.splice(index, 1);
        this.saveData();
    }

    // Update transaction
    updateTransaction(id: string, updatedData: Partial<Transaction>): void {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Transaction not found");

        this.transactions[index] = {
            ...this.transactions[index],
            ...updatedData
        };
        this.saveData();
    }

    // Total balance
    getTotalBalance(): number {
        return this.transactions.reduce((sum, t) => sum + t.amount, 0);
    }

    // Monthly balance for any month/year
    getMonthlyBalanceBy(month: number, year: number): number {
        const monthlyTransactions = this.transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });

        return monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);
    }
}