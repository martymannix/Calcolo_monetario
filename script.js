let currentTotal = 0;
let targetAmount = 0;

function showCalculationLevel() {
  document.querySelector('.menu').style.display = "none";
  document.getElementById('calculation').style.display = "block";
  generateCalculation();
  generateCurrencies();
}

function resetCalculation() {
  currentTotal = 0;
  document.querySelector('.total').textContent = `Totale: ${currentTotal.toFixed(2)} CHF`;
  document.querySelector('.result').textContent = '';
}

function generateCalculation() {
  var amount1 = getRandomAmount();
  var amount2 = getRandomAmount([0.0, 0.10, 0.20, 0.50]);
  var amount3 = getRandomAmount();

  var totalAmount = (amount1 + amount2).toFixed(2);
  var totalAmount2 = (amount3 + amount2).toFixed(2);

  var calculationText = `${totalAmount} CHF + ${totalAmount2} CHF =`;
  document.querySelector('.calculation').textContent = calculationText;
  document.querySelector('#totalAmount').textContent = totalAmount + " CHF";
}

  document.querySelector('.calculation').textContent = `Esegui il calcolo corretto: ${targetAmount} CHF`;
}

function generateCurrencies() {
  const currencyContainer = document.querySelector('.currency-container');
  currencyContainer.innerHTML = '';

  const currencies = [
    { value: 0.1, label: "0.10 CHF" },
    { value: 0.2, label: "0.20 CHF" },
    { value: 0.5, label: "0.50 CHF" },
    { value: 1, label: "1 CHF" },
    { value: 2, label: "2 CHF" },
    { value: 5, label: "5 CHF" },
    { value: 10, label: "10 CHF" },
    { value: 20, label: "20 CHF" },
    { value: 50, label: "50 CHF" },
    { value: 100, label: "100 CHF" },
    { value: 1000, label: "1000 CHF" },
  ];

  currencies.forEach(currency => {
    const currencyItem = document.createElement('div');
    currencyItem.classList.add('currency-item');
    currencyItem.textContent = currency.label;
    currencyItem.draggable = true;
    currencyItem.dataset.value = currency.value;
    currencyItem.addEventListener('dragstart', drag);
    currencyContainer.appendChild(currencyItem);
  });
}

function drag(event) {
  event.dataTransfer.setData("value", event.target.dataset.value);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const value = parseFloat(event.dataTransfer.getData("value"));
  currentTotal += value;
  document.querySelector('.total').textContent = `Totale: ${currentTotal.toFixed(2)} CHF`;
}

function checkResult() {
  const resultCheck = document.querySelector('.result');

  if (currentTotal === parseFloat(targetAmount)) {
    resultCheck.innerHTML = `<span class='check'>&#10004; Risultato corretto. Passa al prossimo calcolo!</span>`;
  } else {
    resultCheck.innerHTML = `<span class='cross'>&#10008; Risultato errato. Riprova!</span>`;
  }
}

function getRandomAmount() {
  const min = 10;
  const max = 99.99;
  return (Math.random() * (max - min) + min).toFixed(2);
}
