let students = [];
function getRank(grade) {
    if (grade >= 8.5) return "Giỏi";
    if (grade >= 7.0) return "Khá";
    if (grade >= 5.0) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    const tbody = document.getElementById('studentTbody');
    tbody.innerHTML = ''; 
    let totalScore = 0;
    students.forEach((student, index) => {
        totalScore += student.grade;
        const tr = document.createElement('tr');
        if (student.grade < 5.0) {
            tr.classList.add('row-warning');
        }
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.grade.toFixed(1)}</td>
            <td>${student.rank}</td>
            <td>
                <button class="btn-delete" data-index="${index}">Xóa</button>
            </td>
        `; 
        tbody.appendChild(tr);
    });
    const totalStudents = students.length;
    document.getElementById('totalStudents').innerText = totalStudents;
    const average = totalStudents > 0 ? (totalScore / totalStudents).toFixed(1) : "0.0";
    document.getElementById('averageGrade').innerText = average;
}

function addStudent() {
    const nameInput = document.getElementById('txtName');
    const gradeInput = document.getElementById('txtGrade');
    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);
    if (name === "") {
        alert("Vui lòng nhập họ tên sinh viên!");
        nameInput.focus();
        return;
    }
    if (isNaN(grade) || grade < 0 || grade > 10) {
        alert("Điểm không hợp lệ! Vui lòng nhập số từ 0 đến 10.");
        gradeInput.focus();
        return;
    }
    students.push({
        name: name,
        grade: grade,
        rank: getRank(grade)
    });
    nameInput.value = '';
    gradeInput.value = '';
    nameInput.focus();
    renderTable();
}

document.getElementById('btnAdd').addEventListener('click', addStudent);
document.getElementById('txtGrade').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        addStudent();
    }
});

document.getElementById('studentTbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
        const indexToDelete = event.target.getAttribute('data-index');
        students.splice(indexToDelete, 1);
        renderTable();
    }
});