;
class Gpay {
    method = "Gpay";
    amount;
    constructor(amount) {
        this.amount = amount;
    }
    processPayment() {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }
}
class Paytm {
    method = "Paytm";
    amount;
    constructor(amount) {
        this.amount = amount;
    }
    processPayment() {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }
}
class PhonePay {
    method = "PhonePay";
    amount;
    constructor(amount) {
        this.amount = amount;
    }
    processPayment() {
        return `Payment is processing by ${this.method} of amount ${this.amount}`;
    }
}
let payment1 = new Gpay(2000);
console.log(payment1.processPayment());
let payment2 = new Paytm(1000);
console.log(payment2.processPayment());
let payment3 = new PhonePay(1500);
console.log(payment3.processPayment());
export {};
