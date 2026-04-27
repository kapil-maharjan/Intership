async function loadIntoTable(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const data = await response.json();
    const headers = data.headers;
    const students = data.students;
    
    tableHead.innerHTML = `<tr></tr>`;
    tableBody.innerHTML = "";

    for(const headerText of headers){
        const headerElement = document.createElement("th");
        headerElement.textContent = headerText;
        if(headerText === "Student Name"){
            headerElement.style.cursor = "pointer";
            headerElement.addEventListener("click", () => sortByName(students, tableBody));
        } else if(headerText === "Grade"){
            headerElement.style.cursor = "pointer";
            headerElement.addEventListener("click", () => sortByGrade(students, tableBody));
        } else if (headerText === "Join Date"){
            headerElement.style.cursor = "pointer";
            headerElement.addEventListener("click", () => sortByJoinDate(students, tableBody));
        }
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    renderTable(students, tableBody);
}

function renderTable(students, tableBody){
    let counter = 0;
    tableBody.innerHTML = "";
    for(const student of students){
        counter++;
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <td>${counter}</td>
            <td>${student.firstName} ${student.middleName} ${student.lastName}</td>
            <td>${student.grade}</td>
            <td>${student.joinDate}</td>
            <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
        `;
        tableBody.appendChild(rowElement);
    }
}

let sortAscending = true;
function sortByName(students, tableBody){
    students.sort((a, b) => {
        const nameA = `${a.firstName} ${a.middleName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.middleName} ${b.lastName}`.toLowerCase();
        if(sortAscending){
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    sortAscending = !sortAscending;
    renderTable(students, tableBody);
}

function sortByGrade(students, tableBody){
    students.sort((a, b) => {
        const gradeA = parseFloat(a.grade);
        const gradeB = parseFloat(b.grade);
        if(sortAscending){
            return gradeA - gradeB;
        } else {
            return gradeB - gradeA;
        }
    });
    sortAscending = !sortAscending;
    renderTable(students, tableBody);
}

function sortByJoinDate(students, tableBody){
    students.sort((a, b) => {
        const dateA = new Date(a.joinDate);
        const dateB = new Date(b.joinDate);
        if(sortAscending){
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
    sortAscending = !sortAscending;
    renderTable(students, tableBody);
}

document.addEventListener("DOMContentLoaded", () => {
    loadIntoTable("./data.json", document.querySelector("table")).catch(err => console.error("Error loading table:", err));
});