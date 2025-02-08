// Hàm xử lý khi người dùng đăng nhập qua Telegram
function onTelegramAuth(user) {
    const fullName = user.last_name ? `${user.first_name} ${user.last_name}` : user.first_name;
    let premiumText = "Checking...";

    // Hiệu ứng loading premium
    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        document.getElementById("premium").textContent = `Loading${".".repeat(dots)}`;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        premiumText = user.is_premium === true ? "Yes" : "No";
        document.getElementById("premium").textContent = premiumText;
    }, 2000);

    const userInfo = {
        id: user.id,
        full_name: fullName,
        username: user.username || "No name",
        photo_url: user.photo_url || "https://via.placeholder.com/80",
        is_premium: premiumText
    };

    localStorage.setItem("telegram_user", JSON.stringify(userInfo));

    // Cập nhật giao diện với thông tin người dùng
    updateUserInfo(userInfo);

    Swal.fire({
        title: "Successful!",
        text: "You are logged into the system.",
        timer: 2000,
        showConfirmButton: false
    });
}

// Cập nhật thông tin người dùng lên giao diện
function updateUserInfo(user) {
    document.getElementById("avatar").src = user.photo_url;
    document.querySelector(".skeleton-loader").style.display = "none";
    document.getElementById("avatar").style.display = "block";

    showLoadingEffect(() => {
        document.getElementById("id").textContent = user.id;
        document.getElementById("name").textContent = user.full_name;
        document.getElementById("username").textContent = `@${user.username}`;
        document.getElementById("premium").textContent = user.is_premium;
    });

    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("tg-login-container").style.display = "none";
}

// Hiệu ứng loading cho các trường
function showLoadingEffect(callback) {
    const fields = ["id", "name", "username", "premium"];
    fields.forEach(field => {
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            document.getElementById(field).textContent = `Loading${".".repeat(dots)}`;
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
            callback();
        }, 1500);
    });
}

// Hàm sao chép vào clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            title: "Copied!",
            text: text,
            timer: 1500,
            showConfirmButton: false
        });
    }).catch(err => {
        alert("Error copying");
        console.error(err);
    });
}

// Hàm đăng xuất
function logout() {
    Swal.fire({
        title: "Are you sure you want to logout?",
        text: "After logging out, you will need to log in again to use the service.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Log out!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("telegram_user");
            Swal.fire({
                title: "Successfully!",
                text: "You have logged out of the mini app.",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.reload();
            });
        }
    });
}

// Kiểm tra trạng thái người dùng khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("telegram_user");
    const walletContainer = document.getElementById("wallet-avatar-container");

    if (savedUser) {
        const user = JSON.parse(savedUser);
        // Cập nhật giao diện nếu người dùng đã đăng nhập
        updateUserInfo(user);

        // Hiển thị ảnh đại diện trong wallet
        walletContainer.innerHTML = `<img src="${user.photo_url}" alt="Wallet" style="width:30px; height:30px; border-radius:50%;">`;
    } else {
        // Hiển thị lại nút đăng nhập nếu không có thông tin người dùng
        document.getElementById("tg-login-container").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }

    // Kiểm tra trạng thái xác minh và cập nhật giao diện
    const isVerified = localStorage.getItem('isVerified');
    const verifyStatus = document.getElementById('verify');
    const sendNowBtn = document.getElementById('send-now');

    if (isVerified === 'true') {
        updateVerifiedStatus(verifyStatus, sendNowBtn);
    }

    // Cập nhật trạng thái xác minh
    sendNowBtn.addEventListener('click', async () => {
        try {
            sendNowBtn.disabled = true;
            sendNowBtn.innerHTML = '<div class="spinner"></div> <span> Sending</span>';

            // Giả lập gửi giao dịch
            await connectToWallet();

            // Cập nhật trạng thái khi giao dịch thành công
            updateVerifiedStatus(verifyStatus, sendNowBtn);

            // Lưu trạng thái vào LocalStorage
            localStorage.setItem('isVerified', 'true');
        } catch (error) {
            console.error("Error sending transaction:", error);
            sendNowBtn.innerHTML = '<span>Try Again</span>';
            sendNowBtn.disabled = false;
        }
    });
});

// Cập nhật trạng thái đã xác minh
function updateVerifiedStatus(verifyStatus, sendNowBtn) {
    verifyStatus.innerHTML = 'Success <img src="https://duccodedao.github.io/telegram/logo-coin/gold_tick.png" class="verify-icon">';
    verifyStatus.classList.add('verified-text');
    sendNowBtn.innerHTML = '<span>Verified</span>';
    sendNowBtn.disabled = true;
    sendNowBtn.classList.add('verified');
}

// Hàm giả lập connectToWallet (thay thế bằng kết nối thực tế)
function connectToWallet() {
    console.log("Đã kết nối ví thành công!");
}

// Cảnh báo Deposit
function showDepositAlert() {
    Swal.fire({
        icon: 'warning',
        title: 'Deposit Maintenance',
        text: 'Deposit is currently under maintenance. Please try again later!',
        confirmButtonText: 'OK'
    });
    return false;
}
