console.time("File Read");
const data = await Deno.readTextFile("./files/bible.txt");
console.timeEnd("File Read");
