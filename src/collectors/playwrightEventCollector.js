const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// Read the current match URL
const configPath = path.join(__dirname, "../../data/current-match.json");
const { pageUrl } = JSON.parse(fs.readFileSync(configPath, "utf-8"));

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Ensure output folder exists
  fs.mkdirSync("data/captured", { recursive: true });

  page.on("response", async (response) => {
    const url = response.url();

    // Ignore everything except SofaScore API
    if (!url.includes("/api/v1/")) return;

    try {
      const data = await response.json();

      const safeName = url
        .replace("https://www.sofascore.com/api/v1/", "")
        .replace(/[/?=&]/g, "_")
        .replace(/_+/g, "_");

      fs.writeFileSync(
        path.join("data/captured", `${safeName}.json`),
        JSON.stringify(
          {
            url,
            data,
          },
          null,
          2
        )
      );

      console.log(`✅ Captured: ${safeName}`);
    } catch {
      // Ignore responses that aren't JSON
    }
  });

  console.log("🌐 Opening SofaScore match...");
  await page.goto(pageUrl, {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  console.log("⏳ Waiting for API responses...");
  await page.waitForTimeout(10000);

  await browser.close();

  console.log("✅ Capture complete.");
  console.log("📁 Files saved in data/captured");
}

main().catch((error) => {
  console.error("❌ Collector failed");
  console.error(error);
  process.exit(1);
});