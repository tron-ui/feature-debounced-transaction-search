import { transactions } from "./transactions.js"

const tableBody = document.getElementById("transactionBody");
const resultCount = document.getElementById("resultCount");
const searchBar = document.getElementById("search");

function debounce(callback, delay) {
    let timer = null;

    function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            callback.apply(this, args);
        }, delay);
    }

    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }

    return debounced;

}

const debounceSearch = debounce((searchText) => { filterSearchRecords(searchText); }, 300);

function displayTransactions(data) {
    tableBody.replaceChildren();

    if (data.length) {
        data.forEach((transaction) => {
            const row = document.createElement("tr");

            const values = [
                transaction.id,
                transaction.merchant,
                transaction.category,
                `₹${transaction.amount}`,
                transaction.status
            ];

            values.forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

    } else {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "No transactions found";

        row.appendChild(cell);
        tableBody.appendChild(row);
    }
    resultCount.textContent = `Showing ${data.length} transactions`;
}

displayTransactions(transactions);

function filterSearchRecords(text) {
    const filteredRecords = transactions.filter((txn) => txn.id.toLowerCase().includes(text) || txn.merchant.toLowerCase().includes(text) || txn.category.toLowerCase().includes(text) || txn.status.toLowerCase().includes(text));

    displayTransactions(filteredRecords);
}

function inputHandler(event) {
    const searchText = event?.target?.value.trim().toLowerCase();

    if (searchText) {
        debounceSearch(searchText);
    } else {
        debounceSearch.cancel();
        displayTransactions(transactions);
    }
}

searchBar.addEventListener("input", inputHandler);