document.getElementById('download-link').addEventListener('click', function() {
    swal.fire({
        title: 'Tải thành công!',
        text: 'File blum.js đã được tải xuống thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        window.open(this.getAttribute('data-url'), '_blank');
    });
});

document.getElementById('back-to-home').addEventListener('click', function() {
    window.location.href = 'https://bmasshd.click';  // Thay đổi URL này thành trang chủ của bạn
});
