$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const input_hoten = $('#input_hoten');
const input_diem = $('#input_diem');
const btn = $('#Addbtn');
const danhsachsv = $('.danhsachsv');
const tbody = danhsachsv.querySelector('#tbody');
const tongsv = $('#tongsv');
const diemtb = $('#diemtb');
const searchInput = $('#searchInput');
const locsinhvien=$('#locxeploai');
const diemsinhvien = $('#diem');
let sinhviens = JSON.parse(localStorage.getItem('sinhviens')) || [];

function saveData() {
    localStorage.setItem('sinhviens', JSON.stringify(sinhviens));
}

btn.addEventListener('click', function (e) {
    e.preventDefault();

    const hoten = input_hoten.value.trim();
    const diemStr = input_diem.value.trim();
    const diem = Number(diemStr);

    if (hoten === '' || diemStr === '') {
        alert('Vui long nhap du thong tin');
        return;
    }

    if (isNaN(diem) || diem < 0 || diem > 10) {
        alert('Diem phai la so tu 0 den 10');
        return;
    }

    let sinhvien = {
        id: Date.now(),
        hoten: hoten,
        diem: diem
    };

    sinhviens.push(sinhvien);
    saveData();
    renderTable();
});

tbody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const id = Number(e.target.dataset.id);
        sinhviens = sinhviens.filter(sinhvien => sinhvien.id !== id);
        saveData();

        const query = searchInput.value.trim().toLowerCase();
        if (query === '') {
            renderTable();
        } else {
            const filteredSinhviens = sinhviens.filter(sinhvien =>
                sinhvien.hoten.toLowerCase().includes(query)
            );
            renderTable(filteredSinhviens);
        }
    }
});

function renderTable(data = sinhviens) {
    let nd = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Khong co sinh vien nao</td></tr>';
    } else {
        data.forEach((sinhvien, index) => {
            const cl = sinhvien.diem < 5 ? 'style="background-color:yellow"' : '';
            const tr = `<tr ${cl}>
                <td>${index + 1}</td>
                <td>${sinhvien.hoten}</td>
                <td>${sinhvien.diem}</td>
                <td>${xeploai(sinhvien.diem)}</td>
                <td><button class="edit-btn" type="button">Sua</button></td>
                <td><button class="delete-btn" type="button" data-id="${sinhvien.id}">Xoa</button></td>
            </tr>`;
            nd += tr;
        });

        tbody.innerHTML = nd;
    }

    tongsv.textContent = `Tong so sinh vien: ${sinhviens.length}`;

    const diemtbValue =
        sinhviens.length > 0
            ? sinhviens.reduce((acc, sinhvien) => acc + sinhvien.diem, 0) / sinhviens.length
            : 0;

    diemtb.textContent = `Diem trung binh: ${diemtbValue.toFixed(2)}`;

    input_diem.value = '';
    input_hoten.value = '';
    input_hoten.focus();
}

function xeploai(diem) {
    if (diem >= 8.5) return 'Gioi';
    if (diem >= 7) return 'Kha';
    if (diem >= 5) return 'Trung binh';
    return 'Yeu';
}

input_diem.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
    }
});
searchInput.addEventListener('input',  kethop);
locsinhvien.addEventListener('change', kethop);
var slclick= 0;
diemsinhvien.addEventListener('click', function () {
    slclick++;
    console.log("hello");
    if(slclick%2===0){
        const sortedSinhviens = [...sinhviens].sort((a, b) => a.diem - b.diem);
        renderTable(sortedSinhviens);
    }
    else{
         const sortedSinhviens = [...sinhviens].sort((a, b) => b.diem - a.diem);
         renderTable(sortedSinhviens);
    }
})
renderTable();


function kethop(selectedValue, query) {
    var selectedValue = locsinhvien.value;
var query= searchInput.value.trim().toLowerCase();
    let filteredSinhviens = sinhviens;
    if (selectedValue !== 'tatca') {
        filteredSinhviens = sinhviens.filter(sinhvien => xeploai(sinhvien.diem) === selectedValue);
    }  
    if (query) {
        filteredSinhviens = filteredSinhviens.filter(sinhvien => sinhvien.hoten.toLowerCase().includes(query));
    }
    if (filteredSinhviens.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Khong tim thay sinh vien</td></tr>';
        return;
    }
    renderTable(filteredSinhviens)
    return filteredSinhviens;
}
// submit_register.addEventListener('click', function (e) {
//     if (!validateForm()) {
//         e.preventDefault();
//     }
// });
// function validateForm() { 
//     const username = $('#username').value.trim();
//     const email = $('#email').value.trim();
//     const sdt = $('#sdt').value.trim();
//     const password = $('#password').value.trim();
//     const confirmPassword = $('#confirmPassword').value.trim();
//     const gioitinh = $('#gioitinh').value;
//     const dieukhoan = $('.dieukhoan').checked;

//     if (!username || !email || !sdt || !password || !confirmPassword) {
//         alert('Vui lòng điền đầy đủ thông tin');
//         return false;
//     }

//     if (username.length < 3 || !/^[a-zA-ZÀ-ỹ\s]+$/.test(username)) {
//         alert('Tên đăng nhập phải có ít nhất 3 ký tự và chỉ chứa chữ cái, khoảng trắng');
//         return false;
//     }

//     if (!/^\d{10}$/.test(sdt)) {
//         alert('Số điện thoại phải có 10 chữ số');
//         return false;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         alert('Email không hợp lệ');
//         return false;
//     }

//     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
//         alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
//         return false;
//     }

//     if (confirmPassword !== password) {
//         alert('Mật khẩu xác nhận không khớp');
//         return false;
//     }

//     if (!gioitinh) {
//         alert('Vui lòng chọn giới tính');
//         return false;
//     }

//     if (!dieukhoan) {
//         alert('Vui lòng đồng ý với điều khoản');
//         return false;
//     }

//     return true;
// }
const registerForm = $('#register');
const username = $('#username');
const email = $('#email');
const sdt = $('#sdt');
const password = $('#password');
const confirmPassword = $('#confirmPassword');
const gioitinh = $('#gioitinh');
const dieukhoan = $('#dieukhoan');

username.addEventListener('input',()=>{
    username.classList.remove('invalid');
    $('#usernameError').textContent = '';
});
email.addEventListener('input',()=>{
    email.classList.remove('invalid');
    $('#emailError').textContent = '';
});
sdt.addEventListener('input',()=>{
    sdt.classList.remove('invalid');
    $('#sdtError').textContent = '';
});
password.addEventListener('input',()=>{
    password.classList.remove('invalid');
    $('#passwordError').textContent = '';
}
);
confirmPassword.addEventListener('input',()=>{
    confirmPassword.classList.remove('invalid');
    $('#confirmPasswordError').textContent = '';
});
gioitinh.addEventListener('change',()=>{
    gioitinh.classList.remove('invalid');
    $('#gioitinhError').textContent = '';
});
dieukhoan.addEventListener('change',()=>{
    dieukhoan.classList.remove('invalid');
    $('#dieukhoanError').textContent = '';
});

registerForm.addEventListener('submit', function (e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');

    if (input) input.classList.add('invalid');
    if (error) error.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');

    if (input) input.classList.remove('invalid');
    if (error) error.textContent = '';
}

function validateUsername() {
    const usernameValue = username.value.trim();
    if (usernameValue.length < 3 || !/^[a-zA-ZÀ-ỹ\s]+$/.test(usernameValue)) {
        showError('username', 'Tên đăng nhập phải có ít nhất 3 ký tự và chỉ chứa chữ cái, khoảng trắng');
        return false;
    }
    clearError('username');
    return true;
}

function validateEmail() {
    const emailValue = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        showError('email', 'Email không hợp lệ');
        return false;
    }
    clearError('email');
    return true;
}

function validateSdt() {
    const sdtValue = sdt.value.trim();
    if (!/^\d{10}$/.test(sdtValue)) {
        showError('sdt', 'Số điện thoại phải có 10 chữ số');
        return false;
    }
    clearError('sdt');
    return true;
}

function validatePassword() {
    const passwordValue = password.value.trim();
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordValue)) {
        showError('password', 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số');
        return false;
    }
    clearError('password');
    return true;
}

function validateConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (confirmPasswordValue !== passwordValue) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGioiTinh() {
    if (!gioitinh.value) {
        showError('gioitinh', 'Vui lòng chọn giới tính');
        return false;
    }
    clearError('gioitinh');
    return true;
}

function validateDieuKhoan() {
    if (!dieukhoan.checked) {
        showError('dieukhoan', 'Vui lòng đồng ý với điều khoản');
        return false;
    }
    clearError('dieukhoan');
    return true;
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isSdtValid = validateSdt();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isGioiTinhValid = validateGioiTinh();
    const isDieuKhoanValid = validateDieuKhoan();

    if(!isUsernameValid || !isEmailValid || !isSdtValid || !isPasswordValid || !isConfirmPasswordValid || !isGioiTinhValid || !isDieuKhoanValid) {
        alert('Vui lòng sửa các lỗi trong form trước khi đăng ký');
    }
    else {
        alert(`Đăng ký thành công! Xin chào ${username.value}`);
        registerForm.reset();
    };
}
