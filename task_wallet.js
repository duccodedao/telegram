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
                address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", // Thay thế bằng địa chỉ đích
                amount: "100000000" // 0.02 TON in nanotons
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
