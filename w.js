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

    document.getElementById("avatar").src = user.photo_url;
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


function logout() {
    saveLoginHistory("Đăng xuất");
    // Hiển thị loading trước khi chuyển hướng
    document.getElementById("loading").style.display = "block";
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
