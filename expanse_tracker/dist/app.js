import { TransactionService } from "./service/transactionService.js";
const service = new TransactionService();
// Form elements
const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
// Display elements
const transactionList = document.getElementById("transactionList");
const totalBalance = document.getElementById("totalBalance");
const monthlyBalance = document.getElementById("monthlyBalance");
// Month/year filter
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const showMonthlyBtn = document.getElementById("showMonthlyBalance");
// Track edit mode
let editId = null;
// Allowed categories
const allowedCategories = ["Food", "Travel", "Shopping", "Bills", "Gaming", "Other"];
// Render transactions
function renderTransactions() {
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
    const category = categoryInput.value;
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
    }
    else {
        service.addTransaction(description, amount, category, date);
    }
    form.reset();
    renderTransactions();
});
// Delete transaction
window.deleteTransaction = function (id) {
    service.removeTransaction(id);
    renderTransactions();
};
// Edit transaction
window.editTransaction = function (id) {
    const t = service.getTransactions.find(t => t.id === id);
    if (!t)
        return;
    descriptionInput.value = t.description;
    amountInput.value = t.amount.toString();
    categoryInput.value = t.category;
    dateInput.value = t.date;
    editId = id;
};
// Cancel edit button
const cancelBtn = document.getElementById("cancelEdit");
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
