
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

async function fetchWalletData(wallet) {
    if (!wallet) return;

    const walletAddress = wallet.account.address.toString();
    document.getElementById('wallet-address').textContent = walletAddress;
    document.getElementById('wallet-info').style.display = "block";

    try {
        // ✅ Fetch TON balance from TonAPI
        const tonResponse = await fetch(`https://tonapi.io/v2/accounts/${walletAddress}`);
        const tonData = await tonResponse.json();
        const tonBalance = (tonData.balance / 1e9).toFixed(9);
        document.getElementById('wallet-balance').textContent = `${tonBalance} TON`;

        // ✅ Fetch TON/USDT price from CoinGecko
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const priceData = await priceResponse.json();
        const tonPrice = priceData['the-open-network'].usd;

        // ✅ Display the USDT value of the TON balance
        const usdtValue = (tonBalance * tonPrice).toFixed(2);
        document.getElementById('wallet-usdt-value').textContent = `≈ ${usdtValue} USDT`;

        // ✅ Fetch token list in the wallet
        const tokenResponse = await fetch(`https://tonapi.io/v2/accounts/${walletAddress}/tokens`);
        const tokenData = await tokenResponse.json();

        // ✅ Check for BMC token
        const tokenBMC = tokenData.balances.find(token => token.jetton_address === 'EQCYaB9KjnYpY9j12gn8XIz6SjuYqiTs_1Sg7dbMEiAgr85Y');
        if (tokenBMC) {
            document.getElementById('token-balance').textContent = `${(tokenBMC.balance / 1e9).toFixed(2)} BMC`;
        } else {
            document.getElementById('token-balance').textContent = "0 BMC";
        }

        // ✅ Fetch the entire transaction history
        const transactionResponse = await fetch(`https://tonapi.io/v2/blockchain/accounts/${walletAddress}/transactions`);
        const transactionData = await transactionResponse.json();
        const transactionsList = document.getElementById('transactions-list');
        transactionsList.innerHTML = "";

        transactionData.transactions.forEach(tx => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                🔹 <strong>TX Hash:</strong> <a href="https://tonviewer.com/tx/${tx.hash}" target="_blank">${tx.hash.slice(0, 10)}...</a> <br>
                🔄 <strong>Type:</strong> ${tx.in_msg ? 'Received' : 'Sent'} <br>
                💰 <strong>Amount:</strong> ${(tx.in_msg ? tx.in_msg.value : tx.out_msgs[0].value) / 1e9} TON <br>
                🕒 <strong>Time:</strong> ${new Date(tx.utime * 1000).toLocaleString()} <br>
            `;
            transactionsList.appendChild(listItem);
        });
        document.getElementById('transaction-history').style.display = "block";

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Listen for connection events
tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet) {
        fetchWalletData(wallet);
    }
});

async function fetchTransactionHistory(walletAddress) {
    try {
        const response = await axios.get(`https://tonapi.io/v2/blockchain/accounts/${walletAddress}/transactions`);
        const transactionsList = document.getElementById('transactions-list');
        transactionsList.innerHTML = "";

        response.data.transactions.forEach(tx => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                🔹 <strong>TX Hash:</strong> <a href="https://tonviewer.com/tx/${tx.hash}" target="_blank">${tx.hash.slice(0, 10)}...</a> <br>
                🔄 <strong>Type:</strong> ${tx.in_msg ? 'Received' : 'Sent'} <br>
                💰 <strong>Amount:</strong> ${(tx.in_msg ? tx.in_msg.value : tx.out_msgs[0]. value) / 1e9} TON <br>
                🕒 <strong>Time:</strong> ${new Date(tx.utime * 1000).toLocaleString()} <br>
            `;
            transactionsList.appendChild(listItem);
        });
        document.getElementById('transaction-history').style.display = "block";
    } catch (error) {
        console.error("Error fetching transaction history:", error);
    }
}

tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet) {
        fetchWalletData(wallet);
        fetchTransactionHistory(wallet.account.address);
    }
}); 
