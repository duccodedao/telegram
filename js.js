// Lấy danh sách yêu thích từ localStorage
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
}

// Lưu danh sách yêu thích vào localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Hiển thị danh sách yêu thích
function displayFavorites() {
    let favorites = loadFavorites();
    let favoriteAppsContainer = document.getElementById('favorite-apps');
    favoriteAppsContainer.innerHTML = '';

    favorites.forEach(app => {
        favoriteAppsContainer.innerHTML += `
            <div class="app">
                <a href="${app.href}" target="_blank">
                    <img src="${app.src}" alt="${app.name}">
                </a>
                <span>${app.name} <i class="heart" data-app="${app.name}">♥</i></span>
            </div>`;
    });
}

// Xử lý khi bấm vào icon trái tim
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        let appElement = event.target.closest('.app');
        let app = {
            name: event.target.getAttribute('data-app'),
            src: appElement.querySelector('img').getAttribute('src'),
            href: appElement.querySelector('a').getAttribute('href')
        };
        let favorites = loadFavorites();

        // Kiểm tra nếu ứng dụng đã được yêu thích
        let existingAppIndex = favorites.findIndex(fav => fav.name === app.name);

        if (existingAppIndex !== -1) {
            // Nếu app đã có trong yêu thích, thì bỏ đi
            favorites.splice(existingAppIndex, 1);
            event.target.textContent = '♡'; // Thay đổi icon về chưa chọn
        } else {
            // Nếu chưa có thì thêm vào
            favorites.push(app);
            event.target.textContent = '♥'; // Thay đổi icon thành chọn
        }

        saveFavorites(favorites);
        displayFavorites(); // Cập nhật lại danh sách yêu thích
    }
});

// Hiển thị danh sách yêu thích khi load trang
window.onload = function() {
    displayFavorites();
    // Đặt trạng thái icon yêu thích khi trang được tải
    let favorites = loadFavorites();
    document.querySelectorAll('.heart').forEach(heart => {
        let appName = heart.getAttribute('data-app');
        if (favorites.some(app => app.name === appName)) {
            heart.textContent = '♥';
        }
    });
};


window.Telegram.WebApp.ready(); // Đảm bảo WebApp đã sẵn sàng

// Tạo một danh sách các URL avatar ngẫu nhiên
const avatars = [
    '/logo-coin/av1.png',
    '/logo-coin/av2.png',
    '/logo-coin/av3.png',
    '/logo-coin/av4.png',
    'logo-coin/av5.png',
    '/logo-coin/av6.png',
    '/logo-coin/av7.png',
    '/logo-coin/av8.png',
    '/logo-coin/av9.png',
    '/logo-coin/av10.png',
    '/logo-coin/av11.png',
    '/logo-coin/av12.png',
];

// Lấy một ảnh đại diện ngẫu nhiên
const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

// Lấy thông tin người dùng nếu có sẵn
if (Telegram.WebApp.initDataUnsafe) {
    let user = Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let userName = user.first_name + " " + (user.last_name || "");
        let username = user.username || "No Username"; // Thay thế nếu không có username

        // Cập nhật vào phần HTML
        document.getElementById('user-name').textContent = userName;
        document.getElementById('user-username').textContent = `@${username}`;
        
    } else {
        // Trường hợp không có thông tin người dùng
        document.getElementById('user-name').textContent = "Loading...";
        document.getElementById('user-username').textContent = "@username";
    
    }
} else {
    console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
}


window.addEventListener('load', () => {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        // Lấy thông tin từ Telegram WebApp
        const user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            const username = user.username || 'default'; // Sử dụng 'default' nếu không có username
            const avatarUrl = `https://t.me/i/userpic/160/${username}.jpg`;

            // Hiển thị username và ảnh đại diện
            document.getElementById('user-username').innerText = `@${username}`;
            document.getElementById('user-avatar').src = avatarUrl;

            console.log("Thông tin người dùng:", user);
        } else {
            console.warn("Không tìm thấy thông tin người dùng.");
        }
    } else {
        console.warn("Telegram WebApp API không khả dụng.");
    }
});

















    function updateCountdowns() {
        const countdownElements = document.querySelectorAll(".countdown-time");
        const now = new Date();

        countdownElements.forEach(element => {
            const endTime = new Date(element.dataset.time);
            const remainingTime = Math.max(0, endTime - now);

            if (remainingTime > 0) {
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                const minutes = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(2, '0');
                const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0');
                element.textContent = `${days}day ${hours}:${minutes}:${seconds}`;
            } else {
                element.textContent = "Updating...";
            }
        });
    }

    setInterval(updateCountdowns, 1000);
    updateCountdowns();









// Kiểm tra trạng thái Verify khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    // Lấy trạng thái xác minh từ localStorage
    const isVerified = localStorage.getItem('isVerified');
    
    // Lấy các phần tử DOM
    const userName = document.getElementById('user-name');
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
    const userName = document.getElementById('user-name');

    try {
        // Disable button và thay đổi trạng thái thành "Sending..."
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div> <span> Sending...</span>';

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
