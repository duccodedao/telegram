const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

async function fetchWalletData(wallet) {
    if (!wallet) return;

    const walletAddress = wallet.account.address.toString(); // Địa chỉ ví chính xác
    document.getElementById('wallet-address').textContent = walletAddress;
    document.getElementById('wallet-info').style.display = "block";

    try {
        // ✅ Lấy số dư TON từ TonAPI
        const tonResponse = await fetch(`https://tonapi.io/v2/accounts/${walletAddress}`);
        const tonData = await tonResponse.json();
        const tonBalance = (tonData.balance / 1e9).toFixed(9); // Chuyển sang TON
        document.getElementById('wallet-balance').textContent = `${tonBalance} TON`;

        // ✅ Lấy danh sách token có trong ví
        const tokenResponse = await fetch(`https://tonapi.io/v2/accounts/${walletAddress}/tokens`);
        const tokenData = await tokenResponse.json();

        // ✅ Kiểm tra xem token BMC có trong ví không
        const tokenBMC = tokenData.balances.find(token => token.jetton_address === 'EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS');

        if (tokenBMC) {
            document.getElementById('token-balance').textContent = `${(tokenBMC.balance / 1e9).toFixed(2)} BMC`;
        } else {
            document.getElementById('token-balance').textContent = "0 BMC";
        }

    } catch (error) {
        console.error("Lỗi khi lấy số dư:", error);
    }
}

// Lắng nghe sự kiện kết nối
tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet) {
        fetchWalletData(wallet);
    }
});
