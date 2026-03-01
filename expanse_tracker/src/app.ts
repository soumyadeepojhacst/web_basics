import { TransactionService } from "./service/transactionService.js";
import { Category } from "./model/transaction.js";

const service = new TransactionService();

// Form elements
const form = document.getElementById("transactionForm") as HTMLFormElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const dateInput = document.getElementById("date") as HTMLInputElement;

// Display elements
const transactionList = document.getElementById("transactionList") as HTMLUListElement;
const totalBalance = document.getElementById("totalBalance") as HTMLElement;
const monthlyBalance = document.getElementById("monthlyBalance") as HTMLElement;

// Month/year filter
const monthSelect = document.getElementById("monthSelect") as HTMLSelectElement;
const yearSelect = document.getElementById("yearSelect") as HTMLSelectElement;
const showMonthlyBtn = document.getElementById("showMonthlyBalance") as HTMLButtonElement;

// Track edit mode
let editId: string | null = null;

// Allowed categories
const allowedCategories: Category[] = ["Food", "Travel", "Shopping", "Bills", "Gaming", "Other"];

// Render transactions
function renderTransactions(): void {
    transactionList.innerHTML = "";

    service.getTransactions.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${t.amount >= 0 ? "income" : "expense"}">
                ${t.description} | ${t.category} | ₹${t.amount} | ${t.date}
            </span>
            <div>
                <button onclick="editTransaction('${t.id}')">Edit</button>
                <button onclick="deleteTransaction('${t.id}')">Delete</button>
            </div>
        `;

        transactionList.appendChild(li);
    });

    totalBalance.textContent = "Total Balance: ₹" + service.getTotalBalance();
}

// Initial render
renderTransactions();

// Form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value as Category;
    const date = dateInput.value;

    if (!description || !amount || !category || !date) {
        alert("Please fill all fields!");
        return;
    }

    if (allowedCategories.indexOf(category) === -1) {
    alert("Invalid category selected");
    return;
}

    if (editId) {
        service.updateTransaction(editId, { description, amount, category, date });
        editId = null;
    } else {
        service.addTransaction(description, amount, category, date);
    }

    form.reset();
    renderTransactions();
});

// Delete transaction
(window as any).deleteTransaction = function (id: string) {
    service.removeTransaction(id);
    renderTransactions();
};

// Edit transaction
(window as any).editTransaction = function (id: string) {
    const t = service.getTransactions.find(t => t.id === id);
    if (!t) return;

    descriptionInput.value = t.description;
    amountInput.value = t.amount.toString();
    categoryInput.value = t.category;
    dateInput.value = t.date;

    editId = id;
};

// Cancel edit button
const cancelBtn = document.getElementById("cancelEdit") as HTMLButtonElement;
cancelBtn.addEventListener("click", () => {
    editId = null;
    form.reset();
});

// Show monthly balance
showMonthlyBtn.addEventListener("click", () => {
    const month = Number(monthSelect.value);
    const year = Number(yearSelect.value);

    if (isNaN(month) || isNaN(year)) {
        alert("Please select both month and year!");
        return;
    }

    const balance = service.getMonthlyBalanceBy(month, year);
    const monthName = monthSelect.options[monthSelect.selectedIndex].text;

    monthlyBalance.textContent = `Monthly Balance (${monthName} ${year}): ₹${balance}`;
});