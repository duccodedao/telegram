let exchangeRate;
let previousExchangeRate;

async function fetchExchangeRate() {
    const exchangeRateElement = document.getElementById('exchangeRate');
    exchangeRateElement.innerHTML = '<div class="loading"></div> Đang tải...';

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd&include_24hr_change=true');
        const data = await response.json();
        previousExchangeRate = exchangeRate;
        exchangeRate = data.tether.vnd;
        const change24h = data.tether.vnd_24h_change.toFixed(2);

        let changeText = '';
        if (change24h > 0) {
            changeText = `<span style="color: green;">(+${change24h}%)</span>`;
        } else if (change24h < 0) {
            changeText = `<span style="color: red;">(${change24h}%)</span>`;
        } else {
            changeText = '<span>(0.00%)</span>';
        }

        exchangeRateElement.innerHTML = `
            1 USDT = ${exchangeRate.toLocaleString()} VNĐ 
            <a href="https://www.coingecko.com/en/coins/tether" target="_blank" style="text-decoration: none;">(CGK)</a>
            ${changeText}
        `;
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
    const fromCurrencyText = document.getElementById('fromCurrencyText');
    const toCurrencyText = document.getElementById('toCurrencyText');
    [fromCurrencyText.innerText, toCurrencyText.innerText] = [toCurrencyText.innerText, fromCurrencyText.innerText];

    const fromCurrencyLogo = document.getElementById('fromCurrencyLogo');
    const toCurrencyLogo = document.getElementById('toCurrencyLogo');
    [fromCurrencyLogo.src, toCurrencyLogo.src] = [toCurrencyLogo.src, fromCurrencyLogo.src];

    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    [fromAmount.value, toAmount.value] = [toAmount.value, fromAmount.value];

    convertCurrency();
}

window.onload = function() {
    fetchExchangeRate();
};
