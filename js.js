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







// Biến lưu số phút và giây
let activeMinutes = 0;
let activeSeconds = 0;

// Kiểm tra nếu đã có dữ liệu thời gian trong localStorage
if (localStorage.getItem('activeMinutes')) {
    activeMinutes = parseInt(localStorage.getItem('activeMinutes'));
}

if (localStorage.getItem('activeSeconds')) {
    activeSeconds = parseInt(localStorage.getItem('activeSeconds'));
}

// Hàm cập nhật thời gian hoạt động
function updateActiveTime() {
    activeSeconds++;
    if (activeSeconds === 60) {
        activeMinutes++;
        activeSeconds = 0;
    }

    // Cập nhật thời gian hoạt động vào localStorage
    localStorage.setItem('activeMinutes', activeMinutes);
    localStorage.setItem('activeSeconds', activeSeconds);

    // Cập nhật hiển thị trên giao diện
    document.getElementById('minutes').textContent = activeMinutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = activeSeconds.toString().padStart(2, '0');
}

// Gọi hàm cập nhật mỗi giây
setInterval(updateActiveTime, 1000);





// Danh sách các tên người dùng đã xác minh (có thể thêm sẵn hoặc lấy từ localStorage)
let verifiedUsers = JSON.parse(localStorage.getItem('verifiedUsers')) || [];

// Hàm thêm icon xác minh và nút "Xác minh ngay"
function addVerifiedIcon() {
    const userNameElement = document.getElementById('user-username');
    
    if (userNameElement) {
        // Lấy nội dung hiện tại của tên người dùng
        const currentName = userNameElement.textContent.trim();
        const username = currentName.startsWith('@') ? currentName.slice(1) : currentName;

        // Kiểm tra xem tên người dùng đã được xác minh hay chưa
        if (verifiedUsers.includes(username)) {
            // Nếu đã được xác minh, thêm icon tick xanh (nếu chưa có)
            if (!userNameElement.querySelector('.verified-icon')) {
                const verifiedIcon = '<i class="fas fa-check-circle verified-icon" style="color: green; margin-left: 5px;"></i>';
                userNameElement.innerHTML = `${currentName}${verifiedIcon}`;
            }
        } else {
            // Nếu chưa được xác minh, thêm nút "Xác minh ngay" (chỉ thêm một lần)
            if (!userNameElement.querySelector('#verify-button')) {
                const verifyButton = `<button id="verify-button" class="verify-btn" style="margin-left: 10px;">Xác minh ngay</button>`;
                userNameElement.innerHTML = `${currentName}${verifyButton}`;
                
                // Thêm sự kiện click cho nút xác minh
                document.getElementById('verify-button').addEventListener('click', function() {
                    // Thêm icon tick xanh ngay lập tức
                    const verifiedIcon = '<i class="fas fa-check-circle verified-icon" style="color: green; margin-left: 5px;"></i>';
                    userNameElement.innerHTML = `${currentName}${verifiedIcon}`;

                    // Lưu trạng thái xác minh
                    saveVerificationStatus(username);
                });
            }
        }
    }
}

// Hàm lưu trạng thái xác minh vào localStorage
function saveVerificationStatus(username) {
    if (!verifiedUsers.includes(username)) {
        verifiedUsers.push(username);
        localStorage.setItem('verifiedUsers', JSON.stringify(verifiedUsers));
    }
}

// Hàm lấy tên người dùng từ Telegram
function loadTelegramUser() {
    if (Telegram.WebApp.initDataUnsafe) {
        const user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            const userName = user.first_name + " " + (user.last_name || "");
            const username = user.username || ""; // Để trống nếu không có username

            // Cập nhật vào phần HTML
            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-username').textContent = username ? `@${username}` : "Không có username";
            
            // Gọi hàm thêm icon xác minh sau khi có tên người dùng
            if (username) addVerifiedIcon();
        } else {
            // Trường hợp không có thông tin người dùng
            document.getElementById('user-name').textContent = "No name";
            document.getElementById('user-username').textContent = "@username";
        }
    } else {
        console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
    }
}

// Gọi hàm lấy thông tin người dùng
loadTelegramUser();










function setActive(element) {
        // Xóa lớp 'active' khỏi tất cả các mục
        const items = document.querySelectorAll('.footer-item');
        items.forEach(item => item.classList.remove('active'));

        // Thêm lớp 'active' vào mục được nhấp vào
        element.classList.add('active');
    }

    // Chọn mục đầu tiên là active khi load trang
    document.addEventListener('DOMContentLoaded', () => {
        const firstItem = document.querySelector('.footer-item');
        if (firstItem) {
            setActive(firstItem);
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
