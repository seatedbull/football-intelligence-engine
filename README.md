# Football Intelligence Engine

AI-assisted football match analysis using SofaScore data, Playwright and Node.js.

---

# Purpose

This project automates the collection of football match data from SofaScore and transforms it into a structured dataset that can be analysed to identify potential betting value.

The goal is **not** to predict winners.

The goal is to make informed betting decisions using objective data.

---

# Current Workflow

```text
Choose Match
      │
      ▼
Paste SofaScore URL
      │
      ▼
Collect APIs (Playwright)
      │
      ▼
Generate Match Summary
      │
      ▼
Analyse Match
      │
      ▼
Manual Review
      │
      ▼
Place Bet (if value exists)
```

---

# Project Structure

```text
football-intelligence-engine/
│
├── data/
│   ├── captured/
│   ├── current-match.json
│   └── match-summary.json
│
├── src/
│   ├── analyseMatch.js
│   │
│   ├── collectors/
│   │   ├── playwrightEventCollector.js
│   │   └── legacy/
│   │       └── legacyAxiosEventCollector.js
│   │
│   ├── reports/
│   │   └── generateSummary.js
│   │
│   └── utils/
│       └── cleanCaptured.js
│
├── package.json
└── README.md
```

---

# Installation

Clone the repository.

```bash
git clone https://github.com/<your-username>/football-intelligence-engine.git
```

Install dependencies.

```bash
npm install
```

---

# Scripts

| Command | Purpose |
|----------|---------|
| `npm run clean` | Deletes all previously captured API files |
| `npm run collect` | Opens SofaScore and captures API responses |
| `npm run summary` | Builds a simplified `match-summary.json` |
| `npm run analyse` | Generates the betting analysis |

---

# Standard Workflow Before Every Bet

## 1. Select the match

Open SofaScore and copy the match URL.

Example:

```
https://www.sofascore.com/football/match/paraguay-germany/...
```

---

## 2. Update

Edit:

```
data/current-match.json
```

Example:

```json
{
  "pageUrl": "https://www.sofascore.com/football/match/paraguay-germany/..."
}
```

---

## 3. Remove previous match data

```bash
npm run clean
```

Expected output:

```
Deleted XX files from data/captured
```

---

## 4. Collect SofaScore APIs

```bash
npm run collect
```

Playwright will automatically:

- Open the match page
- Capture all relevant API responses
- Save them into

```
data/captured/
```

---

## 5. Build the match summary

```bash
npm run summary
```

This creates

```
data/match-summary.json
```

which contains:

- Match information
- Team statistics
- Lineups
- Missing players
- Fan votes
- Odds
- Source files

---

## 6. Analyse the match

```bash
npm run analyse
```

The analysis reviews:

- Team attack
- Team defence
- Possession
- Passing quality
- Goal threat
- Defensive stability
- Injuries
- Missing players
- Fan sentiment
- Betting observations

---

## Betting Checklist

Before placing a bet:

- Update the match URL
- Run `npm run clean`
- Run `npm run collect`
- Run `npm run summary`
- Run `npm run analyse`
- Compare with bookmaker odds
- Check injuries
- Check confirmed lineups
- Review Mundial Analytics
- Only bet if genuine value exists

---

# Data Sources

Automatically collected from SofaScore:

- Match information
- Team statistics
- Lineups
- Missing players
- Fan votes
- Featured odds
- Pregame form
- Player attributes
- Featured players
- Team achievements

Manual sources:

- Mundial Analytics
- Official injury news
- Bookmaker odds

---

# Future Roadmap

## Phase 1 ✅

- Playwright collector
- Automatic API capture
- Summary generator
- Match analyser

---

## Phase 2

Team Strength Model

Generate scores for:

- Attack
- Defence
- Midfield
- Discipline
- Form
- Goalkeeper

---

## Phase 3

Expected Value Engine

Automatically compare:

Model Probability

vs

Bookmaker Probability

Then calculate:

- Fair odds
- Edge %
- Expected Value (EV)

---

## Phase 4

Full Tournament Intelligence

Support:

- FIFA World Cup
- Champions League
- Premier League
- Copa Libertadores
- International tournaments

---

# Technologies

- Node.js
- Playwright
- Axios
- SofaScore APIs

---

# Notes

This project is designed as a football intelligence engine for research and data-driven betting analysis.

No betting model guarantees profit.

Always use disciplined bankroll management and avoid betting purely on model output.
---

# Example Session

```bash
# 1. Update current-match.json with today's match

npm run clean

npm run collect

npm run summary

npm run analyse
```

Review the generated analysis, compare it with bookmaker odds and external sources (such as Mundial Analytics), then decide whether a value bet exists.