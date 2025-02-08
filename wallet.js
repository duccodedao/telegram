// Hàm xử lý đăng nhập từ Telegram
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

    document.getElementById("avatar").src = user.photo_url || "https://via.placeholder.com/80";
    document.querySelector(".skeleton-loader").style.display = "none";
    document.getElementById("avatar").style.display = "block";

    showLoadingEffect(() => {
        document.getElementById("id").textContent = user.id;
        document.getElementById("name").textContent = fullName;
        document.getElementById("username").textContent = `@${user.username || "No name"}`;
        document.getElementById("premium").textContent = premiumText;
    });

    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("tg-login-container").style.display = "none";

    Swal.fire({
        title: "Successful!",
        text: "You are logged into the system.",
        timer: 2000,
        showConfirmButton: false
    });
}

// Hàm hiệu ứng loading
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

// Sao chép thông tin vào clipboard
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

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    const savedUser = localStorage.getItem("telegram_user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.getElementById("avatar").src = user.photo_url;
        document.querySelector(".skeleton-loader").style.display = "none";
        document.getElementById("avatar").style.display = "block";

        document.getElementById("id").textContent = user.id;
        document.getElementById("name").textContent = user.full_name;
        document.getElementById("username").textContent = `@${user.username}`;
        document.getElementById("premium").textContent = user.is_premium;

        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("tg-login-container").style.display = "none";
    }
});

// Đăng xuất
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

// Cập nhật trạng thái xác minh
document.addEventListener('DOMContentLoaded', () => {
    const isVerified = localStorage.getItem('isVerified');
    const verifyStatus = document.getElementById('verify');
    const sendNowBtn = document.getElementById('send-now');

    if (isVerified === 'true') {
        verifyStatus.innerHTML = 'Verified <img src="https://duccodedao.github.io/telegram/logo-coin/gold_tick.png" class="verify-icon">';
        sendNowBtn.innerHTML = '<span>Verified</span>';
        sendNowBtn.disabled = true;
    }
});

// Xử lý gửi giao dịch khi nhấn nút
document.getElementById('send-now').addEventListener('click', async () => {
    const sendNowBtn = document.getElementById('send-now');
    const userName = document.getElementById('verify');

    try {
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div> <span> Sending</span>';

        await tonConnectUI.sendTransaction(transaction);

        updateVerifiedStatus(userName, sendNowBtn);
        localStorage.setItem('isVerified', 'true');
    } catch (error) {
        console.error("Error sending transaction:", error);
        sendNowBtn.innerHTML = '<span>Try Again</span>';
        sendNowBtn.disabled = false;
    }
});

// Cập nhật trạng thái xác minh
function updateVerifiedStatus(userName, sendNowBtn) {
    userName.innerHTML += '<span class="verified-tick"></span>';
    sendNowBtn.innerHTML = '<span>Verified</span>';
    sendNowBtn.disabled = true;
    sendNowBtn.classList.add('verified');
}

// Hàm giả lập kết nối ví
function connectToWallet() {
    console.log("Đã kết nối ví thành công!");
}

// Payload giao dịch (cập nhật thông tin giao dịch của bạn tại đây)
const transaction = {
    valid_until: Math.floor(Date.now() / 1000) + 3600,
    messages: [
        {
            address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", 
            amount: "1",
        }
    ]
};
