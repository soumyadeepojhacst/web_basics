abstract class Vehicle {
  constructor(
    protected brand: string,
    protected model: string,
  ) {}

  displayInfo(): void {
    console.log(`Vehicle: ${this.brand} ${this.model}`);
  }

  abstract startEngine(): void;
  abstract drive(): void;
}

class Car extends Vehicle {
  startEngine(): void {
    console.log(
      `${this.brand} ${this.model} engine purrs to life with a key turn.`,
    );
  }

  drive(): void {
    console.log(`Driving the car using the steering wheel.`);
  }
}

class Motorcycle extends Vehicle {
  startEngine(): void {
    console.log(
      `${this.brand} ${this.model} engine roars with a button press.`,
    );
  }

  drive(): void {
    console.log(`Riding the motorcycle using handlebars.`);
  }
}

const myCar = new Car("Tesla", "Model 3");
const myBike = new Motorcycle("Ducati", "Panigale");

myCar.displayInfo();
myCar.startEngine();

myBike.displayInfo();
myBike.startEngine();

//  const v = new Vehicle();
// This would throw an error because Abstract Classes cannot be instantiated.
