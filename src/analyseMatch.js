const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const configPath = path.join(__dirname, "../data/current-match.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste SofaScore match URL: ", (url) => {
  if (!url.includes("sofascore.com")) {
    console.error("❌ Invalid SofaScore URL");
    process.exit(1);
  }

  fs.writeFileSync(configPath, JSON.stringify({ pageUrl: url }, null, 2));

  console.log("✅ Match URL saved");
  console.log("🧹 Cleaning old data...");
  execSync("npm run clean", { stdio: "inherit" });

  console.log("📡 Collecting SofaScore data...");
  execSync("npm run collect", { stdio: "inherit" });

  console.log("📊 Generating summary...");
  execSync("npm run summary", { stdio: "inherit" });

  console.log("✅ Analysis data ready: data/match-summary.json");

  rl.close();
});