const fs = require("fs");

console.time("File Read");
fs.readFile("./files/bible.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.timeEnd("File Read");
});
