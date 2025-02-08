<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập Telegram</title>
    <link rel="stylesheet" href="wallet.css">
    <!-- SweetAlert2 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  


</head>
<body>
    <div class="container">
        <div class="user-info">
            <div class="avatar-container">
                <div class="skeleton-loader"></div>
                <img id="user-avatar" class="avatar" src="https://via.placeholder.com/80" alt="Avatar">
               
            </div>
            
            
            
            <div class="button-container">
             <button id="send-now" class="btn">Verify 
                 <i class="fa fa-check-circle tick-icon" aria-hidden="true"></i>
            </button>
            <div id="ton-connect"></div>
            </div>


            <div class="user-details">
                <div class="label">ID</div>        <div class="value" id="id" onclick="copyToClipboard(this.textContent)">Loading...</div>
                <div class="label">Name</div>       <div class="value" id="name" onclick="copyToClipboard(this.textContent)">Loading...</div>
                <div class="label">User</div>      <div class="value" id="username" onclick="copyToClipboard(this.textContent)">Loading...</div>
                <div class="label">Verify</div>   <div class="value" id="verify">Checking...</div>
               <div class="label">User</div>      <div class="value" id="premium">Loading...</div>
            </div>

          
<div id="tg-login-container">
<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="bmassk3_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
<script type="text/javascript">
  function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  }
</script>
</div>

<!-- Nút Đăng Xuất -->
<button id="logout-btn" onclick="logout()" style="display: none;">Log out</button>








<div class="footer">
    <a href="#" class="footer-item disabled" onclick="return showDepositAlert();">

        <div class="img-wrapper">
            <img src="/logo-coin/nap.png" alt="MuaCoin">
        </div>
        <span>Deposit</span>
    </a>

    <a href="/main" class="footer-item" onclick="setActive(this)">
        <div class="img-wrapper">
            <img src="/logo-coin/nha.png" alt="Home">
            <span class="new-badge">Hot</span>
        </div>
        <span>Home</span>
    </a>

    <a href="#" class="footer-item" onclick="setActive(this)">
        <div class="img-wrapper">
            <div id="wallet-avatar-container">
                <div class="skeleton-avatar"></div>
                <span class="new-badge">Login</span>
            </div>
        </div>
        <span>Profile</span>
    </a>   
</div>


<script src="/w.js"></script>
<script src="/ton-connect.js"></script>
</body>
</html>
