document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded triggered');
    // Variable declarations

    const incomeButton = document.getElementById('incomeButton');
    const expenseButton = document.getElementById('expensesButton');
    const calculateButton = document.getElementById('calculateButton');
    const clearButton = document.getElementById('clearButton');

    // Add incomes function
    incomeButton.addEventListener('click', function () {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        let addAnother = true;

        while (addAnother) {
            const incomeName = prompt('Please enter the name of the income:');
            if (!incomeName) break;

            const incomeAmount = parseFloat(prompt('Please enter the amount of the income:'));
            if (isNaN(incomeAmount)) {
                alert('Please enter a valid number for the amount.');
                continue;
            }

            incomes.push({ name: incomeName, amount: incomeAmount });
            addAnother = confirm('Would you like to add another income?');
        }

        localStorage.setItem('incomes', JSON.stringify(incomes));
        displayIncome(incomes);
    });

    // Add expenses function 
    expenseButton.addEventListener('click', function () {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let addAnother = true;

        while (addAnother) {
            const expenseName = prompt('Please enter the name of the expense:');
            if (!expenseName) break;

            const expenseAmount = parseFloat(prompt('Please enter the amount of the expense:'));
            if (isNaN(expenseAmount)) {
                alert('Please enter a valid number for the amount.');
                continue;
            }

            expenses.push({ name: expenseName, amount: expenseAmount });
            addAnother = confirm('Would you like to add another expense?');
        }

        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses(expenses);
    });

    // Calculate function for total income and expenses
    calculateButton.addEventListener('click', function () {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
        // Check if incomes or expenses are missing and show appropriate alerts
        if (incomes.length === 0 && expenses.length === 0) {
            alert('Please enter at least one income and one expense.');
            return;
        } else if (incomes.length === 0) {
            alert('Please enter at least one income.');
            return;
        } else if (expenses.length === 0) {
            alert('Please enter at least one expense.');
            return;
        } else {
            alert('Calculating...');
        }
    
        // Calculate total income and total expenses using reduce
        let totalIncomeValue = 0;
        let totalExpenseValue = 0;

        // Calculate total income using a for loop
        for (let i = 0; i < incomes.length; i++) {
           totalIncomeValue += incomes[i].amount;
       }

        // Calculate total expenses using a for loop
        for (let i = 0; i < expenses.length; i++) {
           totalExpenseValue += expenses[i].amount;
        }
        const totalValue = totalIncomeValue - totalExpenseValue;
    
        // Store calculated values in localStorage
        localStorage.setItem('totalIncome', JSON.stringify(totalIncomeValue));
        localStorage.setItem('totalExpenses', JSON.stringify(totalExpenseValue));
        localStorage.setItem('total', JSON.stringify(totalValue));
    
        // Console logs for debugging
        console.log('Incomes:', incomes);
        console.log('Total Income:', totalIncomeValue);
        console.log('Expenses:', expenses);
        console.log('Total Expenses:', totalExpenseValue);
        console.log('Total:', totalValue);
    });
    
    // Toast function

    // function alerting that data is cleared
    function clearData() {
        alert('Clearing data...');
    };


    // Clear data function 
    clearButton.addEventListener('click', function () {
        localStorage.clear();
        document.getElementById('income-table').innerHTML = '';
        document.getElementById('expense-table').innerHTML = '';
        document.getElementById('total-income').textContent = '';
        document.getElementById('total-expenses').textContent = '';
        document.getElementById('total').textContent = '';
        clearData();
        
    });

    // Display function for incomes

    const displayIncome = function (incomeArray) {
        const incomeTable = document.getElementById('income-table');
        let incomeRows = '';
        for (let i = 0; i < incomeArray.length; i++) {
            const income = incomeArray[i];
            incomeRows += `
            <tr>
                <td>${income.name}</td>
                <td>${income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>`;
        }
        incomeTable.innerHTML = incomeRows;
    };


    // Display function for expenses

    const displayExpenses = function (expenseArray) {
        const expenseTable = document.getElementById('expense-table');
        let expenseRows = '';
        for (let i = 0; i < expenseArray.length; i++) {
            const expense = expenseArray[i];
            expenseRows += `
            <tr>
                <td>${expense.name}</td>
                <td>${expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            </tr>`;
        }
        expenseTable.innerHTML = expenseRows;
    };

    // Display function for total income and expenses
    const displayTotals = function () {
        const totalIncome = JSON.parse(localStorage.getItem('totalIncome')) || 0;
        const totalExpenses = JSON.parse(localStorage.getItem('totalExpenses')) || 0;
        const total = JSON.parse(localStorage.getItem('total')) || 0;

        document.getElementById('total-income').textContent = totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        document.getElementById('total').textContent = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    // Initialize data from localStorage
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    displayIncome(incomes);
    displayExpenses(expenses);
    displayTotals();
});
