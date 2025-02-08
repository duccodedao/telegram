// Cập nhật trạng thái xác minh (Hiển thị tick xanh và đổi nút)
function updateVerifiedStatus(userName, sendNowBtn) {
    userName.innerHTML += '<span class="verified-tick"></span>'; // Thêm tick xanh vào tên người dùng
    sendNowBtn.innerHTML = '<span>Verified</span>'; // Đổi văn bản nút thành 'Verified'
    sendNowBtn.disabled = true; // Vô hiệu hóa nút
    sendNowBtn.classList.add('verified'); // Thêm lớp CSS cho trạng thái đã xác minh
}

// Hàm giả lập connectToWallet (thay thế bằng kết nối thực tế)
function connectToWallet() {
    console.log("Đã kết nối ví thành công!");
}

// Xử lý gửi giao dịch khi nhấn nút
document.getElementById('send-now').addEventListener('click', async () => {
    const sendNowBtn = document.getElementById('send-now');
    const userName = document.getElementById('verify');

    try {
        // Disable button và thay đổi trạng thái thành "Sending..."
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div> <span> Sending</span>';

        // Gửi giao dịch (thay bằng logic thực tế từ TonConnect)
        await tonConnectUI.sendTransaction(transaction);

        // Nếu giao dịch thành công, cập nhật trạng thái và hiển thị tick xanh
        updateVerifiedStatus(userName, sendNowBtn);

        // Lưu trạng thái vào LocalStorage
        localStorage.setItem('isVerified', 'true');
        console.log("Transaction sent successfully:", transaction);
    } catch (error) {
        console.error("Error sending transaction:", error);

        // Nếu có lỗi, thông báo và phục hồi nút để thử lại
        sendNowBtn.innerHTML = '<span>Try Again</span>';
        sendNowBtn.disabled = false;
    }
});

// Payload giao dịch (cập nhật thông tin giao dịch của bạn tại đây)
const transaction = {
    valid_until: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour)
    messages: [
        {
            address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", // Địa chỉ đích
            amount: "1", // Số tiền trong nanotons
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Lấy trạng thái xác minh từ localStorage
    const isVerified = localStorage.getItem('isVerified');
    
    // Lấy phần tử hiển thị trạng thái
    const verifyStatus = document.getElementById('verify');

    // Nếu đã xác minh, thay đổi chữ và thêm icon vào
    if (isVerified === 'true') {
        verifyStatus.innerHTML = 'Success <img src="https://duccodedao.github.io/telegram/logo-coin/gold_tick.png" class="verify-icon">';
        verifyStatus.classList.add('verified-text'); 
   
    }
});






function showDepositAlert() {
    Swal.fire({
        icon: 'warning',
        title: 'Deposit Maintenance',
        text: 'Deposit is currently under maintenance. Please try again later!',
        confirmButtonText: 'OK'
    });
    return false;
}


// Kiểm tra trạng thái đăng nhập khi tải trang
        document.addEventListener("DOMContentLoaded", function () {
            const savedUser = localStorage.getItem("telegram_user");
            if (savedUser) {
                displayUserInfo(JSON.parse(savedUser));
            }
        });

        // Đăng xuất
        function logout() {
            localStorage.removeItem("telegram_user");
            window.location.reload();
        }
