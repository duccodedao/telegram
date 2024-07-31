document.getElementById('coin').addEventListener('change', function() {
    const networkSelect = document.getElementById('network');
    const quantityInput = document.getElementById('quantity');

    networkSelect.innerHTML = ''; // Xóa các lựa chọn mạng hiện có

    if (this.value === 'TON') {
        networkSelect.innerHTML = '<option value="TON">TON</option>';
        quantityInput.placeholder = '0.1 - 9.5';
        quantityInput.min = 0.1;
        quantityInput.max = 9.5;
        quantityInput.step = 0.1;
    } else if (this.value === 'SOL') {
        networkSelect.innerHTML = '<option value="spl">SOLANA</option>';
        quantityInput.placeholder = '0.01 - 0.4';
        quantityInput.min = 0.01;
        quantityInput.max = 0.4;
        quantityInput.step = 0.01;
    } else if (this.value === 'BNB') {
        networkSelect.innerHTML = '<option value="bep20">BSC (BEP20)</option>';
        quantityInput.placeholder = '0.01 - 0.12';
        quantityInput.min = 0.01;
        quantityInput.max = 0.12;
        quantityInput.step = 0.01;
    } else if (this.value === 'ETH') {
        networkSelect.innerHTML = '<option value="arb">ARBITRUM</option><option value="ancient8">ANCIENT 8</option><option value="base">BASE</option>';
        quantityInput.placeholder = '0.001 - 0.02';
        quantityInput.min = 0.001;
        quantityInput.max = 0.02;
        quantityInput.step = 0.001;
    }
});




document.getElementById('copyButton').addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('address').value = text;
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
});








document.getElementById('memoOption').addEventListener('change', function() {
    const memoInput = document.getElementById('memo');
    if (this.value === 'input') {
        memoInput.disabled = false;
    } else {
        memoInput.disabled = true;
        memoInput.value = '';
    }
});

document.getElementById('copyButton').addEventListener('click', function() {
    const addressField = document.getElementById('address');
    navigator.clipboard.writeText(addressField.value).then(() => {
        console.log('Address copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const coin = document.getElementById('coin').value;
    const network = document.getElementById('network').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const memoOption = document.getElementById('memoOption').value;
    const memo = memoOption === 'input' ? document.getElementById('memo').value : '';

    const url = `https://aliniex.com/orders?items=${coin}&amounts=${quantity}&wallet_address=${address}&network=${network}&memo=${memo}&referral_code=GEmVdVbzWp&redirect_to=`;

    Swal.fire({
        title: 'Xác nhận mua',
        html: `Bạn có chắc chắn muốn mua <strong>${quantity} ${coin}</strong> vào ví <strong>${address}</strong> trên mạng <strong>${network}</strong> <strong>- Memo ${memo}</strong>?`,
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
