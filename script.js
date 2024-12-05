document.getElementById('calculate').addEventListener('click', calculatePlan);

function calculatePlan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const insuranceRate = parseFloat(document.getElementById('insuranceRate').value) / 100;
    const disbursementDate = new Date(document.getElementById('disbursementDate').value);
    const firstPaymentDate = new Date(document.getElementById('firstPaymentDate').value);
    const term = parseInt(document.getElementById('term').value);

    const paymentTableBody = document.querySelector('#paymentTable tbody');
    paymentTableBody.innerHTML = '';

    const monthlyPayment = loanAmount / term;
    let balance = loanAmount;
    let previousDate = disbursementDate;

    for (let month = 1; month <= term; month++) {
        const paymentDate = new Date(firstPaymentDate);
        paymentDate.setMonth(paymentDate.getMonth() + month - 1);

        // Cálculo de días entre pagos
        const daysBetween = Math.floor((paymentDate - previousDate) / (1000 * 60 * 60 * 24));
        previousDate = new Date(paymentDate); // Actualiza la fecha anterior

        // Seguro con un mínimo de 2
        let insurance = balance * insuranceRate;
        if (insurance < 2) {
            insurance = 2;
        }

        // Interés
        const interest = (balance * interestRate * daysBetween) / 30;

        // Total a pagar y nuevo saldo
        const totalPayment = monthlyPayment + insurance + interest;
        const newBalance = balance - monthlyPayment;

        // Agregar fila a la tabla
        const row = `
            <tr>
                <td>${month}</td>
                <td>${paymentDate.toISOString().split('T')[0]}</td>
                <td>${daysBetween}</td>
                <td>${balance.toFixed(2)}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${insurance.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${totalPayment.toFixed(2)}</td>
                <td>${newBalance.toFixed(2)}</td>
            </tr>
        `;

        paymentTableBody.innerHTML += row;

        // Actualiza el saldo para la próxima iteración
        balance = newBalance;
    }
}
