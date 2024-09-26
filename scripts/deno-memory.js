console.time("Memory Usage");
const largeArray = Array(1e7).fill(1);
console.timeEnd("Memory Usage");

console.log("Memory Usage:", Deno.memoryUsage());
