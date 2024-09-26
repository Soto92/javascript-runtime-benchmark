const fs = require("fs/promises");

async function readFileSimultaneously() {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fs.readFile("./files/bible.txt", "utf8"));
  }
  console.time("Concurrency");
  await Promise.all(promises);
  console.timeEnd("Concurrency");
}

readFileSimultaneously();
