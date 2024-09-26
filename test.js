const { exec } = require("child_process");
const fs = require("fs");

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

function saveResultsToCSV(fileName, headers, data) {
  const csvData = [headers, ...data].map((row) => row.join(",")).join("\n");
  fs.writeFileSync(fileName, csvData);
}

async function benchmarkHTTP() {
  const results = [];

  console.log("Benchmarking Node.js HTTP server...");
  await runCommand("node scripts/node-http.js & sleep 2");
  const nodeResult = await runCommand(
    "npx autocannon -c 100 -d 10 http://localhost:3000"
  );
  await runCommand("pkill node");
  const nodeReqPerSec = nodeResult.match(/Requests\/sec:\s+([0-9.]+)/)[1];
  results.push(["Node.js", "HTTP", nodeReqPerSec]);

  console.log("Benchmarking Bun HTTP server...");
  await runCommand("bun scripts/bun-http.js & sleep 2");
  const bunResult = await runCommand(
    "npx autocannon -c 100 -d 10 http://localhost:3000"
  );
  await runCommand("pkill bun");
  const bunReqPerSec = bunResult.match(/Requests\/sec:\s+([0-9.]+)/)[1];
  results.push(["Bun", "HTTP", bunReqPerSec]);

  console.log("Benchmarking Deno HTTP server...");
  await runCommand("deno run --allow-net scripts/deno-http.js & sleep 2");
  const denoResult = await runCommand(
    "npx autocannon -c 100 -d 10 http://localhost:3000"
  );
  await runCommand("pkill deno");
  const denoReqPerSec = denoResult.match(/Requests\/sec:\s+([0-9.]+)/)[1];
  results.push(["Deno", "HTTP", denoReqPerSec]);

  saveResultsToCSV(
    "results/http-results.csv",
    ["Runtime", "Test", "Requests/sec"],
    results
  );
  console.log(
    "HTTP benchmark completed. Results saved to results/http-results.csv."
  );
}

async function benchmarkFileIO() {
  const results = [];

  console.log("Benchmarking Node.js File I/O...");
  const nodeFileResult = await runCommand("node scripts/node-fileio.js");
  const nodeFileTime = nodeFileResult.match(/File Read: ([0-9.]+)ms/)[1];
  results.push(["Node.js", "File I/O", nodeFileTime]);

  console.log("Benchmarking Bun File I/O...");
  const bunFileResult = await runCommand("bun scripts/bun-fileio.js");
  const bunFileTime = bunFileResult.match(/File Read: ([0-9.]+)ms/)[1];
  results.push(["Bun", "File I/O", bunFileTime]);

  console.log("Benchmarking Deno File I/O...");
  const denoFileResult = await runCommand(
    "deno run --allow-read scripts/deno-fileio.js"
  );
  const denoFileTime = denoFileResult.match(/File Read: ([0-9.]+)ms/)[1];
  results.push(["Deno", "File I/O", denoFileTime]);

  saveResultsToCSV(
    "results/fileio-results.csv",
    ["Runtime", "Test", "Read Time (ms)"],
    results
  );
  console.log(
    "File I/O benchmark completed. Results saved to results/fileio-results.csv."
  );
}

async function benchmarkCPU() {
  const results = [];

  console.log("Benchmarking Node.js CPU...");
  const nodeCPU = await runCommand("node scripts/node-cpu.js");
  const nodeCPUTime = nodeCPU.match(/Fibonacci Calculation: ([0-9.]+)ms/)[1];
  results.push(["Node.js", "CPU Task", nodeCPUTime]);

  console.log("Benchmarking Bun CPU...");
  const bunCPU = await runCommand("bun scripts/bun-cpu.js");
  const bunCPUTime = bunCPU.match(/Fibonacci Calculation: ([0-9.]+)ms/)[1];
  results.push(["Bun", "CPU Task", bunCPUTime]);

  console.log("Benchmarking Deno CPU...");
  const denoCPU = await runCommand("deno run scripts/deno-cpu.js");
  const denoCPUTime = denoCPU.match(/Fibonacci Calculation: ([0-9.]+)ms/)[1];
  results.push(["Deno", "CPU Task", denoCPUTime]);

  saveResultsToCSV(
    "results/cpu-results.csv",
    ["Runtime", "Test", "Execution Time (ms)"],
    results
  );
  console.log(
    "CPU benchmark completed. Results saved to results/cpu-results.csv."
  );
}

async function benchmarkMemory() {
  const results = [];

  console.log("Benchmarking Node.js Memory...");
  const nodeMemory = await runCommand("node scripts/node-memory.js");
  const nodeMemoryUsage = nodeMemory.match(/heapUsed:\s([0-9.]+)/)[1];
  results.push(["Node.js", "Memory Usage", nodeMemoryUsage]);

  console.log("Benchmarking Bun Memory...");
  const bunMemory = await runCommand("bun scripts/bun-memory.js");
  const bunMemoryUsage = bunMemory.match(/heapUsed:\s([0-9.]+)/)[1];
  results.push(["Bun", "Memory Usage", bunMemoryUsage]);

  console.log("Benchmarking Deno Memory...");
  const denoMemory = await runCommand("deno run scripts/deno-memory.js");
  const denoMemoryUsage = denoMemory.match(/heapUsed:\s([0-9.]+)/)[1];
  results.push(["Deno", "Memory Usage", denoMemoryUsage]);

  saveResultsToCSV(
    "results/memory-results.csv",
    ["Runtime", "Test", "Memory Usage (bytes)"],
    results
  );
  console.log(
    "Memory benchmark completed. Results saved to results/memory-results.csv."
  );
}

async function benchmarkStartup() {
  const results = [];

  console.log("Benchmarking Node.js Startup...");
  const nodeStartup = await runCommand("node scripts/node-startup.js");
  const nodeStartupTime = nodeStartup.match(/Startup Time: ([0-9.]+)ms/)[1];
  results.push(["Node.js", "Startup Time", nodeStartupTime]);

  console.log("Benchmarking Bun Startup...");
  const bunStartup = await runCommand("bun scripts/bun-startup.js");
  const bunStartupTime = bunStartup.match(/Startup Time: ([0-9.]+)ms/)[1];
  results.push(["Bun", "Startup Time", bunStartupTime]);

  console.log("Benchmarking Deno Startup...");
  const denoStartup = await runCommand("deno run scripts/deno-startup.js");
  const denoStartupTime = denoStartup.match(/Startup Time: ([0-9.]+)ms/)[1];
  results.push(["Deno", "Startup Time", denoStartupTime]);

  saveResultsToCSV(
    "results/startup-results.csv",
    ["Runtime", "Test", "Startup Time (ms)"],
    results
  );
  console.log(
    "Startup benchmark completed. Results saved to results/startup-results.csv."
  );
}

async function runBenchmarks() {
  try {
    if (!fs.existsSync("results")) {
      fs.mkdirSync("results");
    }

    await benchmarkHTTP();
    await benchmarkFileIO();
    await benchmarkCPU();
    await benchmarkMemory();
    await benchmarkStartup();
    await benchmarkConcurrency();
  } catch (error) {
    console.error("Error during benchmarking:", error);
  }
}

runBenchmarks();
