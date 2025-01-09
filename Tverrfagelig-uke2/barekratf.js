document.querySelector('.convert-btn').addEventListener('click', convertCurrency);

async function convertCurrency() {
  const usdAmount = document.querySelector('.usd-input').value;
  const resultElement = document.querySelector('.calc-result');

  if (!usdAmount) {
    resultElement.textContent = 'Vennligst skriv inn et beløp.';
    return;
  }

  try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/5e71ba21cfb7318c588cf5c7/latest/USD');
    const data = await response.json();
    const exchangeRate = data.conversion_rates.NOK;
    const nokAmount = (usdAmount * exchangeRate).toFixed(2);

    resultElement.textContent = `${parseInt(usdAmount).toLocaleString()} USD = ${nokAmount.toLocaleString()} NOK`;
  } catch (error) {
    resultElement.textContent = 'Kunne ikke hente valutakurs. Prøv igjen senere.';
    console.error(error);
  }
}
