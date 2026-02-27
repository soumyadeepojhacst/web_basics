type paymentMethod = "Gpay" | "Paytm" | "PhonePay";

interface Payment{
    amount : number,
    method : paymentMethod,
    processPayment() : string
};

class Gpay implements Payment{
    method:paymentMethod = "Gpay";
    amount: number;

    constructor(amount:number){
        this.amount = amount;
    }

    processPayment(): string {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }

}

class Paytm implements Payment{
    method:paymentMethod = "Paytm";
    amount: number;

    constructor(amount:number){
        this.amount = amount;
    }

    processPayment(): string {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }

}

class PhonePay implements Payment{
    method:paymentMethod = "PhonePay";
    amount: number;

    constructor(amount:number){
        this.amount = amount;
    }

    processPayment(): string {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }

}


let payment1:Gpay = new Gpay(2000);
console.log(payment1.processPayment());


let payment2:Paytm = new Paytm(1000);
console.log(payment2.processPayment());


let payment3:PhonePay = new PhonePay(1500);
console.log(payment3.processPayment());
