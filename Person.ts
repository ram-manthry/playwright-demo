class Mammal {
	readonly age: number;
	constructor(age: number) {
		this.age = age;
	}
	run() {
		return "I'm running";
	}
}

class Person extends Mammal {
	readonly name: string;
	readonly age: number;

	constructor(name: string, age: number) {
		super(age);
		this.name = name;
		this.age = age;
	}

	run() {
		return 'I am running on two legs';
	}

	talk() {
		return `I'm ${this.age} years old`;
	}
}

const priya = new Person('Priya', 40);
console.log(priya.talk());
console.log(priya.run());
