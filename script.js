let transactions = [];

document.getElementById("addBtn").addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (title === "" || amount <= 0) {
        alert("Enter valid title and amount");
        return;
    }

    transactions.push({ title, amount, type });
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    render();
});

function render() {
    let totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    let totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    document.getElementById("totalIncome").innerText = `₹${totalIncome}`;
    document.getElementById("totalExpense").innerText = `₹${totalExpense}`;
    document.getElementById("balance").innerText = `₹${totalIncome - totalExpense}`;

    let tableData = "";
    transactions.forEach((t, index) => {
        tableData += `
            <tr>
                <td>${t.title}</td>
                <td>₹${t.amount}</td>
                <td>${t.type}</td>
                <td><button class="delete-btn" onclick="remove(${index})">X</button></td>
            </tr>
        `;
    });
    document.getElementById("transactions").innerHTML = tableData;
}

function remove(index) {
    transactions.splice(index, 1);
    render();
}