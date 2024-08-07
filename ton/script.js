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
                quantityInput.step = 0.1;
                break;
            case 'SOL':
                networkSelect.innerHTML += '<option value="spl">SOLANA</option>';
                quantityInput.placeholder = '0.01 - 0.4';
                quantityInput.min = 0.01;
                quantityInput.max = 0.4;
                quantityInput.step = 0.01;
                break;
            case 'NEAR':
                networkSelect.innerHTML += '<option value="near">NEAR</option>';
                quantityInput.placeholder = '0.01 - 0.4';
                quantityInput.min = 0.01;
                quantityInput.max = 0.4;
                quantityInput.step = 0.01;
                break;
            case 'BNB':
                networkSelect.innerHTML += '<option value="bep20">BSC (BEP20)</option>';
                quantityInput.placeholder = '0.01 - 0.12';
                quantityInput.min = 0.01;
                quantityInput.max = 0.12;
                quantityInput.step = 0.01;
                break;
            case 'ETH':
                networkSelect.innerHTML += '<option value="arb">ARBITRUM</option><option value="ancient8">ANCIENT 8</option><option value="base">BASE</option>';
                quantityInput.placeholder = '0.001 - 0.02';
                quantityInput.min = 0.001;
                quantityInput.max = 0.02;
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

        const url = `https://aliniex.com/orders?items=${coin}&amounts=${quantity}&wallet_address=${address}&network=${network}&memo=${memo}&referral_code=GEmVdVbzWp&redirect_to=`;

        Swal.fire({
            title: 'Xác nhận mua',
            html: `Bạn có chắc chắn muốn mua <strong>${quantity} ${coin}</strong> vào ví <strong>${address}</strong> trên mạng <strong>${network}</strong> - Memo <strong>${memo}</strong>?`,
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
