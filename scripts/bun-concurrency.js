async function readFileSimultaneously() {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(Bun.file("./files/bible.txt").text());
  }
  console.time("Concurrency");
  await Promise.all(promises);
  console.timeEnd("Concurrency");
}

readFileSimultaneously();
