

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
            if (username === '@BmassK3') {
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
