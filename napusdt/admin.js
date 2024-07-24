document.getElementById('fileInput').addEventListener('change', handleFile, false);

function addRow() {
    const walletCode = document.getElementById('walletCode').value;
    const transactionCode = document.getElementById('transactionCode').value;

    if (walletCode && transactionCode) {
        if (isDuplicateTransactionCode(transactionCode)) {
            alert('Mã giao dịch đã tồn tại. Vui lòng nhập mã khác.');
            return;
        }

        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = walletCode;
        newRow.insertCell(1).innerText = transactionCode;
        const actionsCell = newRow.insertCell(2);
        actionsCell.innerHTML = '<button class="delete-btn" onclick="deleteRow(this)">Xóa</button>';

        saveTable();
        clearForm();
    } else {
        alert('Vui lòng điền đầy đủ các trường.');
    }
}

function clearForm() {
    document.getElementById('walletCode').value = '';
    document.getElementById('transactionCode').value = '';
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTable();
}

function isDuplicateTransactionCode(transactionCode) {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows).slice(1);
    return rows.some(row => row.cells[1].innerText === transactionCode);
}

function saveTable() {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows).slice(1);
    const data = rows.map(row => {
        return {
            walletCode: row.cells[0].innerText,
            transactionCode: row.cells[1].innerText
        };
    });
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadTable() {
    const data = JSON.parse(localStorage.getItem('tableData'));
    if (data) {
        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
        data.forEach(rowData => {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerText = rowData.walletCode;
            newRow.insertCell(1).innerText = rowData.transactionCode;
            const actionsCell = newRow.insertCell(2);
            actionsCell.innerHTML = '<button class="delete-btn" onclick="deleteRow(this)">Xóa</button>';
        });
    }
}

function searchTransaction() {
    const input = document.getElementById('searchTransactionCode').value.toLowerCase();
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows).slice(1);
    rows.forEach(row => {
        const transactionCode = row.cells[1].innerText.toLowerCase();
        if (transactionCode.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function exportTable() {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows);
    const data = rows.map(row => Array.from(row.cells).map(cell => cell.innerText));
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
}

function importTable() {
    document.getElementById('fileInput').click();
}

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
        rows.forEach((row, index) => {
            if (index === 0) return; // Bỏ qua hàng tiêu đề
            const newRow = table.insertRow();
            newRow.insertCell(0).innerText = row[0];
            newRow.insertCell(1).innerText = row[1];
            const actionsCell = newRow.insertCell(2);
            actionsCell.innerHTML = '<button class="delete-btn" onclick="deleteRow(this)">Xóa</button>';
        });
        saveTable();
    };
    reader.readAsArrayBuffer(file);
}

window.onload = loadTable;
