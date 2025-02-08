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


