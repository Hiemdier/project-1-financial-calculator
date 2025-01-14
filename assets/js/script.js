const monthlyIncome = document.getElementById('income');
const monthlyExpense = document.getElementById('expense');
const submitGainsButton = document.getElementById('submit-gains');
const submitExpensesButton = document.getElementById('submit-expenses');


document.addEventListener('DOMContentLoaded', function() {
    const incomeInput = document.getElementById('income');
    const expenseInput = document.getElementById('expense');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', function() {
        const income = parseFloat(incomeInput.value);
        const expense = parseFloat(expenseInput.value);

        if (isNaN(income) || isNaN(expense)) {
            resultDiv.textContent = 'Please enter valid numbers for income and expense.';
            return;
        }
        else 
        {
            resultDiv.textContent = ''; // Response that the values have been entered
            return;
        }
    });
    
    const balance = income - expense;
    resultDiv.textContent = `Your monthly balance is: $${balance.toFixed(2)}`;
});



function saveIncome() {
    localStorage.setItem('monthlyIncome', monthlyIncome.value);
}

function saveExpense() {
    localStorage.setItem('monthlyExpense', monthlyExpense.value);
}

submitGainsButton.addEventListener('click', saveIncome);
submitExpensesButton.addEventListener('click', saveExpense);
