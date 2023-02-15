const srNoArr = document.getElementsByClassName("srNo");
const nameArr = document.getElementsByClassName("nameC");
const subjectArr = document.getElementsByClassName("subjectC");
const marksArr = document.getElementsByClassName("marksC");
const resultArr = document.getElementsByClassName("resultC");
const addBtn = document.getElementById("addBtn");
const table1 = document.getElementById("table1");
const tableBody1 = document.getElementById("tableBody1");
const table2 = document.getElementById("table2");
let rowCount = [];
let rowCount2 = [];
let srNo = 6;
let tableBody2;
function setSrNo() {
  for (let i = 0; i < srNoArr.length; i++) {
    srNoArr[i].innerHTML = i + 1;
  }
}
function addRow() {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="srNo">${srNo}</td>
    <td><input pattern="[a-zA-Z ]{1,20}" title="Alphabets Only max 20" class="nameC" type="text" placeholder="Enter Name" required></td>
    <td><input pattern="[a-zA-Z ]{1,40}" title="Alphabets Only max 40" class="subjectC" type="text" placeholder="Enter Subject" required></td>
    <td><input class="marksC" type="number" placeholder="Marks" min="0" max="100" required></td>
    <td class="resultC"><button type="button" class="btn btn-primary">Pass</button>
    <button type="button" class="btn btn-danger">Fail</button></td>
    <td class="text-center"><button onclick=deleteRow(this) type="button" class="btn btn-danger">Delete</button></td>
    `;
  tableBody1.appendChild(newRow);
  rowCount.push("1");
  srNo++;
}
function deleteRow(thisDel) {
  const ans = confirm("Are you sure you want to delete this record?");
  if(ans){
    thisDel.parentElement.parentElement.remove();
    setSrNo();
    rowCount.pop();
    srNo--;
  }
}
let tableData = [];
let dataObj = {
  srno: "",
  name: "",
  subject: "",
  marks: "",
  result: ""
};
function saveTable(event) {
  event.preventDefault();
  tableData = [];
  for (let j = 0; j < srNoArr.length; j++) {
    dataObj = [];
    tableData.push(dataObj);
    tableData[j].srno = srNoArr[j].innerHTML;
    tableData[j].name = nameArr[j].value;
    tableData[j].subject = subjectArr[j].value;
    tableData[j].marks = marksArr[j].value;
    tableData[j].result = resultArr[j].innerHTML;
  }
  createTable();
}
function createTable() {
  rowCount2 = [];
  table2.innerHTML = `
    <thead class="text-white"><tr style="background-color: #6c7ae0;">
    <th>Sr No</th>
    <th style="cursor:pointer;" onclick="sortTable(1)">Name <i class="fa fa-sort" aria-hidden="true"></i></th>
    <th style="cursor:pointer;" onclick="sortTable(2)">Subject <i class="fa fa-sort" aria-hidden="true"></i></th> 
    <th>Marks</th>
    <th>Result</th>
    </tr></thead>`;
  tableBody2 = document.createElement("tbody");
  tableBody2.id = "tableBody2";
  table2.appendChild(tableBody2);
  table2.style.boxShadow = "1px 2px 3px 3px  #839acf";
  addRow2();
}
function addRow2() {
  let k = 0;
  while (k < tableData.length) {
    let newRow = document.createElement("tr");
    let srNoCell = newRow.insertCell(0);
    srNoCell.classList="count";
    let nameCell = newRow.insertCell(1);
    let subjectCell = newRow.insertCell(2);
    let marksCell = newRow.insertCell(3);
    let resultCell = newRow.insertCell(4);
    nameCell.innerHTML = tableData[k].name;
    subjectCell.innerHTML = tableData[k].subject;
    if(tableData[k].marks!="")
    {
      marksCell.innerHTML = tableData[k].marks;
    }
    else
    {
      marksCell.innerHTML = "";
    }
    if (marksCell.innerHTML>=0 && marksCell.innerHTML<33) {
      marksCell.parentElement.style.backgroundColor = "#ffe5e5";
    }
    resultCell.innerHTML = "";
    tableBody2.appendChild(newRow);
    rowCount2.push("2");
    k++;
  }
}
function searchFunction() {
  let table, tr, tdName, tdSubject, txtName, txtSubject;
  let input, filter;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table2");
  tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    tdName = tr[i].getElementsByTagName("td")[1];
    tdSubject = tr[i].getElementsByTagName("td")[2];
    if (tdName || tdSubject) {
      txtSubject = (tdSubject.textContent || tdSubject.innerText);
      txtName = (tdName.textContent || tdName.innerText);
      if ((txtSubject.toUpperCase().startsWith(filter)) || (txtName.toUpperCase().startsWith(filter))) {
        tr[i].style.display = "table-row";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, direction, switchcount = 0;
  table = document.getElementById("table2");
  switching = true;
  direction = "inc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (direction == "inc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (direction == "dec") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && direction == "inc") {
        direction = "dec";
        switching = true;
      }
    }
  }
}