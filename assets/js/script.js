const incomeButton = document.getElementById('income');
const totalExpenses = document.getElementById('total-expenses');
const totalIncome = document.getElementById('total-income');
const expensesCat = document.getElementById('expensecat');
const incomeCat = document.getElementById('incomecat');
const total = document.getElementById('total');

//Financial calculator
document.addEventListener('DOMContentLoaded', function() 
{
    // Add incomes
    incomeButton.addEventListener('click', function() {
        const incomes = [];
        let income = {};
        let incomeName = '';
        let incomeAmount = 0;
        let addAnother = true;
        do {
            incomeName = prompt('Please enter the name of the income:');
            if (incomeName === null) {
                break;
            }
            incomeAmount = parseFloat(prompt('Please enter the amount of the income:'));
            if (isNaN(incomeAmount)) {
                alert('Please enter a valid number for the amount.');
                continue;
            }
            income = {
                name: incomeName,
                amount: incomeAmount
            };
            incomes.push(income);
            addAnother = confirm('Would you like to add another income?');
        } while (addAnother);
        localStorage.setItem('incomes', JSON.stringify(incomes));
        return incomes;

    });

    // Add expenses
    const expenseButton = document.getElementById('expense');
    expenseButton.addEventListener('click', function() {
        const expenses = [];
        let expense = {};
        let expenseName = '';
        let expenseAmount = 0;
        let addAnother = true;
        do {
            expenseName = prompt('Please enter the name of the expense:');
            if (expenseName === null) {
                break;
            }
            expenseAmount = parseFloat(prompt('Please enter the amount of the expense:'));
            if (isNaN(expenseAmount)) {
                alert('Please enter a valid number for the amount.');
                continue;
            }
            expense = {
                name: expenseName,
                amount: expenseAmount
            };
            expenses.push(expense);
            addAnother = confirm('Would you like to add another expense?');
        } while (addAnother);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        return expenses;
    });

    // Calculate the total income and expenses
    const calculateButton = document.getElementById('calculate');
    calculateButton.addEventListener('click', function() {
        const incomes = JSON.parse(localStorage.getItem('income')) || [];
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let totalIncomeValue = 0;
        let totalExpenseValue = 0;
        for (let i = 0; i < incomes.length; i++) {
            totalIncomeValue += incomes[i].amount;
        }
        for (let i = 0; i < expenses.length; i++) {
            totalExpenseValue += expenses[i].amount;
        }
        const totalMoney = totalIncomeValue - totalExpenseValue;
        localStorage.setItem('totalIncome', JSON.stringify(totalIncomeValue));
        localStorage.setItem('totalExpense', JSON.stringify(totalExpenseValue));
        localStorage.setItem('total', JSON.stringify(totalMoney));
        return totalMoney;
    });
});

// Display information entered by the user
const displayincome = function (incomeArray) 
{
    // Get the income table
    const incomeTable = document.querySelector('#employee-table');
  
    // Clear the income table
    incomeTable.innerHTML = '';
  
    // Loop through the income data and create a row for each method of income
    for (let i = 0; i < incomeArray.length; i++) {
      const incomeType = incomeArray[i];
  
      const newTableRow = document.createElement('tr');
  
      const incomeName = document.createElement('td');
      incomeName.textContent = incomeType.income;
      newTableRow.append(incomeName);
  
      const incomeTotal = document.createElement('td');
      // Format the income as currency
      incomeTotal.textContent = incomeType.salary.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
  
      newTableRow.append(incomeTotal);
  
      employeeTable.append(newTableRow);
    }
};