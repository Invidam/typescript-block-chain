interface Creature {
  name: string;
  age: number;
  gender: string;
}

const myPet = {
  name: "cookie",
  gender: "female",
  age: 3,
};
const name = "Invidam",
  age = 23,
  gender = "male";

const sayHi = (aCreature: Creature): void => {
  console.log(
    `${sayHello()} ${aCreature.name}, you are just ${
      aCreature.age
    }, you are a ${aCreature.gender}.`
  );
};
sayHi(myPet);
export {};

function sayHello(): string {
  return "Hello";
}
