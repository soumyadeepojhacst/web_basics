class Student {
    roll;
    name;
    dep;
    constructor(roll, name, dep) {
        this.roll = roll;
        this.name = name;
        this.dep = dep;
    }
    showDetails() {
        return `Name->${this.name} Roll->${this.roll} Department->${this.dep}`;
    }
}
let s1 = new Student(1, "soumya", "DS");
let s2 = new Student(2, "deep", "CS");
console.log(s1.name);
console.log(s2.roll);
console.log(s1.showDetails());
console.log(s2.showDetails());
export {};
