console.log("subject.js connected");

let subjectArr = new Array(0); // subject object array
let subList = new Array(0); // subject list

class Subject {
    constructor(subjectName, goal) {
        this.subject = subjectName;
        this.goal = goal; // float - hrs 
        this.hours; // float - hours worked (total timer)
        this.complete = false;
        subjectArr.push(this) // stores objects in array
        subList.push(this.subject); // stores subject name in array 
    }
}

function initSubject(subjectName, goal) {
    if (!subList.includes(subjectName)) { // checks if subject exists
        new Subject(subjectName, goal)
    } else {
        console.log("subject already exists"); // reject notice
        alert("need subject exists notification!");
    }

}

initSubject("Math", 50);
initSubject("Science", 50);

for (var i = 0; i < subjectArr.length; i++) {
    console.log(subjectArr[i]);
} // reset gem objects