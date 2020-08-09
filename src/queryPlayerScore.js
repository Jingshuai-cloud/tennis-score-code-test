const {
  getTwoMatchPlayerName,
  caculateGameResult,
} = require("./queryMatchResult");

const recordTwoPlayersScoreForOneMatch = (matchScore) => {
  const twoPlayersName = getTwoMatchPlayerName(matchScore);
  const firstPlayer = twoPlayersName[0];
  const secondPlayer = twoPlayersName[1];
  const twoPlayersGameResult = caculateGameResult(matchScore);
  const firstPlayerSuceessScore = twoPlayersGameResult[0];
  const secondPlayerSuccessScore = twoPlayersGameResult[1];
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

const getOneSpecificPlayerScore = (matchArray, inputPlayer) => {
  let winPoint = 0,
    losePoint = 0;
  const allScore = getAllPlayerScore(matchArray);
  allScore.forEach((result) =>
    result.player === inputPlayer
      ? ((winPoint += result.success), (losePoint += result.failed))
      : null
  );

  return [winPoint, losePoint, inputPlayer];
};

const printOneSpecificPlayerScore = (playerScore) => {
  const winPoint = playerScore[0];
  const losePoint = playerScore[1];
  const inputPlayer = playerScore[2];

  console.log(
    inputPlayer + "  Score  " + "[ " + winPoint + "," + losePoint + " ]"
  );
  console.log("-----------------------");
};

module.exports = {
  getOneSpecificPlayerScore,
  recordTwoPlayersScoreForOneMatch,
  getAllPlayerScore,
  printOneSpecificPlayerScore,
};
