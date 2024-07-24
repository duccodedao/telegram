document.addEventListener("DOMContentLoaded", function () {
    var citis = document.getElementById("city");
    var districts = document.getElementById("district");
    var wards = document.getElementById("ward");
    var Parameter = {
      url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      method: "GET",
      responseType: "application/json",
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
      renderCity(result.data);
    });
  
    function renderCity(data) {
      for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
      }
      citis.onchange = function () {
        districts.length = 1;
        wards.length = 1;
        if (this.value != "") {
          const result = data.filter(n => n.Id === this.value);
  
          for (const k of result[0].Districts) {
            districts.options[districts.options.length] = new Option(k.Name, k.Id);
          }
        }
      };
      districts.onchange = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Id === citis.value);
        if (this.value != "") {
          const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;
  
          for (const w of dataWards) {
            wards.options[wards.options.length] = new Option(w.Name, w.Id);
          }
        }
      };
    }
  
    // Hàm hiển thị thông báo SweetAlert2 khi đăng ký thành công
    function registerSuccess() {
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        text: 'Cảm ơn bạn đã đăng ký.',
        showConfirmButton: false,
        timer: 2000 // Tự đóng sau 2 giây
      });
    }
  
    // Hàm gửi thông tin đăng ký đến Telegram
    function sendTelegramMessage(message) {
      const telegramBotToken = '6789490938:AAFV99ud9KhAOjgaKFaKWh410m3JFQu52Hc';
      const chatId = '-4103703037';
  
      const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('text', message);
  
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
    }
  
    // Bắt sự kiện nút đăng ký được click
    document.getElementById('clubForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Lấy thông tin từ các trường input
      const fullName = document.getElementById('fullName').value;
      const facebook = document.getElementById('facebook').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
  
      // Tạo message
      const message = `Đăng ký mới:\nHọ và tên: ${fullName}\nLink Facebook: ${facebook}\nSố Điện Thoại: ${phone}\nĐịa chỉ: ${address}`;
  
      // Gửi thông tin đăng ký đến Telegram
      sendTelegramMessage(message);
  
      // Hiển thị thông báo thành công sau khi đăng ký thành công
      registerSuccess();
    });
  });
  
  
  
  
  // script.js
  
  document.addEventListener("DOMContentLoaded", function () {
    const openFacebookBtn = document.getElementById("openFacebookBtn");
  
    openFacebookBtn.addEventListener("click", function () {
        // Thay thế "{facebook_username}" bằng tên người dùng Facebook mà bạn muốn chuyển hướng đến
        const facebookUsername = "profile.php?=75548495 ";
  
        // Kiểm tra xem trình duyệt có hỗ trợ URL scheme của Facebook không
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
            window.location = "fb://profile/" + facebookUsername;
        } else if (navigator.userAgent.match(/Android/)) {
            window.location = "fb://facewebmodal/f?href=https://www.facebook.com/" + facebookUsername ;
        } else {
            // Nếu không hỗ trợ, chuyển hướng đến trang web Facebook
            window.open("https://www.facebook.com/" + facebookUsername, "_blank");
        }
    });
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const openFacebookBtn2 = document.getElementById("openFacebookBtn2");
  
    openFacebookBtn2.addEventListener("click", function () {
        // Thay thế "{facebook_username}" bằng tên người dùng Facebook mà bạn muốn chuyển hướng đến
        const facebookUsername = "HongDucClement133";
  
        // Kiểm tra xem trình duyệt có hỗ trợ URL scheme của Facebook không
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
            window.location = "fb://profile/" + facebookUsername;
        } else if (navigator.userAgent.match(/Android/)) {
            window.location = "fb://facewebmodal/f?href=https://www.facebook.com/" + facebookUsername ;
        } else {
            // Nếu không hỗ trợ, chuyển hướng đến trang web Facebook
            window.open("https://www.facebook.com/" + facebookUsername, "_blank");
        }
    });
  });
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const openFacebookBtn3 = document.getElementById("openFacebookBtn3");
  
    openZaloBtn.addEventListener("click", function () {
        // Thay thế "{zalo_username}" bằng tên người dùng Zalo mà bạn muốn chuyển hướng đến
        const openFacebookBtn3 = "0939262443";
  
        // Kiểm tra xem trình duyệt có hỗ trợ URL scheme của Zalo không
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
            window.location = "zalo://profile/" + zaloUsername;
        } else if (navigator.userAgent.match(/Android/)) {
            window.location = "zalo://chat?oid=" + zaloUsername;
        } else {
            // Nếu không hỗ trợ, chuyển hướng đến trang web Zalo
            window.open("https://zalo.me/" + zaloUsername, "_blank");
        }
    });
  });