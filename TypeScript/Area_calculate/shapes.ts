abstract class Shape {
  abstract calculateArea(): number;

  display() {
    console.log(`The area is: ${this.calculateArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const myCircle = new Circle(5);
myCircle.display();
