
    // Khởi tạo TonConnectUI
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
        buttonRootId: 'ton-connect' // Nút kết nối sẽ hiển thị tại đây
    });

    // Cấu hình thêm tuỳ chọn nếu cần
    tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/bmassk3_bot/BmassK3'
    };

    // Hàm kết nối với ví
    async function connectToWallet() {
        try {
            const connectedWallet = await tonConnectUI.connectWallet();
            console.log("Connected Wallet:", connectedWallet);

            // Hiển thị thông tin ví
            document.getElementById('wallet-info').style.display = 'block';
            document.getElementById('balance').innerText = `Số dư: Đang tải...`;

            // Lấy số dư và cập nhật giao diện
            const address = connectedWallet.account.address;
            const balance = await tonConnectUI.getBalance(address); // Dùng API để lấy số dư thật
            document.getElementById('balance').innerText = `Số dư: ${balance} TON`;
        } catch (error) {
            console.error("Lỗi khi kết nối ví:", error);
        }
    }

    // Hàm ngắt kết nối ví
    async function disconnectWallet() {
        try {
            await tonConnectUI.disconnect();
            document.getElementById('wallet-info').style.display = 'none';
            console.log("Đã ngắt kết nối ví.");
        } catch (error) {
            console.error("Lỗi khi ngắt kết nối ví:", error);
        }
    }





    // Lấy số dư BMC từ localStorage hoặc mặc định là 0
    let balance = localStorage.getItem('bmcBalance') ? parseInt(localStorage.getItem('bmcBalance')) : 0;

    // Hiển thị số dư trên trang
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `${balance} $BMC `;

    // Gọi hàm kết nối khi tải trang
    connectToWallet();

    // Payload giao dịch
    const transaction = {
        valid_until: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour)
        messages: [
            {
                address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", // Thay thế bằng địa chỉ đích
                amount: "100000", // 0.02 TON in nanotons
                text: "claim_BMCoin",
            }
        ]
    };

    // Xử lý gửi giao dịch
    document.getElementById('send-now').addEventListener('click', async () => {
        try {
            // Disable button và thay đổi trạng thái thành Sending...
            const sendNowBtn = document.getElementById('send-now');
            sendNowBtn.disabled = true;
            sendNowBtn.innerHTML = '<div class="spinner"></div><span> Sending...</span>';

            // Gửi giao dịch
            await tonConnectUI.sendTransaction(transaction);

            // Nếu giao dịch thành công, cập nhật trạng thái và cộng 1000 BMC
            sendNowBtn.innerHTML = '<span>Done</span>';
            sendNowBtn.disabled = true;
            
            // Cộng 1000 BMC
            balance += 1000000000;

            // Lưu số dư mới vào localStorage
            localStorage.setItem('bmcBalance', balance);

            // Cập nhật hiển thị số dư trên trang
            balanceElement.textContent = `${balance} $BMC`;

            console.log("Transaction sent successfully:", transaction);
        } catch (error) {
            console.error("Error sending message:", error);
            const sendNowBtn = document.getElementById('send-now');
            sendNowBtn.innerHTML = '<span>Trade again</span>';
            sendNowBtn.disabled = false; // Cho phép người dùng gửi lại giao dịch nếu có lỗi
        }
    });

    // Hàm giả lập connectToWallet (cần thay bằng hàm kết nối thực tế)
    function connectToWallet() {
        console.log("Đã kết nối ví thành công!");
    }












    

    // Danh sách ảnh đại diện ngẫu nhiên
    const avatars = [
        '/logo-coin/av1.png',
        '/logo-coin/av2.png',
        '/logo-coin/av3.png',
        '/logo-coin/av4.png',
        '/logo-coin/av5.png',
        '/logo-coin/av6.png',
        '/logo-coin/av7.png',
        '/logo-coin/av8.png',
        '/logo-coin/av9.png',
        '/logo-coin/av10.png',
        '/logo-coin/av11.png',
        '/logo-coin/av12.png',
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

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
                
            } else {
                console.log("Không có thông tin người dùng.");
            }
        } else {
            console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
        }
    });





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














    



        // Hàm tham gia nhóm Telegram
    function joinGroup() {
        // Mở liên kết đến nhóm Telegram
        window.open("https://t.me/bmassk3_channel", "_blank");
    }
    function joinWallet() {
        // Mở liên kết đến nhóm Telegram
        window.open("https://t.me/wallet/start?startapp", "_blank");
    }
    function joinExchange() {
        // Mở liên kết đến nhóm Telegram
        window.open("https://bmasshd.click/exchange.html", "_blank");
    }


    async function fetchTokenPrice(instId, elementId) {
            try {
                const url = `https://www.okx.com/api/v5/market/ticker?instId=${instId}-USDT`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Coming soon ✨ - ${instId}`);
                }

                const data = await response.json();

                if (!data.data || data.data.length === 0) {
                    throw new Error(`Coming soon - ✨ ${instId}`);
                }

                const tokenPrice = data.data[0].last;
                document.getElementById(elementId).textContent = `$${tokenPrice}`;
            } catch (error) {
                console.error('Lỗi:', error);
                document.getElementById(elementId).textContent = `${instId} | Coming Soon ✨`;
            }
        }

        fetchTokenPrice('TON', 'tonPrice');
        fetchTokenPrice('PAWS', 'pawsPrice');
        fetchTokenPrice('SEED', 'seedPrice');
        fetchTokenPrice('SOON', 'soonPrice');
        fetchTokenPrice('CLAY', 'clayPrice');
        fetchTokenPrice('BTC', 'btcPrice');
        fetchTokenPrice('VERT', 'vertPrice');
        fetchTokenPrice('TAPS', 'tapsPrice');

        setInterval(() => {
        fetchTokenPrice('TON', 'tonPrice');
        fetchTokenPrice('PAWS', 'pawsPrice');
        fetchTokenPrice('SEED', 'seedPrice');
        fetchTokenPrice('SOON', 'soonPrice');
        fetchTokenPrice('CLAY', 'clayPrice');
        fetchTokenPrice('BTC', 'btcPrice');
        fetchTokenPrice('VERT', 'vertPrice');
        fetchTokenPrice('TAPS', 'tapsPrice');
        }, 10000);



    // Thay YOUR_BOT_TOKEN bằng token bot của bạn và @your_channel_username bằng tên channel cần đếm
        const BOT_TOKEN = '7840174548:AAF-anFo7OS7YPaGsDrpzG-ZdJzkdyjJfHk';
        const CHANNEL_USERNAME = '@bmassk3_channel';

        function getMemberCount() {
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMembersCount?chat_id=${CHANNEL_USERNAME}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        document.getElementById('memberCount').textContent = `Channel: ${data.result} Member active`;
                    } else {
                        document.getElementById('memberCount').textContent = "Không thể lấy số lượng thành viên";
                        console.error("Lỗi:", data.description);
                    }
                })
                .catch(error => {
                    document.getElementById('memberCount').textContent = "Có lỗi xảy ra";
                    console.error("Lỗi:", error);
                });
        }

        // Gọi hàm getMemberCount mỗi 10 giây để tự động cập nhật số lượng thành viên
        setInterval(getMemberCount, 10000);
        
        // Gọi lần đầu ngay lập tức khi trang được tải
        getMemberCount();
















   function updateTONChange(changeElementId, change24h) {
    const changeElement = document.getElementById(changeElementId);

    // Nếu không có dữ liệu về thay đổi, đặt mặc định là 0%
    const changePercentage = change24h !== null ? change24h.toFixed(2) : 0;

    // Cập nhật phần trăm thay đổi và màu sắc
    changeElement.textContent = `(${changePercentage}%)`;
    if (change24h > 0) {
        changeElement.classList.add("increase");
        changeElement.classList.remove("decrease");
    } else if (change24h < 0) {
        changeElement.classList.add("decrease");
        changeElement.classList.remove("increase");
    } else {
        changeElement.classList.remove("increase", "decrease"); // Không màu nếu thay đổi là 0%
    }
}
// Tích hợp API
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
        // Lấy dữ liệu của TON
        const ton = data.find(coin => coin.symbol === "ton");
        if (ton) {
            updateTONChange("tonChange", ton.price_change_percentage_24h);
        } else {
            // Nếu không tìm thấy TON, hiển thị mặc định
            updateTONChange("tonChange", 0);
        }
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        // Nếu xảy ra lỗi API, đặt mặc định
        updateTONChange("tonChange", 0);
    });
// Tích hợp API
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
        // Lấy dữ liệu của TON
        const ton = data.find(coin => coin.symbol === "btc");
        if (ton) {
            updateTONChange("btcChange", ton.price_change_percentage_24h);
        } else {
            // Nếu không tìm thấy TON, hiển thị mặc định
            updateTONChange("btcChange", 0);
        }
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        // Nếu xảy ra lỗi API, đặt mặc định
        updateTONChange("btcChange", 0);
    });



    document.getElementById('balance').addEventListener('click', function() {
        const tokenInfo = document.getElementById('token-info');
        tokenInfo.style.display = tokenInfo.style.display === 'block' ? 'none' : 'block';
    });
    
