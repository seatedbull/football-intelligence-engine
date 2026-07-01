# Football Intelligence Engine

AI-assisted football intelligence engine built with Node.js, Playwright and SofaScore APIs.

The project is designed to help make **consistent, data-driven betting decisions** rather than relying on intuition or public opinion.

---

# Philosophy

The objective is **not** to predict football matches.

The objective is to identify **value bets**.

A favourite can have an 80% chance of winning and still be a poor bet if the bookmaker has already priced that probability correctly.

Likewise, an underdog may lose more often than it wins but still become profitable over time if the available odds underestimate its true chances.

This engine exists to reduce emotional decision-making and replace it with a repeatable analysis process.

---

# Decision-Making Process

Every betting day follows the same workflow.

```text
Analyse Match 1
        │
        ▼
Analyse Match 2
        │
        ▼
Analyse Match 3
        │
        ▼
Compare Every Match
        │
        ▼
Compare with Bookmaker Odds
        │
        ▼
Allocate Bankroll
        │
        ▼
Place Bets
```

The bankroll is **never allocated until every match has been analysed.**

---

# Project Structure

```text
football-intelligence-engine/
│
├── data/
│   ├── captured/
│   ├── history/
│   ├── current-match.json
│   └── match-summary.json
│
├── src/
│
│   ├── analyseMatch.js
│
│   ├── collectors/
│   │   ├── playwrightEventCollector.js
│   │   └── legacy/
│   │       └── legacyAxiosEventCollector.js
│
│   ├── reports/
│   │   └── generateSummary.js
│
│   └── utils/
│       ├── cleanCaptured.js
│       └── archiveMatch.js
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

# Available Scripts

| Command | Purpose |
|----------|---------|
| `npm run clean` | Deletes previously captured APIs |
| `npm run collect` | Opens SofaScore and captures API responses |
| `npm run summary` | Generates a simplified match summary |
| `npm run analyse` | Complete workflow (URL → collect → summary) |
| `npm run archive` | Saves completed match summaries into history |

---

# Standard Workflow Before Every Bet

## Step 1

Run

```bash
npm run analyse
```

The script will ask for the SofaScore match URL.

Example:

```
https://www.sofascore.com/football/match/france-sweden/...
```

The engine automatically:

- saves the URL
- cleans previous captures
- collects APIs
- generates the summary

No manual editing of `current-match.json` is required.

---

## Step 2

Review the generated summary.

The engine produces:

```
data/match-summary.json
```

which includes:

- Match information
- Tournament
- Team statistics
- Lineups
- Fan votes
- Odds
- Team tournament statistics
- Match statistics (when available)
- Expected Goals (xG)
- Source files

---

## Step 3

Repeat the workflow for every knockout match scheduled that day.

Do **not** place bets after analysing only one match.

Analyse every available match first.

---

## Step 4

Collect bookmaker odds.

Current workflow uses TAB NZ.

Example:

```
France win

Draw

Sweden win

France qualify

Sweden qualify
```

---

## Step 5

Compare the market against the collected data.

Every match is assessed using:

### Attack

- Goals scored
- Shots
- Shots on target
- Big chances
- Expected Goals (xG)

### Defence

- Goals conceded
- Clean sheets
- Defensive errors
- Big chances allowed

### Team Quality

- Average player ratings
- Lineups
- Missing players
- Suspensions
- Injuries

### Tactical Observations

Statistics never tell the full story.

Additional observations from watching matches are included when relevant.

Examples:

- Hit the woodwork several times
- Dominated despite losing
- Poor finishing
- Goalkeeper outstanding
- Tactical mismatch
- Weather
- Referee influence

---

## Step 6

Compare the bookmaker odds.

The objective is to answer:

> Is the bookmaker underestimating or overestimating this team's chances?

The engine seeks **value**, not simply favourites.

---

## Step 7

Compare every analysed match.

Typical discussion:

- Which match offers the highest value?
- Which favourite is overpriced?
- Which underdog has value?
- Which matches should be avoided?

---

## Step 8

Allocate the bankroll.

Example:

```
Bankroll

$35

France Win

$20

Ecuador Win

$15
```

No stake allocation is made until every match has been compared.

---

# Data Collected

Automatically captured from SofaScore:

- Match information
- Team statistics
- Tournament statistics
- Lineups
- Team achievements
- Featured players
- Player attributes
- Fan votes
- Pregame form
- Odds
- Match statistics
- Expected Goals (xG) when available

External manual sources:

- TAB NZ odds
- Mundial Analytics
- Injury news
- Team news

---

# Match Evaluation Framework

Every analysed match receives a qualitative assessment based on:

- Attack
- Defence
- Midfield control
- Goal threat
- Defensive stability
- Team quality
- Current tournament form
- Market odds
- Betting value
- Confidence level

The final recommendation can be:

- Bet
- Small Bet
- No Bet

"No Bet" is considered a successful outcome when value does not exist.

---

# Historical Match Archive

Completed matches can be archived.

Purpose:

- Build historical xG database
- Compare tournament trends
- Improve future models
- Learn from previous betting decisions

This historical dataset will become more valuable as the tournament progresses.

---

# Future Roadmap

## Phase 1 ✅

- Playwright collector
- API capture
- Summary generator
- Match analyser
- Historical archive

---

## Phase 2

Team Strength Model

Automatically generate ratings for:

- Attack
- Defence
- Midfield
- Goalkeeper
- Discipline
- Current Form

---

## Phase 3

Expected Value Engine

Automatically calculate:

- Model probability
- Bookmaker probability
- Fair odds
- Edge %
- Expected Value (EV)

Highlight only positive EV opportunities.

---

## Phase 4

Football Intelligence Platform

Support additional competitions:

- FIFA World Cup
- Champions League
- Premier League
- Copa Libertadores
- International competitions

---

# Technologies

- Node.js
- Playwright
- Axios
- SofaScore APIs

---

# Example Betting Day

```bash
npm run analyse

# Paste Match 1 URL

npm run analyse

# Paste Match 2 URL

npm run analyse

# Paste Match 3 URL

# Compare all matches

# Collect bookmaker odds

# Allocate bankroll

# Place bets

# Archive completed matches

npm run archive
```

---

# Important Notes

This project is intended as a football intelligence and research tool.

It does **not** guarantee profitable betting.

Long-term success depends on:

- disciplined bankroll management
- identifying value rather than winners
- consistent analysis
- continuous improvement of the underlying model

The goal is not to be right every day.

The goal is to make better decisions than the betting market over the long run.