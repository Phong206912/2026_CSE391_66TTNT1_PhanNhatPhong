let students = [];           
let filteredStudents = [];   
let sortDirection = 0;       
function getRank(grade) {
    if (grade >= 8.5) return "Giỏi";
    if (grade >= 7.0) return "Khá";
    if (grade >= 5.0) return "Trung bình";
    return "Yếu";
}

function applyFilters() {
    const keyword = document.getElementById('searchName').value.toLowerCase().trim();
    const rankFilter = document.getElementById('filterRank').value;
    filteredStudents = students.filter(student => {
        const matchName = student.name.toLowerCase().includes(keyword);
        const matchRank = (rankFilter === "all") || (student.rank === rankFilter);
        return matchName && matchRank;
    });

    if (sortDirection !== 0) {
        filteredStudents.sort((a, b) => {
            if (sortDirection === 1) return a.grade - b.grade; 
            if (sortDirection === -1) return b.grade - a.grade; 
        });
    }

    const sortIcon = document.getElementById('sortIcon');
    if (sortDirection === 1) sortIcon.innerText = '▲';
    else if (sortDirection === -1) sortIcon.innerText = '▼';
    else sortIcon.innerText = '↕';
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('studentTbody');
    const noResultsDiv = document.getElementById('noResults');
    tbody.innerHTML = ''; 
    if (filteredStudents.length === 0 && students.length > 0) {
        noResultsDiv.classList.remove('hidden');
    } else {
        noResultsDiv.classList.add('hidden');
    }
    let totalScore = 0;
    filteredStudents.forEach((student, index) => {
        totalScore += student.grade;
        const tr = document.createElement('tr');
        if (student.grade < 5.0) tr.classList.add('row-warning');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.grade.toFixed(1)}</td>
            <td>${student.rank}</td>
            <td><button class="btn-delete" data-id="${student.id}">Xóa</button></td>
        `;
        tbody.appendChild(tr);
    });
    const currentCount = filteredStudents.length;
    document.getElementById('totalStudents').innerText = currentCount;
    const average = currentCount > 0 ? (totalScore / currentCount).toFixed(1) : "0.0";
    document.getElementById('averageGrade').innerText = average;
}

document.getElementById('searchName').addEventListener('input', applyFilters);
document.getElementById('filterRank').addEventListener('change', applyFilters);
document.getElementById('colSortGrade').addEventListener('click', () => {
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1; 
    } else {
        sortDirection = -1;
    }
    applyFilters();
});

function addStudent() {
    const nameInput = document.getElementById('txtName');
    const gradeInput = document.getElementById('txtGrade');
    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);
    if (name === "") return alert("Vui lòng nhập họ tên!");
    if (isNaN(grade) || grade < 0 || grade > 10) return alert("Điểm không hợp lệ (0-10)!");
    students.push({
        id: Date.now(),
        name: name,
        grade: grade,
        rank: getRank(grade)
    });
    nameInput.value = '';
    gradeInput.value = '';
    nameInput.focus();
    applyFilters();
}

document.getElementById('btnAdd').addEventListener('click', addStudent);
document.getElementById('txtGrade').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

document.getElementById('studentTbody').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(student => student.id !== idToDelete);
        applyFilters();
    }
});