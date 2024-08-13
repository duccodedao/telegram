let exchangeRate;

async function fetchExchangeRate() {
    const exchangeRateElement = document.getElementById('exchangeRate');
    exchangeRateElement.innerHTML = '<div class="loading"></div> Đang tải tỷ giá...';

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd');
        const data = await response.json();
        exchangeRate = data.tether.vnd;
        exchangeRateElement.innerHTML = `1 USDT = ${exchangeRate.toLocaleString()} VNĐ <a href="https://www.coingecko.com/en/coins/tether" target="_blank">(Coingecko)</a>`;
    } catch (error) {
        exchangeRateElement.innerText = 'Lỗi khi lấy tỷ giá';
        console.error('Lỗi khi lấy tỷ giá:', error);
    }
}

function convertCurrency() {
    const fromAmount = document.getElementById('fromAmount').value;
    const fromCurrency = document.getElementById('fromCurrencyText').innerText;
    
    if (exchangeRate) {
        let toAmount;
        if (fromCurrency === 'USDT') {
            toAmount = (fromAmount * exchangeRate).toFixed(0);
        } else {
            toAmount = (fromAmount / exchangeRate).toFixed(6);
        }
        document.getElementById('toAmount').value = toAmount;
    }
}

function switchCurrencies() {
    // Swap texts
    const fromCurrencyText = document.getElementById('fromCurrencyText');
    const toCurrencyText = document.getElementById('toCurrencyText');
    [fromCurrencyText.innerText, toCurrencyText.innerText] = [toCurrencyText.innerText, fromCurrencyText.innerText];

    // Swap logos
    const fromCurrencyLogo = document.getElementById('fromCurrencyLogo');
    const toCurrencyLogo = document.getElementById('toCurrencyLogo');
    [fromCurrencyLogo.src, toCurrencyLogo.src] = [toCurrencyLogo.src, fromCurrencyLogo.src];

    // Swap amounts
    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    [fromAmount.value, toAmount.value] = [toAmount.value, fromAmount.value];

    // Recalculate
    convertCurrency();
}

window.onload = function() {
    fetchExchangeRate();
};

