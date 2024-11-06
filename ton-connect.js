
    // Khởi tạo TonConnectUI
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
        buttonRootId: 'ton-connect' // Nút kết nối sẽ hiển thị tại đây
    });

    // Cấu hình thêm tuỳ chọn nếu cần
    tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/bmassk3_bot/BmassK3'
    };

    // Hàm kết nối với ví
    async function connectToWallet() {
        try {
            const connectedWallet = await tonConnectUI.connectWallet();
            console.log("Connected Wallet:", connectedWallet);

            // Hiển thị thông tin ví
            document.getElementById('wallet-info').style.display = 'block';
            document.getElementById('balance').innerText = `Số dư: Đang tải...`;

            // Lấy số dư và cập nhật giao diện
            const address = connectedWallet.account.address;
            const balance = await tonConnectUI.getBalance(address); // Dùng API để lấy số dư thật
            document.getElementById('balance').innerText = `Số dư: ${balance} TON`;
        } catch (error) {
            console.error("Lỗi khi kết nối ví:", error);
        }
    }

    // Hàm ngắt kết nối ví
    async function disconnectWallet() {
        try {
            await tonConnectUI.disconnect();
            document.getElementById('wallet-info').style.display = 'none';
            console.log("Đã ngắt kết nối ví.");
        } catch (error) {
            console.error("Lỗi khi ngắt kết nối ví:", error);
        }
    }
