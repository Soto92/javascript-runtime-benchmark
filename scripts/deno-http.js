import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve(
  (req) => {
    return new Response("Hello, World!", { status: 200 });
  },
  { port: 3000 }
);

console.log("Deno server running at http://localhost:3000/");
