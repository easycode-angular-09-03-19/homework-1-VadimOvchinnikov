// Helper function to validate non-negative numbers
function validateNumberValue(value: number, valueName: string) {
    // Capitalize first letter
    valueName = valueName.charAt(0).toUpperCase() + valueName.slice(1);

    // validate if number is 0 or more
    if (value < 0) throw new Error(`${valueName} cannot be less than zero.`);
    // validate if number is not Infinity or NaN
    if (!isFinite(value)) throw new Error(`${valueName} cannot be less than zero.`);
}

function factorial(n: number) {
    validateNumberValue(n, "number");

    if (!Number.isInteger(n)) throw new Error("Number must be integer.");

    return Array.from(Array(n + 1).keys()).reduce((a, b) => a + b, 0);
}

function multiply(...numbers: number[]): number {
    if (numbers.length == 0) return 0;

    return numbers.reduce((a, b) => a * b);
}

function reverseString(str: string) {
    return str.split("").reverse().join("");
}

interface IUser {
    name: string;
    email: string;
    password: string;
    type?: string;
}

class Admin implements IUser {
    name: string;
    email: string;
    password: string;
    type?: string = "admin";
}

abstract class Car {
    constructor(protected mileage: number, protected fuel: number) {
        validateNumberValue(mileage, "mileage");
        validateNumberValue(mileage, "fuel amount");
    }

    public abstract drive(distance: number);

    public abstract refuel(quantity: number);
}

class RealCar extends Car {
    constructor(mileage: number, fuel: number, private tankCapacity: number, private fuelPerKilometre: number) {
        super(mileage, fuel);
        validateNumberValue(tankCapacity, "tank capacity");
        validateNumberValue(fuelPerKilometre, "fuel per kilometre");

        if (fuel > tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");
    }

    public drive(distance: number) {
        validateNumberValue(distance, "distance");
        const fuelSpent = Math.min(this.fuelPerKilometre * distance, this.fuel);
        this.fuel -= fuelSpent;
        this.mileage += fuelSpent / this.fuelPerKilometre;

        if (this.fuel <= 0.001) console.log("You need to refuel.");
    }

    public refuel(fuel: number) {
        validateNumberValue(fuel, "quantity");

        if (this.fuel + fuel > this.tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");

        this.fuel += fuel;
    }
}