const readMatchScoreToArray = () => {
  let fs = require("fs");
  //read txt as array and split by "Match"
  let arraySplitByMtach = fs
    .readFileSync("./full_tournament.txt", "utf8")
    .toString()
    .split("Match: ");

  //Clean the array
  let matchArray = [];
  for (let i = 1; i < arraySplitByMtach.length; i++) {
    matchArray.push(arraySplitByMtach[i].toString().split("\r\n"));
  }
  return matchArray;
};

const getMatchScoreByMatchId = (matchArray, matchId) => {
  for (let i = 0; i < matchArray.length; i++) {
    if (matchId === matchArray[i][0]) {
      return matchArray[i];
    }
  }
};

const getTwoMatchPlayerName = (matchScore) => {
  const matchPlayers = matchScore[1].split("vs");
  const firstPlayer = matchPlayers[0].trim();
  const secondPlayer = matchPlayers[1].trim();
  const matchPlayersRemoveSpace = [];
  matchPlayersRemoveSpace.push(firstPlayer, secondPlayer);
  return matchPlayersRemoveSpace;
};

const scoreDataIsValid = (singleScore) => {
  const scoreRange = ["0", "1"];
  if (!scoreRange.includes(singleScore)) {
    return false;
  }
  return true;
};

const countPointScore = (singleScore) => {
  let count0 = 0,
    count1 = 0,
    count = [];
  const scoreA = { "0": 1, "1": 0 },
    scoreB = { "0": 0, "1": 1 };
  count0 += scoreA[singleScore];
  count1 += scoreB[singleScore];
  count = [count0, count1];
  return count;
};

const playerWinOneGame = (point, difference) => {
  let gamePoint = [0, point];
  if (point >= 4 && difference >= 2) {
    point = 0;
    gamePoint = [1, point];
  }
  return gamePoint;
};

const getGameResult = (matchScore) => {
  let firstPlayerPoint = 0,
    secondPlayerPoint = 0,
    firstPlayerGame = 0,
    secondPlayerGame = 0,
    countPoint = [],
    gameScore = [];

  for (let i = 2; i < matchScore.length; i++) {
    //if fail, fail fast
    if (scoreDataIsValid(matchScore[i])) {
      countPoint = countPointScore(matchScore[i]);
      firstPlayerPoint += countPoint[0];
      secondPlayerPoint += countPoint[1];

      difference = Math.abs(firstPlayerPoint - secondPlayerPoint);

      let ifFirstWinGame = playerWinOneGame(firstPlayerPoint, difference);
      firstPlayerGame += ifFirstWinGame[0];
      firstPlayerPoint = ifFirstWinGame[1];

      let ifSecondWinGame = playerWinOneGame(secondPlayerPoint, difference);
      secondPlayerGame += ifSecondWinGame[0];
      secondPlayerPoint = ifSecondWinGame[1];
    }
  }

  gameScore.push(firstPlayerGame, secondPlayerGame);
  return gameScore;
};

const getSetResult = (gameScore) => {
  let setPerson = [];
  if (gameScore[0] > 12) {
    setPerson = [2, 1];
  }
  if (gameScore[0] === 12) {
    setPerson = [2, 0];
  }
  if (gameScore[1] > 12) {
    setPerson = [1, 2];
  }
  if ([gameScore[1]] === 12) {
    setPerson[(0, 2)];
  }
  return setPerson;
};

const getMatchResult = (setScore) => {
  const playersName = getTwoMatchPlayerName;
  const firstPlayerName = playersName[0];
  const secondPlayerName = playersName[1];
  if (setScore[0] === 2) {
    console.log(firstPlayerName + " defeated " + secondPlayerName);
    console.log(gameScore[0] + " sets to " + gameScore[1]);
    setPerson1 = 0;
  } else {
    console.log(secondPlayerName + " defeated " + firstPlayerName);
    console.log(gameScore[1] + " sets to " + gameScore[0]);
    setPerson2 = 0;
  }
};

const recordTwoPlayersScoreForOneMatch = (matchScore) => {
  const twoPlayersName = getTwoMatchPlayerName(matchScore);
  const firstPlayer = twoPlayersName[0];
  const secondPlayer = twoPlayersName[1];
  const twoplayersGameResult = getGameResult(matchScore);
  const firstPlayerSuceessScore = twoplayersGameResult[0];
  const secondPlayerSuccessScore = twoplayersGameResult[1];
  const twoPlayersScore = [
    {
      player: firstPlayer,
      success: firstPlayerSuceessScore,
      failed: secondPlayerSuccessScore,
    },
    {
      player: secondPlayer,
      success: secondPlayerSuccessScore,
      failed: firstPlayerSuceessScore,
    },
  ];
  return twoPlayersScore;
};

const getAllPlayerScore = (matchArray) => {
  let allScore = [];
  for (let i = 0; i < matchArray.length; i++) {
    let score = recordTwoPlayersScoreForOneMatch(matchArray[i]);

    allScore.push(...score);
  }
  return allScore;
};

const getOneSpecificPlayerScore = (inputPlayer) => {
  let win = 0,
    lose = 0;
  const allScore = getAllPlayerScore(matchArray);
  allScore.forEach((result) =>
    result.player === inputPlayer
      ? ((win += result.success), (lose += result.failed))
      : null
  );
  return [win, lose];
};

const matchArray = readMatchScoreToArray();
const matchScore = getMatchScoreByMatchId(matchArray, "02");
const pointScore = getGameResult(matchScore);

//console.log(getAllPlayerScore(matchArray));
//console.log(getOneSpecificPlayerScore("Person C"));
//console.log(recordTwoPlayersScoreForOneMatch(matchScore));
//console.log(getSetResult(pointScore));
//console.log(countScoreForOneMatch(matchScore));
console.log(getGameResult(matchScore));

//getMatchResult(getMatchScore(matchArray, "02"));
//console.log(getOneSpecificPlayerScore("Person C"));
//console.log(getTwoMatchPlayerName(matchScore));
