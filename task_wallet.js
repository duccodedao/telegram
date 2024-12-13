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









// Lấy số dư BMC từ localStorage hoặc mặc định là 0
    let balance = localStorage.getItem('bmcBalance') ? parseInt(localStorage.getItem('bmcBalance')) : 0;

    // Hiển thị số dư trên trang
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `${balance} $BMC `;

    // Gọi hàm kết nối khi tải trang
    connectToWallet();

    // Payload giao dịch
    const transaction = {
        valid_until: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour)
        messages: [
            {
                address: "UQAe1CUDW9d_sbU4p1PPqnYkLcYOnqzqmKh-BqSI8DDtu9FO", // Thay thế bằng địa chỉ đích
                amount: "1" // 0.02 TON in nanotons
            }
        ]
    };

    // Xử lý gửi giao dịch
    document.getElementById('task-btn').addEventListener('click', async () => {
        try {
            // Disable button và thay đổi trạng thái thành Sending...
            const sendNowBtn = document.getElementById('task-btn');
            sendNowBtn.disabled = true;
            sendNowBtn.innerHTML = '<div class="spinner"></div><span> Sending...</span>';

            // Gửi giao dịch
            await tonConnectUI.sendTransaction(transaction);

            // Nếu giao dịch thành công, cập nhật trạng thái và cộng 1000 BMC
            sendNowBtn.innerHTML = '<span>Done</span>';
            sendNowBtn.disabled = true;
            
            // Cộng 1000 BMC
            balance += 1000000000;

            // Lưu số dư mới vào localStorage
            localStorage.setItem('bmcBalance', balance);

            // Cập nhật hiển thị số dư trên trang
            balanceElement.textContent = `${balance} $BMC`;

            console.log("Transaction sent successfully:", transaction);
        } catch (error) {
            console.error("Error sending message:", error);
            const sendNowBtn = document.getElementById('task-btn');
            sendNowBtn.innerHTML = '<span>Trade again</span>';
            sendNowBtn.disabled = false; // Cho phép người dùng gửi lại giao dịch nếu có lỗi
        }
    });

    // Hàm giả lập connectToWallet (cần thay bằng hàm kết nối thực tế)
    function connectToWallet() {
        console.log("Đã kết nối ví thành công!");
            }
