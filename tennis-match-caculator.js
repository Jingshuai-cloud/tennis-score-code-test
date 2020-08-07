const { readMatchScoreToArray } = require("./readScoreFile");
const {
  getMatchScoreByMatchId,
  caculateGameResult,
  caculateSetResult,
  printMatchResult,
} = require("./caculateMatchResult");
const { getOneSpecificPlayerScore } = require("./caculatePlayerScore");

//read file data
const scoreFile = "./full_tournament.txt";
const allMatchScore = readMatchScoreToArray(scoreFile);

const getOneMatchResult = (allMatchScore, matchId) => {
  const matchScore = getMatchScoreByMatchId(allMatchScore, matchId);
  const gameScore = caculateGameResult(matchScore);
  const setScore = caculateSetResult(gameScore);
  printMatchResult(matchScore, setScore);
};

const getOnePlayerScore = (allMatchScore, inputPlayer) => {
  getOneSpecificPlayerScore(allMatchScore, inputPlayer);
};

const commandArgs = process.argv.slice(2);
//console.log(commandArgs);

//run node tennis-match-caculator.js 02 "Person A"
getOneMatchResult(allMatchScore, commandArgs[0]);
getOnePlayerScore(allMatchScore, commandArgs[1]);

//run directly with assigned values
// getOneMatchResult(allMatchScore, "02");
// getOnePlayerScore(allMatchScore, "Person A");
