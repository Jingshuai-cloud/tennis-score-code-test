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
  let firstPlayerPoint = 0,
    secondPlayerPoint = 0,
    twoPlayerPoint = [];
  const scoreFirstPlayer = { "0": 1, "1": 0 },
    scoreSecondPlayer = { "0": 0, "1": 1 };
  firstPlayerPoint += scoreFirstPlayer[singleScore];
  secondPlayerPoint += scoreSecondPlayer[singleScore];
  twoPlayerPoint = [firstPlayerPoint, secondPlayerPoint];
  return twoPlayerPoint;
};

const playerWinOneGame = (point, difference) => {
  let gamePoint = [0, point];
  if (point >= 4 && difference >= 2) {
    point = 0;
    gamePoint = [1, point];
  }
  return gamePoint;
};

const caculateGameResult = (matchScore) => {
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

const caculateSetResult = (gameScore) => {
  if (gameScore[0] > 12) {
    return [2, 1];
  }
  if (gameScore[0] === 12) {
    return [2, 0];
  }
  if (gameScore[1] > 12) {
    return [1, 2];
  }
  if ([gameScore[1]] === 12) {
    return [0, 2];
  }
};

const printMatchResult = (matchScore, setScore) => {
  const playersName = getTwoMatchPlayerName(matchScore);
  const firstPlayerName = playersName[0];
  const secondPlayerName = playersName[1];
  if (setScore[0] === 2) {
    console.log("-----------------------");
    console.log(firstPlayerName + " defeated " + secondPlayerName);
    console.log(setScore[0] + " sets to " + setScore[1]);
    console.log("-----------------------");
  } else {
    console.log("-----------------------");
    console.log(secondPlayerName + " defeated " + firstPlayerName);
    console.log(setScore[1] + " sets to " + setScore[0]);
    console.log("-----------------------");
  }
};

module.exports = {
  getMatchScoreByMatchId,
  getTwoMatchPlayerName,
  caculateGameResult,
  caculateSetResult,
  printMatchResult,
};
