class Employee{
    id : number;
    name : string;
    department : string;

    constructor(id:number,name:string,department:string){
        this.id = id;
        this.name = name;
        this.department = department;
    }

    showDetails():void{
        console.log(`ID->${this.id} Name->${this.name} Department->${this.department}`);
    }
}

class Manager extends Employee{
    teamSize : number;

    constructor(teamSize:number,id:number,name:string,department:string)
    {
        super(id,name,department);
        this.teamSize = teamSize;
    }

    showDetails():void{
        console.log(`${super.showDetails()} Team Size->${this.teamSize}`);
    }
}

class Developers extends Employee{
    language : string;

    constructor(language:string,id:number,name:string,department:string)
    {
        super(id,name,department);
        this.language = language;
    }

    showDetails():void{
        console.log(`${super.showDetails()} Programming Language->${this.language}`);
    }

}

class Intern extends Employee{
    duration : string;

    constructor(duration:string,id:number,name:string,department:string)
    {
        super(id,name,department);
        this.duration = duration;
    }

    showDetails():void{
        console.log(`${super.showDetails()} Duration->${this.duration}`);
    }
}

let emp1:Manager = new Manager(10,201,"Ronit","HR");

let emp2:Developers = new Developers("Python",301,"mili","IT");

let emp3:Intern = new Intern("6 month",101,"sana","Finance");

emp1.showDetails();

emp2.showDetails();

emp3.showDetails();