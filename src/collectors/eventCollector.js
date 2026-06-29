const axios = require("axios");

async function getEvent(eventId) {
  const url = `https://www.sofascore.com/api/v1/event/${eventId}`;

  console.log(`Fetching ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "referer": "https://www.sofascore.com/",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
    });

    console.log("✅ Success!");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ Request failed");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

getEvent(53452545);