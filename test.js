// URL của API CoinGecko để lấy 10 token phổ biến
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// Hàm lấy dữ liệu từ API và cập nhật vào marquee
async function fetchTokenData() {
    try {
        const response = await fetch(API_URL);
        const tokens = await response.json();

        // Lấy phần tử marquee để cập nhật nội dung
        const marqueeContent = document.getElementById('marqueeContent');
        marqueeContent.innerHTML = ''; // Xóa nội dung cũ

        // Duyệt qua từng token và thêm vào nội dung marquee
        tokens.forEach(token => {
            const priceChange = token.price_change_percentage_24h;
            const tokenElement = document.createElement('span');
            tokenElement.classList.add('token');

            // Đổi màu theo % tăng/giảm
            if (priceChange >= 0) {
                tokenElement.innerHTML = `${token.name} (${priceChange.toFixed(2)}%)`;
                tokenElement.classList.add('green');
            } else {
                tokenElement.innerHTML = `${token.name} (${priceChange.toFixed(2)}%)`;
                tokenElement.classList.add('red');
            }

            marqueeContent.appendChild(tokenElement);
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ CoinGecko:', error);
    }
}

// Gọi hàm fetchTokenData khi tải trang
fetchTokenData();

// Cập nhật dữ liệu mỗi 5 phút
setInterval(fetchTokenData, 300000);
