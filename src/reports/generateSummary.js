const fs = require("fs");
const path = require("path");

const capturedDir = path.join("data", "captured");
const outputFile = path.join("data", "match-summary.json");

function readJson(fileName) {
  if (!fileName) return null;

  const filePath = path.join(capturedDir, fileName);
  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function findFile(includesText) {
  return fs
    .readdirSync(capturedDir)
    .find((file) => file.includes(includesText) && file.endsWith(".json"));
}

function findEventFile() {
  return fs
    .readdirSync(capturedDir)
    .find((file) => /^event_\d+\.json$/.test(file));
}

function extractMatchStat(statisticsData, key) {
  const periods = statisticsData?.data?.statistics ?? [];

  for (const period of periods) {
    for (const group of period.groups ?? []) {
      const item = group.statisticsItems?.find((stat) => stat.key === key);

      if (item) {
        return {
          name: item.name,
          home: item.homeValue,
          away: item.awayValue,
          homeDisplay: item.home,
          awayDisplay: item.away,
        };
      }
    }
  }

  return null;
}

const eventFile = findEventFile();
const eventData = readJson(eventFile);

const event = eventData?.data?.event;

if (!event) {
  console.error("❌ Could not find a valid event file.");
  process.exit(1);
}

const eventId = event.id;
const homeTeam = event.homeTeam;
const awayTeam = event.awayTeam;

const lineupsFile = findFile(`event_${eventId}_lineups`);
const graphFile = findFile(`event_${eventId}_graph`);
const votesFile = findFile(`event_${eventId}_votes`);
const oddsFile = findFile(`event_${eventId}_odds`);
const statisticsFile = findFile(`event_${eventId}_statistics`);

const homeStatsFile = findFile(`team_${homeTeam.id}_unique-tournament`);
const awayStatsFile = findFile(`team_${awayTeam.id}_unique-tournament`);

const lineupsData = readJson(lineupsFile);
const graphData = readJson(graphFile);
const votesData = readJson(votesFile);
const oddsData = readJson(oddsFile);
const statisticsData = readJson(statisticsFile);
const homeStats = readJson(homeStatsFile);
const awayStats = readJson(awayStatsFile);

const matchStats = {
  expectedGoals: extractMatchStat(statisticsData, "expectedGoals"),
  bigChances: extractMatchStat(statisticsData, "bigChanceCreated"),
  totalShots: extractMatchStat(statisticsData, "totalShotsOnGoal"),
  shotsOnTarget: extractMatchStat(statisticsData, "shotsOnGoal"),
  possession: extractMatchStat(statisticsData, "ballPossession"),
  goalkeeperSaves: extractMatchStat(statisticsData, "goalkeeperSaves"),
  corners: extractMatchStat(statisticsData, "cornerKicks"),
};

const summary = {
  match: {
    eventId,
    sourceFile: eventFile,
    homeTeam: {
      id: homeTeam.id,
      name: homeTeam.name,
      slug: homeTeam.slug,
    },
    awayTeam: {
      id: awayTeam.id,
      name: awayTeam.name,
      slug: awayTeam.slug,
    },
    tournament: event.tournament?.name,
    status: event.status?.description,
    startTimestamp: event.startTimestamp,
  },

  filesCaptured: fs.readdirSync(capturedDir).length,

  availableData: {
    event: Boolean(eventData),
    lineups: Boolean(lineupsData),
    graph: Boolean(graphData),
    votes: Boolean(votesData),
    odds: Boolean(oddsData),
    statistics: Boolean(statisticsData),
    homeStats: Boolean(homeStats),
    awayStats: Boolean(awayStats),
  },

  sourceFiles: {
    event: eventFile,
    lineups: lineupsFile,
    graph: graphFile,
    votes: votesFile,
    odds: oddsFile,
    statistics: statisticsFile,
    homeStats: homeStatsFile,
    awayStats: awayStatsFile,
  },

  matchStats,

  teamStats: {
    home: {
      team: homeTeam.name,
      data: homeStats?.data ?? null,
    },
    away: {
      team: awayTeam.name,
      data: awayStats?.data ?? null,
    },
  },

  votes: votesData?.data ?? null,
  lineups: lineupsData?.data ?? null,
  graph: graphData?.data ?? null,
  odds: oddsData?.data ?? null,
};

fs.writeFileSync(outputFile, JSON.stringify(summary, null, 2));

console.log(`✅ Summary created: ${outputFile}`);
console.log(`Match: ${homeTeam.name} vs ${awayTeam.name}`);
console.log(`Captured files: ${summary.filesCaptured}`);
console.log(summary.availableData);
console.log("Match stats:", summary.matchStats);