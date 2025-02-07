function onTelegramAuth(user) {
    const fullName = user.last_name ? `${user.first_name} ${user.last_name}` : user.first_name;
    let premiumText = "Loading...";

    setTimeout(() => {
        premiumText = user.is_premium ? "Có" : "Không";
        document.getElementById("premium").textContent = premiumText;
    }, 2000);

    const userInfo = {
        id: user.id,
        full_name: fullName,
        username: user.username || "Không có",
        photo_url: user.photo_url || "https://via.placeholder.com/80",
        is_premium: premiumText
    };

    localStorage.setItem("telegram_user", JSON.stringify(userInfo));
    saveLoginHistory("Đăng nhập");

    document.getElementById("avatar").src = user.photo_url;
    document.querySelector(".skeleton-loader").style.display = "none";
    document.getElementById("avatar").style.display = "block";

    document.getElementById("id").textContent = user.id;
    document.getElementById("name").textContent = fullName;
    document.getElementById("username").textContent = `@${user.username || "Không có"}`;
    document.getElementById("premium").textContent = premiumText;

    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("tg-login-container").style.display = "none";

    Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Bạn đã đăng nhập vào hệ thống.",
        timer: 2000,
        showConfirmButton: false
    });
}

function logout() {
    localStorage.removeItem("telegram_user");
    saveLoginHistory("Đăng xuất");

    Swal.fire({
        title: "Đăng xuất thành công!",
        text: "Bạn đã đăng xuất khỏi hệ thống.",
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        window.location.reload();
    });
}

function saveLoginHistory(action) {
    let history = JSON.parse(localStorage.getItem("login_history")) || [];
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()} | ${now.getDate()}/${now.getMonth() + 1}`;
    history.push(`${timestamp} - ${action}`);

    localStorage.setItem("login_history", JSON.stringify(history));
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
        document.getElementById("username").textContent = `@${user.username}`;
        document.getElementById("premium").textContent = user.is_premium;

        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("tg-login-container").style.display = "none";
    }
});
