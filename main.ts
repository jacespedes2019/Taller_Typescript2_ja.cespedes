import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let infoStudentTbody: HTMLElement = document.getElementById('studentInfo')!;
let imgAndNameStudentTbody: HTMLElement = document.getElementById('studentIN')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxUp: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-up")!;
const inputSearchBoxLow: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-low")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterByRange();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

renderStudentInfoInTable(dataStudent);
renderStudentINInStart(dataStudent);

function renderStudentINInStart(student: Student): void {
  console.log('Desplegando imagen y nombre');
  let trElement = document.createElement("div");
    trElement.innerHTML = `<h1>${student.name}</h1>
                           <img class="img-fluid max-width: 100% height: auto" src="${student.img}" alt="Avatar">`
    imgAndNameStudentTbody.appendChild(trElement);
    
}

function renderStudentInfoInTable(student: Student): void {
  console.log('Desplegando estudiante');
  let trElement = document.createElement("tr");
    trElement.innerHTML = `<td style="width: 60%;">Código</td>
                           <td>${student.code}</td>`;
    infoStudentTbody.appendChild(trElement);
  let trElement1 = document.createElement("tr");
    trElement1.innerHTML = `<td>Cédula</td>
                           <td>${student.cc}</td>`;
    infoStudentTbody.appendChild(trElement1); 
  let  trElement2 = document.createElement("tr");
    trElement2.innerHTML = `<td>Edad</td>
                           <td>${student.age}</td>`;
    infoStudentTbody.appendChild(trElement2);
  let  trElement3 = document.createElement("tr");
    trElement3.innerHTML = `<td>Dirección</td>
                           <td>${student.address}</td>`;
    infoStudentTbody.appendChild(trElement3);  
  let  trElement4 = document.createElement("tr");
    trElement4.innerHTML = `<td>Teléfono</td>
                           <td>${student.telephone}</td>`;
    infoStudentTbody.appendChild(trElement4);                     
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByRange() { 
  let low = inputSearchBoxLow.value;
  low = (low == null) ? '' : low;
  let up = inputSearchBoxUp.value;
  up = (up == null) ? '' : up;
  clearCoursesInTable();
  let coursesFiltered: Course[] = rangeCourseByCredits(low,up,dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function rangeCourseByCredits(low: string, up: string, courses: Course[]) {
  if(low==="" || up==="")
  {
    return dataCourses;
  }
  else {
  let min:number = parseInt(low, 10);
  let max:number = parseInt(up, 10);
  let list: Array <Course> = [];
  courses.forEach((course) => {
    if(course.credits>=min && course.credits<=max)
    {
      list.push(course)
    }
  });
  return list;
}
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
