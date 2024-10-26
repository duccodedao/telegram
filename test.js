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
    'logo-coin/av1.png',
    'logo-coin/av2.png',
    'logo-coin/av3.png',
    'logo-coin/av4.png',
    'logo-coin/av5.png',
    'logo-coin/av6.png',
    'logo-coin/av7.png',
    'logo-coin/av8.png',
    'logo-coin/av9.png',
    'logo-coin/av10.png',
    'logo-coin/av11.png',
    'logo-coin/av12.png',
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
        document.getElementById('user-avatar').src = randomAvatar; // Sử dụng ảnh ngẫu nhiên
    } else {
        // Trường hợp không có thông tin người dùng
        document.getElementById('user-name').textContent = "Loading...";
        document.getElementById('user-username').textContent = "@username";
        document.getElementById('user-avatar').src = randomAvatar; // Sử dụng ảnh ngẫu nhiên
    }
} else {
    console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
}



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

    /// Danh sách các tên người dùng đã xác minh
let verifiedUsers = JSON.parse(localStorage.getItem('verifiedUsers')) || [];

// Hàm thêm icon xác minh và nút "Xác minh ngay"
function addVerifiedIcon() {
    const userNameElement = document.getElementById('user-username');
    
    if (userNameElement) {
        const currentName = userNameElement.textContent.trim();
        const username = currentName.startsWith('@') ? currentName.slice(1) : currentName;

        // Kiểm tra xem tên người dùng đã được xác minh hay chưa
        if (verifiedUsers.includes(username)) {
            if (!userNameElement.querySelector('.verified-icon')) {
                const verifiedIcon = '<i class="fas fa-check-circle verified-icon"></i>';
                userNameElement.innerHTML = `${currentName}${verifiedIcon}`;
            }
        } else {
            const verifyButton = `<button id="verify-button" class="verify-btn">Xác minh ngay</button>`;
            userNameElement.innerHTML = `${currentName}${verifyButton}`;
            
            // Sự kiện click cho nút xác minh
            document.getElementById('verify-button').addEventListener('click', function() {
                const verifiedIcon = '<i class="fas fa-check-circle verified-icon"></i>';
                userNameElement.innerHTML = `${currentName}${verifiedIcon}`;
                saveVerificationStatus(username);
            });
        }
    }
}

// Hàm lưu trạng thái xác minh vào localStorage và gửi thông báo về nhóm Telegram
function saveVerificationStatus(username) {
    verifiedUsers.push(username);
    localStorage.setItem('verifiedUsers', JSON.stringify(verifiedUsers));

    // Gửi thông báo về nhóm Telegram
    sendVerificationMessage(username);
}

// Hàm gửi tin nhắn về nhóm Telegram khi người dùng xác minh thành công
function sendVerificationMessage(username) {
    const botToken = '7840174548:AAF-anFo7OS7YPaGsDrpzG-ZdJzkdyjJfHk';  // Thay bằng bot token của bạn
    const chatId = '@traodoiref_link';  // Thay bằng ID của nhóm chat bạn muốn gửi tin nhắn

    const message = `User: @${username} đã xác minh thành công`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Thông báo xác minh thành công đã được gửi.');
        } else {
            console.error('Lỗi khi gửi thông báo:', data);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối tới Telegram API:', error);
    });
}

// Hàm lấy tên người dùng từ Telegram
function loadTelegramUser() {
    if (Telegram.WebApp.initDataUnsafe) {
        let user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            let userName = user.first_name + " " + (user.last_name || "");
            let username = user.username || "No Username";

            document.getElementById('user-name').textContent = userName;
            document.getElementById('user-username').textContent = `@${username}`;
            
            addVerifiedIcon();
        } else {
            document.getElementById('user-name').textContent = "Loading...";
            document.getElementById('user-username').textContent = "@username";
        }
    } else {
        console.error("Telegram WebApp API không khả dụng.");
    }
}

// Gọi hàm lấy thông tin người dùng
loadTelegramUser();
/ Cập nhật thời gian hoạt động vào localStorage
    localStorage.setItem('activeMinutes', activeMinutes);
    localStorage.setItem('activeSeconds', activeSeconds);

    // Cập nhật hiển thị trên giao diện
    document.getElementById('minutes').textContent = activeMinutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = activeSeconds.toString().padStart(2, '0');
}

// Gọi hàm cập nhật mỗi giây
setInterval(updateActiveTime, 1000);













// 















    // Nội dung trang theo từng ngôn ngữ
    const contentByLanguage = {
        vi: {
            version: 5,
            title: "Tiêu đề trang",
            description: "Mô tả về trang web này.",
            alertTitle: "Cập nhật mới!",
            alertText: "Ứng dụng đã được cập nhật, hãy kiểm tra các tính năng mới!",
            confirmText: "Xem ngay!"
        },
        en: {
            version: 8,
            title: "Page Title",
            description: "Description about this website.",
            alertTitle: "New Update!",
            alertText: "The app has been updated, check out the new features!",
            confirmText: "Check now!"
        }
    };

    // Kiểm tra ngôn ngữ đã chọn trước đó
    let selectedLanguage = localStorage.getItem("selectedLanguage") || "vi";

    // Cập nhật hiển thị phiên bản, ngôn ngữ, và nội dung
    function updateContent() {
        const content = contentByLanguage[selectedLanguage];

        // Cập nhật nội dung thẻ
        document.getElementById('versionText').textContent = content.version;
        document.getElementById('pageTitle').textContent = content.title;
        document.getElementById('pageDescription').textContent = content.description;

        // Kiểm tra xem phiên bản đã thông báo lần cuối
        const lastVersionIndex = localStorage.getItem("lastVersionIndex_" + selectedLanguage);

        if (parseInt(lastVersionIndex) !== content.version) {
            Swal.fire({
                title: content.alertTitle,
                html: '<b>Phiên bản mới:</b> Index ' + content.version + '<br>' + content.alertText,
                icon: 'success',
                confirmButtonText: content.confirmText,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                    confirmButton: 'swal2-confirm'
                }
            }).then(() => {
                // Lưu phiên bản vào localStorage cho ngôn ngữ hiện tại
                localStorage.setItem("lastVersionIndex_" + selectedLanguage, content.version);
            });
        }
    }

    // Gọi hàm để cập nhật nội dung và ngôn ngữ ngay khi tải trang
    updateContent();

    // Xử lý khi thay đổi ngôn ngữ
    document.getElementById('languageSelect').addEventListener('change', function() {
        selectedLanguage = this.value;
        localStorage.setItem("selectedLanguage", selectedLanguage);
        updateContent();
    });

    // Xử lý khi nhấn nút Connect Wallet
    document.getElementById('connectWallet').addEventListener('click', function() {
        Swal.fire({
            title: "Connect Wallet",
            input: "text",
            inputPlaceholder: "Nhập mã ví của bạn",
            showCancelButton: true,
            confirmButtonText: "Lưu",
            preConfirm: (walletAddress) => {
                if (walletAddress) {
                    localStorage.setItem("walletAddress", walletAddress);
                    displayWalletAddress();
                }
            }
        });
    });

    // Hàm hiển thị mã ví theo định dạng abcd...xyzt
    function displayWalletAddress() {
        const walletAddress = localStorage.getItem("walletAddress");
        if (walletAddress) {
            const formattedAddress = walletAddress.slice(0, 4) + "..." + walletAddress.slice(-4);
            document.getElementById("connectWallet").textContent = formattedAddress;
        }
    }

    // Hiển thị mã ví đã lưu khi tải trang
    displayWalletAddress();
