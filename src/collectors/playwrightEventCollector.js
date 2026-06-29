const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const pageUrl = "https://www.sofascore.com/football/match/canada-south-africa/LUbscVb";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on("response", async (response) => {
    const url = response.url();

    if (!url.includes("/api/v1/")) return;

    try {
      const data = await response.json();

      const safeName = url
  .replace("https://www.sofascore.com/api/v1/", "")
  .replace(/[/?=&]/g, "_")
  .replace(/_+/g, "_");

      fs.mkdirSync("data/captured", { recursive: true });

      fs.writeFileSync(
        path.join("data/captured", `${safeName}.json`),
        JSON.stringify({ url, data }, null, 2)
      );

      console.log("✅ Captured:", url);
    } catch {
      // ignore non-json responses
    }
  });

  console.log("Opening SofaScore page...");
  await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 60000 });

  console.log("Waiting 10 seconds for API calls...");
  await page.waitForTimeout(10000);

  await browser.close();

  console.log("Done. Check data/captured folder.");
}

main().catch((error) => {
  console.error("❌ Failed:", error);
});