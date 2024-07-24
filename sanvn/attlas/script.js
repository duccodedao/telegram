function copyToClipboard() {
    var copyText = document.getElementById("affiliate-code-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Swal.fire({
        icon: 'success',
        title: 'Sao chép thành công!',
        text: 'Mã giới thiệu đã được sao chép vào Clipboard.',
    });
}

var copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyToClipboard);

function openLink() {
    var link = document.getElementById("affiliate-link-input").value;
    var code = document.getElementById("affiliate-code-input").value;
    var fullLink = link + code;
    window.open(fullLink);
}

// Thay đổi nội dung trong ô mã giới thiệu
function changeAffiliateCode(newCode) {
    var affiliateCodeInput = document.getElementById("affiliate-code-input");
    affiliateCodeInput.value = newCode;
}

// Gọi hàm changeAffiliateCode với mã giới thiệu mới
changeAffiliateCode("Mã giới thiệu mới");





  

  function downloadApp() {
    // Hiển thị thông báo trước khi chuyển hướng
    Swal.fire({
      title: 'Đăng ký tài khoảng',
      text: 'Bạn có muốn đăng ký không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        // Chuyển hướng đến đường link tải ứng dụng nếu người dùng đồng ý
        window.location.href = "https://app.attlas.io/refer_59474065";
      }
    });
  }
  


