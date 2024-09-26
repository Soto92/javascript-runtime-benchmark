console.time("File Read");
const data = Bun.readFileSync("./files/bible.txt", "utf8");
console.timeEnd("File Read");
