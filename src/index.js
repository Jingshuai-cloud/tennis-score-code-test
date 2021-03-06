const { readMatchScoreToArray } = require("./readScoreFile");
const {
  getMatchScoreByMatchId,
  caculateGameResult,
  caculateSetResult,
  printMatchResult,
} = require("./queryMatchResult");
const {
  getOneSpecificPlayerScore,
  printOneSpecificPlayerScore,
} = require("./queryPlayerScore");
const { checkCommandLineIsValid } = require("./checkCommandLine");

//read file data
const scoreFile = "./full_tournament.txt";
const allMatchScore = readMatchScoreToArray(scoreFile);

//read command line
const commandArgs = process.argv.slice(2);

const printMatchResultAndPlayerScore = (commandArgs, allMatchScore) => {
  if (checkCommandLineIsValid(commandArgs, allMatchScore)) {
    printOneMatchResult(allMatchScore, commandArgs[0]);
    printOnePlayerScore(allMatchScore, commandArgs[1]);
    return true;
  }
  return false;
};

const printOneMatchResult = (allMatchScore, matchId) => {
  const matchScore = getMatchScoreByMatchId(allMatchScore, matchId);
  const gameScore = caculateGameResult(matchScore);
  const setScore = caculateSetResult(gameScore);
  printMatchResult(matchScore, setScore);
};

const printOnePlayerScore = (allMatchScore, inputPlayer) => {
  const playerScore = getOneSpecificPlayerScore(allMatchScore, inputPlayer);
  printOneSpecificPlayerScore(playerScore);
};

printMatchResultAndPlayerScore(commandArgs, allMatchScore);

module.exports = {
  printMatchResultAndPlayerScore,
  printOneMatchResult,
  printOnePlayerScore,
};
