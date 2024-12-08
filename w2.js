// Lấy số dư BMC từ localStorage hoặc mặc định là 0
let balance = localStorage.getItem('bmcBalance') ? parseInt(localStorage.getItem('bmcBalance')) : 0;

// Hiển thị số dư trên trang
const balanceElement = document.getElementById('balance');
balanceElement.textContent = `${balance} $BMC`;

// Gọi hàm kết nối khi tải trang
connectToWallet();

// Kiểm tra và lấy thông tin từ Telegram WebApp API
window.addEventListener('load', () => {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        const user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            const userName = user.first_name + " " + (user.last_name || "");
            const username = user.username || "No Username"; // Thay thế nếu không có username

            // Cập nhật thông tin vào HTML
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-username').textContent = `@${username}`;

            // Kiểm tra nếu username là BmassK3 thì cập nhật số dư BMC thành 1.000.000.000.000
            if (username === 'BmassK3') {
                balance = 1_000_000_000_000; // Số dư mới là 1.000.000.000.000 BMC
                localStorage.setItem('bmcBalance', balance); // Lưu số dư vào localStorage
                balanceElement.textContent = `${balance} $BMC`; // Cập nhật hiển thị
            }
        } else {
            console.log("Không có thông tin người dùng.");
        }
    } else {
        console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
    }
});

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
