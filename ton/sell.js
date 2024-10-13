document.addEventListener('DOMContentLoaded', function() {
    const coinSelect = document.getElementById('coin');
    const purchaseButton = document.getElementById('purchaseButton');

    // Cập nhật nội dung của nút "Bán" khi thay đổi loại coin
    coinSelect.addEventListener('change', updateButtonText);

    function updateButtonText() {
        const coin = coinSelect.value;
        if (coin) {
            purchaseButton.textContent = `Bán ${coin}`;
        } else {
            purchaseButton.textContent = `Bán`;
        }
    }

    // Xử lý khi người dùng nhấn "Bán"
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const coin = coinSelect.value;

        if (!coin) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chọn loại coin!',
            });
            return;
        }

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

    // Xử lý khi nhấn vào nút "Wallet"
    document.getElementById('openWalletButton').addEventListener('click', function() {
        window.open("https://t.me/wallet/start?startapp", "_blank");
    });
});
