# FIE - football-intelligence-engine

## Overview

football-intelligence-engine is an AI-assisted football analysis project designed to build comprehensive betting dossiers for FIFA World Cup matches.

The project uses Playwright to intercept SofaScore API requests directly from the browser instead of calling the API endpoints manually.

This avoids the API 403 restrictions and captures the exact JSON data that the SofaScore website uses.

---

# Current Status

✅ Project created

✅ Node.js configured

✅ Axios installed

✅ Playwright installed

✅ Browser interception working

✅ Successfully capturing SofaScore API responses

Current output:

```
data/
    captured/
        *.json
```

---

# Project Structure

```
ai-football-lab
│
├── data/
│   └── captured/
│
├── src/
│   ├── analyzers/
│   ├── collectors/
│   │      eventCollector.js
│   │      playwrightEventCollector.js
│   ├── models/
│   ├── utils/
│   └── index.js
│
├── package.json
└── README.md
```

---

# How to Run the Collector

## Step 1

Open

```
src/collectors/playwrightEventCollector.js
```

---

## Step 2

Locate

```javascript
const pageUrl = "https://www.sofascore.com/football/match/...";
```

Replace the URL with the SofaScore match you want to analyse.

Example:

```javascript
const pageUrl = "https://www.sofascore.com/football/match/team-a-team-b/XXXXXXXX";
```

Save the file.

---

## Step 3

Open the VS Code terminal.

Run

```bash
node src/collectors/playwrightEventCollector.js
```

---

## Step 4

A Chromium browser will open automatically.

Allow the page to load completely.

The collector automatically listens to every network request.

---

## Step 5

When finished, check

```
data/captured
```

You should find multiple JSON files.

Example:

```
event_12813000.json

event_12813000_graph.json

event_12813000_lineups.json

event_12813000_votes.json

event_12813000_odds_1_all.json

event_12813000_highlights.json

pregame_form.json

...
```

---

# Before Analysing Another Match

Delete the contents of

```
data/captured
```

Do NOT delete the folder itself.

This prevents JSON files from different matches being mixed together.

---

# Current Workflow

1. Find the SofaScore match page.

2. Paste the match URL into

```
playwrightEventCollector.js
```

3. Run

```bash
node src/collectors/playwrightEventCollector.js
```

4. Wait for the browser to finish loading.

5. Verify JSON files exist inside

```
data/captured
```

6. Upload the captured JSON files to ChatGPT.

7. Generate the complete betting dossier.

---

# Project Goal

The final system should work like this:

```
SofaScore Match URL
        │
        ▼
Playwright Collector
        │
        ▼
Capture every API response
        │
        ▼
Save JSON files
        │
        ▼
AI Football Engine
        │
        ├── Match Overview
        ├── Team Analysis
        ├── Player Analysis
        ├── Tactical Analysis
        ├── Statistical Comparison
        ├── Momentum Analysis
        ├── Courtside Model
        ├── Betting Value
        ├── Kelly Stake
        ├── Multi Builder
        └── Final Betting Recommendation
```

---

# Future Improvements

- Automatically discover the correct SofaScore match URL.
- Search matches by team names.
- Automatically organise JSON by match.
- Automatically extract player and team statistics.
- Build a complete AI-generated betting dossier.
- Export reports to Markdown and PDF.
- Update Google Sheets automatically.
- Add post-match review and model learning.

---

# Project Philosophy

The objective is **not** to maximise the number of bets.

The objective is to maximise **long-term expected value (EV)**.

Every betting recommendation should combine:

- SofaScore API data
- Tournament statistics
- Tactical analysis
- Injuries and suspensions
- Current news
- Market odds
- Courtside model
- Expected value calculations
- Risk assessment

No single source should determine the final recommendation.

If no betting edge exists, the correct recommendation is:

**NO BET**