function onTelegramAuth(user) {
    const fullName = user.last_name ? ${user.first_name} ${user.last_name} : user.first_name;
    let premiumText = "Checking...";

    // Hiệu ứng loading premium
    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        document.getElementById("premium").textContent = Loading${".".repeat(dots)};
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
        document.getElementById("username").textContent = @${user.username || "No name"};
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

function showLoadingEffect(callback) {
    const fields = ["id", "name", "username", "premium"];
    fields.forEach(field => {
        let dots = 0;
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            document.getElementById(field).textContent = Loading${".".repeat(dots)};
        }, 300);
        setTimeout(() => {
            clearInterval(interval);
            callback();
        }, 1500);
    });
}

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

document.addEventListener("DOMContentLoaded", function () {
    const savedUser = localStorage.getItem("telegram_user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.getElementById("avatar").src = user.photo_url;
        document.querySelector(".skeleton-loader").style.display = "none";
        document.getElementById("avatar").style.display = "block";

        document.getElementById("id").textContent = user.id;
        document.getElementById("name").textContent = user.full_name;
        document.getElementById("username").textContent = @${user.username};
        document.getElementById("premium").textContent = user.is_premium;

        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("tg-login-container").style.display = "none";
    }
});






document.addEventListener("DOMContentLoaded", function () {
    const savedUser = localStorage.getItem("telegram_user");
    const walletContainer = document.getElementById("wallet-avatar-container");

    if (savedUser) {
        const user = JSON.parse(savedUser);
        walletContainer.innerHTML = <img src="${user.photo_url}" alt="Wallet" style="width:30px; height:30px; border-radius:50%;">;
    }
});






// Kiểm tra trạng thái Verify khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    // Lấy trạng thái xác minh từ localStorage
    const isVerified = localStorage.getItem('isVerified');
    
    // Lấy các phần tử DOM
    const userName = document.getElementById('verify')document.addEventListener("DOMContentLoaded", function () {
    const savedUser = localStorage.getItem("telegram_user");
    
    if (savedUser) {
        const user = JSON.parse(savedUser);

        // Hiển thị thông tin người dùng
        document.getElementById("avatar").src = user.photo_url;
        document.querySelector(".skeleton-loader").style.display = "none";
        document.getElementById("avatar").style.display = "block";
        document.getElementById("id").textContent = user.id;
        document.getElementById("name").textContent = user.full_name;
        document.getElementById("username").textContent = @${user.username};
        document.getElementById("premium").textContent = user.is_premium;
        document.getElementById("logout-btn").style.display = "block";
        
        // Ẩn nút đăng nhập
        document.getElementById("tg-login-container").style.display = "none";
    } else {
        // Hiển thị nút đăng nhập
        document.getElementById("tg-login-container").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
    }
});

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
;
    const sendNowBtn = document.getElementById('send-now');

    // Kiểm tra nếu người dùng đã xác minh
    if (isVerified === 'true') {
        updateVerifiedStatus(userName, sendNowBtn);
    }
});

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
