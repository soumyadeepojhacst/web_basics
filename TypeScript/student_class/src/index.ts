class Student{
    roll : number;
    name : string;
    dep : string;

    constructor(roll:number,name:string,dep:string){
        this.roll = roll;
        this.name = name;
        this.dep = dep;
    }

    showDetails():string{
        return `Name->${this.name} Roll->${this.roll} Department->${this.dep}`;
    }
}


let s1:Student = new Student(1,"soumya","DS");
let s2:Student = new Student(2,"deep","CS");

console.log(s1.name);
console.log(s2.roll);

console.log(s1.showDetails());
console.log(s2.showDetails());