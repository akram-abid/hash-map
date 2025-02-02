import { HashMap } from "./script.js";

const test = new HashMap();

console.log("=== Initial Population ===");
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Current length:", test.length()); 
console.log("Current capacity:", test.capacity); 
console.log("Current load level:", test.length() / test.capacity);

console.log("\n=== Overwriting Existing Values ===");
console.log("Original 'apple' value:", test.get('apple'));
test.set('apple', 'dark red');
console.log("New 'apple' value:", test.get('apple'));

console.log("Original 'banana' value:", test.get('banana'));
test.set('banana', 'bright yellow');
console.log("New 'banana' value:", test.get('banana'));

console.log("Length after overwrites:", test.length()); 
console.log("Capacity after overwrites:", test.capacity); 

console.log("\n=== Triggering Growth ===");
console.log("Load level before growth:", test.length() / test.capacity);
test.set('moon', 'silver');
console.log("Length after growth:", test.length()); 
console.log("New capacity:", test.capacity); 
console.log("New load level:", test.length() / test.capacity);

console.log("\n=== Overwriting After Growth ===");
test.set('moon', 'bright silver');
console.log("Updated 'moon' value:", test.get('moon'));
console.log("Length after growth overwrite:", test.length()); 

console.log("\n=== Testing Other Methods ===");
console.log("Has 'apple'?", test.has('apple')); 
console.log("Has 'nothere'?", test.has('nothere')); 

console.log("Remove 'lion':", test.remove('lion')); 
console.log("Length after removal:", test.length());
console.log("Try to remove 'lion' again:", test.remove('lion'));

console.log("\nAll keys:", test.keys());
console.log("\nAll values:", test.values());
console.log("\nAll entries:", test.entries());

console.log("\n=== Testing Clear ===");
test.clear();
console.log("Length after clear:", test.length());
console.log("Entries after clear:", test.entries());

console.log("\n=== Final Verification ===");
test.set('new1', 'value1');
test.set('new2', 'value2');
console.log("Final length:", test.length());
console.log("Final entries:", test.entries());