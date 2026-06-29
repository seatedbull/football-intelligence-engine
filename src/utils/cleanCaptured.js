const fs = require("fs");
const path = require("path");

const capturedDir = path.join(__dirname, "../../data/captured");

if (!fs.existsSync(capturedDir)) {
  console.log("Captured folder does not exist.");
  process.exit(0);
}

const files = fs.readdirSync(capturedDir);

for (const file of files) {
  const filePath = path.join(capturedDir, file);
  fs.unlinkSync(filePath);
}

console.log(`✅ Deleted ${files.length} files from data/captured`);