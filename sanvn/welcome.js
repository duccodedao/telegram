function confirmSelection(event, url) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
  Swal.fire({
    title: 'Bạn có chắc chắn với quyết định của mình',
    text: '',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Có',
    cancelButtonText: 'Không'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = url; // Chuyển hướng đến trang chỉ định
    }
  });
}
