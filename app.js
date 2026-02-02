const btnOpen = document.getElementById("btnOpenModal");
const btnClose = document.getElementById("btnCloseModal");
const btnCancel = document.getElementById("btnCancel");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

const form = document.getElementById("employeeForm");
const tbody = document.getElementById("tbody");

function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  form.reset();
  // set lại option select đầu (vì reset có lúc không về đúng)
  document.getElementById("position").value = "";
}

btnOpen.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
btnCancel.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// nhấn ESC để đóng
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

// Save: thêm 1 dòng vào bảng (đơn giản)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const position = document.getElementById("position").value;
  const sex = document.querySelector('input[name="sex"]:checked').value;

  if (!name || !email || !phone || !position) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // id tự tăng theo số dòng hiện có
  const newId = tbody.querySelectorAll("tr").length + 1;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${newId}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${position}</td>
    <td>
      <button class="btn btn-edit" type="button">Edit</button>
      <button class="btn btn-delete" type="button">Delete</button>
    </td>
  `;

  tbody.appendChild(tr);

  // bạn có thể dùng sex sau (hiện ảnh không có cột sex nên chưa hiển thị)
  console.log("Sex:", sex);

  closeModal();
});

// Delete (bắt sự kiện theo tbody để áp dụng cho dòng mới)
tbody.addEventListener("click", (e) => {
  const btn = e.target;
  if (btn.classList.contains("btn-delete")) {
    const tr = btn.closest("tr");
    tr.remove();
    // nếu muốn đánh lại ID cho đẹp:
    [...tbody.querySelectorAll("tr")].forEach((row, idx) => {
      row.children[0].textContent = idx + 1;
    });
  }
});
