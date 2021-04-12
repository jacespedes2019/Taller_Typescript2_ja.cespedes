import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var infoStudentTbody = document.getElementById('studentInfo');
var imgAndNameStudentTbody = document.getElementById('studentIN');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxUp = document.getElementById("search-box-up");
var inputSearchBoxLow = document.getElementById("search-box-low");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
renderStudentInfoInTable(dataStudent);
renderStudentINInStart(dataStudent);
function renderStudentINInStart(student) {
    console.log('Desplegando imagen y nombre');
    var trElement = document.createElement("div");
    trElement.innerHTML = "<h1>" + student.name + "</h1>\n                           <img class=\"img-fluid max-width: 100% height: auto\" src=\"" + student.img + "\" alt=\"Avatar\">";
    imgAndNameStudentTbody.appendChild(trElement);
}
function renderStudentInfoInTable(student) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td style=\"width: 60%;\">C\u00F3digo</td>\n                           <td>" + student.code + "</td>";
    infoStudentTbody.appendChild(trElement);
    var trElement1 = document.createElement("tr");
    trElement1.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + student.cc + "</td>";
    infoStudentTbody.appendChild(trElement1);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>Edad</td>\n                           <td>" + student.age + "</td>";
    infoStudentTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + student.address + "</td>";
    infoStudentTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>Tel\u00E9fono</td>\n                           <td>" + student.telephone + "</td>";
    infoStudentTbody.appendChild(trElement4);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByRange() {
    var low = inputSearchBoxLow.value;
    low = (low == null) ? '' : low;
    var up = inputSearchBoxUp.value;
    up = (up == null) ? '' : up;
    clearCoursesInTable();
    var coursesFiltered = rangeCourseByCredits(low, up, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function rangeCourseByCredits(low, up, courses) {
    if (low === "" || up === "") {
        return dataCourses;
    }
    else {
        var min_1 = parseInt(low, 10);
        var max_1 = parseInt(up, 10);
        var list_1 = [];
        courses.forEach(function (course) {
            if (course.credits >= min_1 && course.credits <= max_1) {
                list_1.push(course);
            }
        });
        return list_1;
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
