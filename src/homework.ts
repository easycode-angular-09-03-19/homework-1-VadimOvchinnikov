// Helper function to validate non-negative numbers
function validateNumberValue(value: number, valueName: string): void {
    // Capitalize first letter
    valueName = valueName.charAt(0).toUpperCase() + valueName.slice(1);

    // validate if number is 0 or more
    if (value < 0) throw new Error(`${valueName} cannot be less than zero.`);
    // validate if number is not Infinity or NaN
    if (!isFinite(value)) throw new Error(`${valueName} cannot be less than zero.`);
}

function factorial(n: number): number {
    validateNumberValue(n, "number");

    if (!Number.isInteger(n)) throw new Error("Number must be integer.");

    return Array.from(Array(n + 1).keys()).reduce((a, b) => a + b, 0);
}

function multiply(...numbers: number[]): number {
    if (numbers.length == 0) return 0;

    return numbers.reduce((a, b) => a * b);
}

function reverseString(str: string): string {
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
    constructor(protected _mileage: number, protected _fuel: number) {
        validateNumberValue(_mileage, "mileage");
        validateNumberValue(_mileage, "fuel amount");
    }

    public abstract drive(distance: number): void;

    public abstract refuel(quantity: number): void;
}

class RealCar extends Car {
    constructor(_mileage: number, _fuel: number, private _tankCapacity: number, private _fuelPerKilometre: number) {
        super(_mileage, _fuel);
        validateNumberValue(_tankCapacity, "tank capacity");
        validateNumberValue(_fuelPerKilometre, "fuel per kilometre");

        if (_fuel > _tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");
    }

    public drive(distance: number): void {
        validateNumberValue(distance, "distance");
        const fuelSpent = Math.min(this._fuelPerKilometre * distance, this._fuel);
        this._fuel -= fuelSpent;
        this._mileage += fuelSpent / this._fuelPerKilometre;

        if (this._fuel <= 0.001) console.log("You need to refuel.");
    }

    public refuel(fuel: number): void {
        validateNumberValue(fuel, "quantity");

        if (this._fuel + fuel > this._tankCapacity) throw new Error("Fuel amount cannot be more than tank capacity.");

        this._fuel += fuel;
    }

    public get mileage() { return this._mileage; }

    public get fuel() { return this._fuel; }
}