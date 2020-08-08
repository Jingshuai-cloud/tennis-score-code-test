const { getTwoMatchPlayerName } = require("./caculateMatchResult");

const checkCommandLineIsValid = (commandArgs, allMatchScore) => {
  if (
    checkCommandArgNum(commandArgs) &&
    checkMatchIdIsValid(commandArgs[0], allMatchScore) &&
    checkPlayerNameIsValid(commandArgs[1], allMatchScore)
  ) {
    console.log("success");
    return true;
  }
  return false;
};

const getAllMatchId = (allMatchScore) => {
  let allMatchId = [];
  for (let i = 0; i < allMatchScore.length; i++) {
    allMatchId.push(allMatchScore[i][0]);
  }
  return allMatchId;
};

const getAllPlayersName = (allMatchScore) => {
  let allPlayerName = [];
  let oneMatchPlayerName = [];
  for (let i = 0; i < allMatchScore.length; i++) {
    oneMatchPlayerName = getTwoMatchPlayerName(allMatchScore[i]);
    allPlayerName.push(...oneMatchPlayerName);
  }
  return allPlayerName;
};

const checkCommandArgNum = (commandArgs) => {
  if (commandArgs.length != 2) {
    console.log(
      "---------------------------------\n",
      "Please enter the correct command:\n",
      "node tennis-match-caculator.js  [MatchID]  [Player Name]\n",
      "---------------------------------\n",
      "For example:\n",
      'node tennis-match-caculator.js 02 "Person A"\n',
      "---------------------------------\n"
    );
    return false;
  }
  return true;
};

const checkMatchIdIsValid = (matchId, allMatchScore) => {
  const allMatchId = getAllMatchId(allMatchScore);
  for (let i = 0; i < allMatchId.length; i++) {
    if (matchId === allMatchId[i]) {
      return true;
    }
  }
  console.log(
    "There is no match " + matchId + " ,\n",
    "Valid match Id are " + allMatchId + "\n",
    "Please run the command again."
  );
  return false;
};

const checkPlayerNameIsValid = (playerName, allMatchScore) => {
  const allPlayerName = getAllPlayersName(allMatchScore);
  for (let i = 0; i < allPlayerName.length; i++) {
    if (playerName === allPlayerName[i]) {
      return true;
    }
  }
  console.log(
    "There is no player " + playerName + " ,\n",
    "Valid player name are " + allPlayerName + "\n",
    "Please run the command again."
  );
  return false;
};

module.exports = {
  checkCommandLineIsValid,
};
