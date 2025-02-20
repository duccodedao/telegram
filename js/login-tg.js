       function toggleMenu() {
            document.getElementById("navbar").classList.toggle("active");
        }
        
        function onTelegramAuth(user) {
            var userInfo = document.getElementById("user-info");
            var avatarUrl = user.photo_url ? user.photo_url : 'https://via.placeholder.com/30';
            var userHtml = '<img src="' + avatarUrl + '" class="user-avatar">' + user.first_name + (user.last_name ? ' ' + user.last_name : '') + ' (@' + user.username + ')';
            userInfo.innerHTML = userHtml;
            userInfo.style.display = "flex";
            document.getElementById("tg-login-container").style.display = "none";
            
            var userData = {
                first_name: user.first_name,
                last_name: user.last_name || '',
                username: user.username,
                photo_url: avatarUrl,
                timestamp: new Date().getTime()
            };
            localStorage.setItem("userData", JSON.stringify(userData));
        }
        
        function checkLoginStatus() {
            var storedData = localStorage.getItem("userData");
            if (storedData) {
                var userData = JSON.parse(storedData);
                var currentTime = new Date().getTime();
                if (currentTime - userData.timestamp < 60 * 60 * 1000) {
                    var userInfo = document.getElementById("user-info");
                    var userHtml = '<img src="' + userData.photo_url + '" class="user-avatar">' + userData.first_name + (userData.last_name ? ' ' + userData.last_name : '') + ' (@' + userData.username + ')';
                    userInfo.innerHTML = userHtml;
                    userInfo.style.display = "flex";
                    document.getElementById("tg-login-container").style.display = "none";
                } else {
                    localStorage.removeItem("userData");
                }
            }
        }
        
        document.addEventListener("DOMContentLoaded", checkLoginStatus);




  // Link Mini App trên Telegram
        const telegramLink = "https://t.me/bmassk3_bot/?startapp";

        // Kiểm tra nếu đang dùng điện thoại
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = telegramLink; // Chuyển hướng trực tiếp
        } else {
            // Nếu là PC, hiển thị mã QR
            document.getElementById("qr-code").style.display = "block";
            document.getElementById("qr-img").src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(telegramLink);
        }
