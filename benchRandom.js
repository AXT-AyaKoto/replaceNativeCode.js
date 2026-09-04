import Math from "./Math.js";
console.log("start");
const start = performance.now();
for (let index = 0; index < 100; index++) {
  Math.random();
}
console.log(`${(performance.now() - start) / 100}ms per iterate`);
console.log("start");
const start2 = performance.now();
for (let index = 0; index < 100; index++) {
  Math.random32();
}
console.log(`${(performance.now() - start2) / 100}ms per iterate`);
