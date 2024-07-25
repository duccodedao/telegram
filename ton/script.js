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
    navigator.clipboard.readText().then(text => {
        document.getElementById('address').value = text;
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const memoOption = document.getElementById('memoOption').value;
    const memo = memoOption === 'input' ? document.getElementById('memo').value : '';

    const url = `https://aliniex.com/orders?items=TON&amounts=${quantity}&wallet_address=${address}&network=TON&memo=${memo}&referral_code=GEmVdVbzWp&redirect_to=`;

    Swal.fire({
        title: 'Xác nhận mua',
        html: `Bạn có chắc chắn muốn mua <strong>${quantity} TON</strong> vào ví <strong>${address}</strong> <strong>- Memo ${memo}</strong>?`,
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
