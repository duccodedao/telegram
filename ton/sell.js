document.addEventListener('DOMContentLoaded', function() {

    const coinSelect = document.getElementById('coin');

    const networkSelect = document.getElementById('network');

    const quantityInput = document.getElementById('quantity');

    const addressInput = document.getElementById('address');

    const memoOptionSelect = document.getElementById('memoOption');

    const memoInput = document.getElementById('memo');

    const purchaseButton = document.getElementById('purchaseButton');



    // Set default values

    coinSelect.value = '';

    networkSelect.innerHTML = '<option value="" disabled selected>Không</option>';

    quantityInput.value = 0;

    updateButtonText(); // Initialize button text



    coinSelect.addEventListener('change', function() {

        networkSelect.innerHTML = '<option value="" disabled selected>Chọn mạng</option>'; // Clear current options

        

        switch (this.value) {

            case 'TON':

                networkSelect.innerHTML += '<option value="TON">TON</option>';

                quantityInput.placeholder = '0.1 - 9.5';

                quantityInput.min = 0.1;

                quantityInput.max = 9.5;

                quantityInput.step = 0.001;

                break;

            case 'SOL':

                networkSelect.innerHTML += '<option value="spl">SOLANA</option>';

                quantityInput.placeholder = '0.01 - 0.4';

                quantityInput.min = 0.01;

                quantityInput.max = 0.4;

                quantityInput.step = 0.001;

                break;

            case 'NEAR':

                networkSelect.innerHTML += '<option value="near">NEAR</option>';

                quantityInput.placeholder = '0.2 - 20';

                quantityInput.min = 0.2;

                quantityInput.max = 20;

                quantityInput.step = 0.001;

                break;

            case 'BNB':

                networkSelect.innerHTML += '<option value="bep20">BSC (BEP20)</option>';

                quantityInput.placeholder = '0.01 - 0.12';

                quantityInput.min = 0.01;

                quantityInput.max = 0.12;

                quantityInput.step = 0.001;

                break;

            case 'ETH':

                networkSelect.innerHTML += '<option value="arb">ARBITRUM</option><option value="ancient8">ANCIENT 8</option><option value="base">BASE</option>';

                quantityInput.placeholder = '0.001 - 0.02';

                quantityInput.min = 0.001;

                quantityInput.max = 0.02;

                quantityInput.step = 0.001;

                break;

             case 'SUI':

                networkSelect.innerHTML += '<option value="sui">SUI</option>';

                quantityInput.placeholder = '0.24 - 40';

                quantityInput.min = 0.25;

                quantityInput.max = 40;

                quantityInput.step = 0.001;

                break;

             case 'MATIC':

                networkSelect.innerHTML += '<option value="prc20">POLYGON</option>';

                quantityInput.placeholder = '1 - 125';

                quantityInput.min = 1;

                quantityInput.max = 125;

                quantityInput.step = 0.001;

                break;

            default:

                quantityInput.placeholder = '';

                quantityInput.min = 0;

                quantityInput.max = 0;

                quantityInput.step = 0;

                break;

        }

        

        updateButtonText(); // Update button text based on new coin selection

    });



    quantityInput.addEventListener('input', updateButtonText);

    networkSelect.addEventListener('change', updateButtonText);



    function updateButtonText() {

        const coin = coinSelect.value;

        const quantity = quantityInput.value;

        if (quantity && coin) {

            purchaseButton.textContent = `Mua ${quantity} ${coin}`;

        } else {

            purchaseButton.textContent = `Mua`;

        }

    }





    

document.getElementById("openWalletButton").addEventListener("click", function() {

            window.open("https://t.me/wallet/start?startapp", "_blank");

        });







    

    // Handle paste button click

    document.getElementById('pasteButton').addEventListener('click', function() {

        navigator.clipboard.readText().then(text => {

            addressInput.value = text;

        }).catch(err => {

            console.error('Failed to read clipboard contents: ', err);

        });

    });



    // Handle memo option change

    memoOptionSelect.addEventListener('change', function() {

        if (this.value === 'input') {

            memoInput.disabled = false;

        } else {

            memoInput.disabled = true;

            memoInput.value = '';

        }

    });



    // Handle form submission

    document.getElementById('orderForm').addEventListener('submit', function(event) {

        event.preventDefault();



        const coin = coinSelect.value;

        const network = networkSelect.value;

        const quantity = quantityInput.value;

        const address = addressInput.value;

        const memoOption = memoOptionSelect.value;

        const memo = memoOption === 'input' ? memoInput.value : '';



        const url = `https://v1.aliniex.com/sell-token?token=${coin}&network=TON&ref_code=GEmVdVbzWp`;



        Swal.fire({

            title: 'Xác nhận bán',

            html: `Bạn có chắc chắn muốn bán <strong>${coin}</strong> trên mạng <strong>TON</strong>?`,

            icon: 'warning',

            showCancelButton: true,

            confirmButtonText: 'Xác nhận',

            cancelButtonText: 'Hủy'

        }).then((result) => {

            if (result.isConfirmed) {

                window.location.href = url;

            }

        });

    });

});













window.Telegram.WebApp.ready(); // Đảm bảo WebApp đã sẵn sàng



// Tạo một danh sách các URL avatar ngẫu nhiên

const avatars = [

    'av1.png',

    'av2.png',

    'av3.png',

    'av4.png',

    'av5.png',

    'av6.png',

    'av7.png',

    'av8.png',

    'av9.png',

    'av10.png',

    'av11.png',

    'av12.png',

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
