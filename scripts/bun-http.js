Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello, World!", { status: 200 });
  },
});

console.log("Bun server running at http://localhost:3000/");
