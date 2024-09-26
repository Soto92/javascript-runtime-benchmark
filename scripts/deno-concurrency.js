async function readFileSimultaneously() {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(Deno.readTextFile("./files/bible.txt"));
  }
  console.time("Concurrency");
  await Promise.all(promises);
  console.timeEnd("Concurrency");
}

readFileSimultaneously();
