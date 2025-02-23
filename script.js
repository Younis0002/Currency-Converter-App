const apiKey = 'fa16b9d2ba5692fcc54c544c';
const apiUrl = `https://open.er-api.com/v6/latest`;

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

async function fetchCurrencies() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = currency;
        option1.textContent = option2.textContent = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

async function convertCurrency() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const fromRate = data.rates[fromCurrency.value];
    const toRate = data.rates[toCurrency.value];
    const amountVal = amount.value;

    if (amountVal === '' || amountVal <= 0) {
        result.textContent = 'Please enter a valid amount';
        return;
    }

    const convertedAmount = (amountVal / fromRate) * toRate;
    result.textContent = `${amountVal} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
}

convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('load', fetchCurrencies);
