document.addEventListener('DOMContentLoaded', (event) => {
    // Lấy số lần truy cập từ Local Storage
    let visitCount = localStorage.getItem('visitCount');

    // Nếu chưa có giá trị thì đặt là 0
    if (visitCount === null) {
        visitCount = 0;
    }

    // Tăng số lần truy cập lên 1
    visitCount++;

    // Cập nhật giá trị trong Local Storage
    localStorage.setItem('visitCount', visitCount);

    // Hiển thị số lần truy cập trên trang
    document.getElementById('visitCount').innerText = visitCount;
});



window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');

    // Giả lập việc tải nội dung trong 3 giây
    setTimeout(function() {
        loadingScreen.style.display = 'none';
    }, 3000);
});




document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.getElementById('menu-toggle');
    var sidebar = document.getElementById('sidebar');
    var menuIcon = document.querySelector('.menu-toggle .menu-icon');
    var closeIcon = document.querySelector('.menu-toggle .close-icon');

    menuToggle.addEventListener('click', function() {
        if (sidebar.style.left === '-300px') {
            sidebar.style.left = '0';
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'inline';
        } else {
            sidebar.style.left = '-300px';
            menuIcon.style.display = 'inline';
            closeIcon.style.display = 'none';
        }
    });

    var submenuToggle = document.getElementById('link-1-toggle');
    var submenu = document.getElementById('link-1-submenu');

    submenuToggle.addEventListener('click', function(event) {
        event.preventDefault();
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            submenu.style.display = 'block';
        } else {
            submenu.style.display = 'none';
        }
    });
});












// Biến để lưu trữ dữ liệu tiền điện tử
let cryptoData = [];

// Hàm lấy dữ liệu từ CoinGecko API
function fetchCryptoData() {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false';

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            cryptoData = data; // Lưu dữ liệu vào biến toàn cục
            return data;
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error);
        });
}

// Hàm hiển thị dữ liệu tỉ giá thị trường crypto
function displayCryptoData(data) {
    var cryptoPricesElement = document.getElementById('cryptoPrices');
    cryptoPricesElement.innerHTML = ''; // Xóa nội dung cũ trước khi thêm dữ liệu mới

    for (const coin of data) {
        var cryptoSymbol = coin.symbol.toUpperCase();
        var cryptoPrice = parseFloat(coin.current_price).toFixed(8);
        var listItem = document.createElement('li');
        listItem.classList.add('crypto-item');
        listItem.innerHTML = `<span class="crypto-symbol">${cryptoSymbol}</span>: <span class="crypto-price">$${cryptoPrice}</span>`;
        cryptoPricesElement.appendChild(listItem);
    }
}

// Hàm cập nhật dữ liệu giá crypto
function updateCryptoPrices() {
    fetchCryptoData()
        .then(data => {
            displayCryptoData(data);
            displayLastUpdatedTime();
        });
}

// Hàm hiển thị thời gian cập nhật
function displayLastUpdatedTime() {
    var lastUpdatedElement = document.getElementById('lastUpdated');
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // Số tháng tính từ 0
    var year = currentTime.getFullYear();

    // Định dạng thời gian cập nhật
    var updateTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ' ' + day + '/' + month + '/' + year;
    lastUpdatedElement.textContent = 'Dữ liệu được cập nhật lúc: ' + updateTime;
}

// Hàm tìm kiếm và lọc dữ liệu tiền điện tử
function searchCrypto() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.symbol.toLowerCase().includes(query));
    displayCryptoData(filteredData);
}

// Lắng nghe sự kiện nhập liệu trên thanh tìm kiếm
document.getElementById('searchBar').addEventListener('input', searchCrypto);

// Cập nhật giá crypto khi trang web được load lại
updateCryptoPrices();
// Cập nhật giá crypto mỗi 5 phút
setInterval(updateCryptoPrices, 300000); // 300000 milliseconds = 5 minutes









function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}





 window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8PJY7SWBRR');
