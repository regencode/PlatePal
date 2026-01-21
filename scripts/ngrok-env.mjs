import fs from "fs";

const res = await fetch("http://127.0.0.1:4040/api/tunnels");
const data = await res.json();

const httpsTunnel = data.tunnels.find(t => t.proto === "https");
if (!httpsTunnel) {
  throw new Error("No HTTPS ngrok tunnel found");
}

const env = `EXPO_PUBLIC_API_URL=${httpsTunnel.public_url}\n`;

fs.writeFileSync(".env.ngrok", env);

console.log(".env.ngrok written:", httpsTunnel.public_url);
