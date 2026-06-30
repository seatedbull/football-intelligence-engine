const fs = require("fs");
const path = require("path");

const summaryPath = path.join("data", "match-summary.json");
const historyDir = path.join("data", "history");

if (!fs.existsSync(summaryPath)) {
  console.error("❌ match-summary.json not found");
  process.exit(1);
}

fs.mkdirSync(historyDir, { recursive: true });

const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

const eventId = summary.match.eventId;

const destination = path.join(historyDir, `${eventId}.json`);

fs.copyFileSync(summaryPath, destination);

console.log(`✅ Archived match ${eventId}`);
console.log(destination);