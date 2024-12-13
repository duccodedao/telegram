// Xử lý gửi giao dịch
document.getElementById('task-btn').addEventListener('click', async () => { // Thay đổi id tại đây
    try {
        // Disable button và thay đổi trạng thái thành Sending...
        const sendNowBtn = document.getElementById('task-btn'); // Thay đổi id tại đây
        sendNowBtn.disabled = true;
        sendNowBtn.innerHTML = '<div class="spinner"></div><span> Sending...</span>';

        // Gửi giao dịch
        await tonConnectUI.sendTransaction(transaction);

        // Nếu giao dịch thành công, cập nhật trạng thái và cộng 1000 BMC
        sendNowBtn.innerHTML = '<span>Done</span>';
        sendNowBtn.disabled = true;

        // Cộng 1000 BMC
        bmcBalance += 1000000000;

        // Lưu số dư mới vào localStorage
        localStorage.setItem('bmcBalance', bmcBalance);

        // Cập nhật hiển thị số dư trên trang
        balanceElement.textContent = `${bmcBalance} $BMC`;

        console.log("Transaction sent successfully:", transaction);
    } catch (error) {
        console.error("Error sending message:", error);
        const sendNowBtn = document.getElementById('task-btn'); // Thay đổi id tại đây
        sendNowBtn.innerHTML = '<span>Trade again</span>';
        sendNowBtn.disabled = false; // Cho phép người dùng gửi lại giao dịch nếu có lỗi
    }
});

// Gọi hàm kết nối khi tải trang
connectToWallet();
