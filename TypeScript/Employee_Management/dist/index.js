class Employee {
    id;
    name;
    department;
    constructor(id, name, department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }
    showDetails() {
        console.log(`ID->${this.id} Name->${this.name} Department->${this.department}`);
    }
}
class Manager extends Employee {
    teamSize;
    constructor(teamSize, id, name, department) {
        super(id, name, department);
        this.teamSize = teamSize;
    }
    showDetails() {
        console.log(`${super.showDetails()} Team Size->${this.teamSize}`);
    }
}
class Developers extends Employee {
    language;
    constructor(language, id, name, department) {
        super(id, name, department);
        this.language = language;
    }
    showDetails() {
        console.log(`${super.showDetails()} Programming Language->${this.language}`);
    }
}
class Intern extends Employee {
    duration;
    constructor(duration, id, name, department) {
        super(id, name, department);
        this.duration = duration;
    }
    showDetails() {
        console.log(`${super.showDetails()} Duration->${this.duration}`);
    }
}
let emp1 = new Manager(10, 201, "Ronit", "HR");
let emp2 = new Developers("Python", 301, "mili", "IT");
let emp3 = new Intern("6 month", 101, "sana", "Finance");
emp1.showDetails();
emp2.showDetails();
emp3.showDetails();
export {};
