"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myPet = {
    name: "cookie",
    gender: "female",
    age: 3,
};
const name = "Invidam", age = 23, gender = "male";
const sayHi = (aCreature) => {
    console.log(`${sayHello()} ${aCreature.name}, you are just ${aCreature.age}, you are a ${aCreature.gender}.`);
};
sayHi(myPet);
function sayHello() {
    return "Hello";
}
//# sourceMappingURL=index.js.map