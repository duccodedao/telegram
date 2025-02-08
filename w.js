// Kiểm tra trạng thái xác minh và người dùng khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    // Lấy thông tin người dùng và trạng thái xác minh từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const isVerified = localStorage.getItem('isVerified');
    
    // Lấy các phần tử DOM
    const userName = document.getElementById('verify');
    const sendNowBtn = document.getElementById('send-now');

    // Nếu có thông tin người dùng đã đăng nhập
    if (user) {
        // Cập nhật thông tin người dùng trong giao diện
        document.getElementById('id').textContent = user.id || 'N/A';
        document.getElementById('name').textContent = user.first_name || 'N/A';
        document.getElementById('username').textContent = user.username || 'N/A';
        document.getElementById('premium').textContent = user.premium ? 'Yes' : 'No';
        document.getElementById('avatar').src = user.photo_url || 'https://via.placeholder.com/80';
        
        // Nếu trạng thái xác minh là "true", cập nhật trạng thái
        if (isVerified === 'true') {
            updateVerifiedStatus(userName, sendNowBtn);
        }

        // Ẩn nút đăng nhập và hiển thị nút đăng xuất
        document.getElementById('tg-login-container').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'inline-block';
    }
});

// Cập nhật trạng thái xác minh (Hiển thị tick xanh và đổi nút)
function updateVerifiedStatus(userName, sendNowBtn) {
    // Thêm tick xanh vào tên người dùng và hiển thị icon "verified"
    userName.innerHTML = 'Verified <img src="https://duccodedao.github.io/telegram/logo-coin/gold_tick.png" class="verified-tick" alt="Verified" />'; 
    
    // Đổi văn bản nút thành 'Verified'
    sendNowBtn.innerHTML = '<span>Verified</span>'; 
    sendNowBtn.disabled = true; // Vô hiệu hóa nút
    sendNowBtn.classList.add('verified'); // Thêm lớp CSS cho trạng thái đã xác minh
}

// Hàm xử lý đăng nhập từ Telegram
function onTelegramAuth(user) {
    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Cập nhật thông tin người dùng trong giao diện
    document.getElementById('id').textContent = user.id || 'N/A';
    document.getElementById('name').textContent = user.first_name || 'N/A';
    document.getElementById('username').textContent = user.username || 'N/A';
    document.getElementById('verify').textContent = 'Checking...'; // Trạng thái mặc định
    document.getElementById('premium').textContent = user.premium ? 'Yes' : 'No';

    // Cập nhật ảnh đại diện của người dùng
    const avatarImg = document.getElementById('avatar');
    avatarImg.src = user.photo_url || 'https://via.placeholder.com/80';

    // Ẩn nút đăng nhập và hiện nút đăng xuất
    document.getElementById('tg-login-container').style.display = 'none';  // Ẩn nút đăng nhập
    document.getElementById('logout-btn').style.display = 'inline-block';  // Hiện nút đăng xuất

    // Hiển thị thông báo đăng nhập thành công
    Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'You have successfully logged in with Telegram.',
        timer: 1500
    });
}

// Hàm đăng xuất
function logout() {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isVerified'); // Xóa trạng thái xác minh

    // Hiện lại nút đăng nhập và ẩn nút đăng xuất
    document.getElementById('tg-login-container').style.display = 'block';  // Hiện nút đăng nhập
    document.getElementById('logout-btn').style.display = 'none';  // Ẩn nút đăng xuất

    // Xóa các thông tin hiển thị trên giao diện
    document.getElementById('id').textContent = 'Loading...';
    document.getElementById('name').textContent = 'Loading...';
    document.getElementById('username').textContent = 'Loading...';
    document.getElementById('verify').textContent = 'Checking...';
    document.getElementById('premium').textContent = 'Loading...';
    document.getElementById('avatar').src = 'https://via.placeholder.com/80';

    // Hiển thị thông báo đăng xuất
    Swal.fire({
        icon: 'info',
        title: 'Logged Out',
        text: 'You have been logged out.',
        timer: 1500
    });
}

// Cập nhật trạng thái xác minh khi gửi giao dịch
document.getElementById('send-now').addEventListener('click', async () => {
    const sendNowBtn = document.getElementById('send-now');
    const userName = document.getElementById('verify');

    try {
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div> <span> Sending...</span>';

        // Gửi giao dịch (thay bằng logic thực tế từ TonConnect)
        await tonConnectUI.sendTransaction(transaction);

        // Nếu giao dịch thành công, cập nhật trạng thái và hiển thị tick xanh
        updateVerifiedStatus(userName, sendNowBtn);

        // Lưu trạng thái xác minh vào LocalStorage
        localStorage.setItem('isVerified', 'true');
        console.log("Transaction sent successfully:", transaction);
    } catch (error) {
        console.error("Error sending transaction:", error);
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
