const readMatchScore = () => {
  let fs = require("fs");
  let array = fs
    .readFileSync("./full_tournament.txt", "utf8")
    .toString()
    .split("Match: ");

  let matchArray = [];
  for (let i = 1; i < array.length; i++) {
    matchArray.push(array[i].toString().split("\r\n"));
  }

  return matchArray;
};

const getMatchScore = (matchArray, matchId) => {
  for (let i = 0; i < matchArray.length; i++) {
    if (matchId === matchArray[i][0]) {
      return matchArray[i];
    }
  }
};

const getMatchPlayer = (matchScore) => {
  const matchPlayers = matchScore[1].split("vs");

  return matchPlayers;
};

const getMatchResult = (matchScore) => {
  let count0 = 0;
  let count1 = 0;
  let difference = 0;
  let gamePerson1 = 0;
  let gamePerson2 = 0;
  let countGamePerson1 = 0;
  let countGamePerson2 = 0;
  let setPerson1 = 0;
  let setPerson2 = 0;

  const matchPlayers = getMatchPlayer(matchScore);
  const player1 = matchPlayers[0].trim();
  const player2 = matchPlayers[1].trim();

  for (let i = 2; i < matchScore.length; i++) {
    if (matchScore[i] === "0") {
      count0++;
    }
    if (matchScore[i] === "1") {
      count1++;
    }

    difference = Math.abs(count0 - count1);

    if (count0 >= 4 && difference >= 2) {
      gamePerson1++;
      countGamePerson1++;
      count0 = 0;
      count1 = 0;
    }

    if (count1 >= 4 && difference >= 2) {
      gamePerson2++;
      countGamePerson2++;
      count0 = 0;
      count1 = 0;
    }

    if (gamePerson1 === 6) {
      setPerson1++;
      gamePerson1 = 0;
      gamePerson2 = 0;
    }

    if (gamePerson2 === 6) {
      setPerson2++;
      gamePerson1 = 0;
      gamePerson2 = 0;
    }

    if (setPerson1 === 2) {
      console.log(player1 + " defeated " + player2);
      console.log(setPerson1 + " sets to " + setPerson2);
      setPerson1 = 0;
    }

    if (setPerson2 === 2) {
      console.log(player2 + " defeated " + player1);
      console.log(setPerson2 + " sets to " + setPerson1);
      setPerson2 = 0;
    }
  }

  //   console.log("countgamePerson1:  " + countGamePerson1);

  //   console.log("countgamePerson2:  " + countGamePerson2);

  const playerScore = [
    {
      player: player1,
      success: countGamePerson1,
      failed: countGamePerson2,
    },
    {
      player: player2,
      success: countGamePerson2,
      failed: countGamePerson1,
    },
  ];

  //console.log(playerScore);
  return playerScore;
};

const matchArray = readMatchScore();

const getAllPlayerScore = (matchArray) => {
  let allScore = [];
  for (let i = 0; i < matchArray.length; i++) {
    let score = getMatchResult(matchArray[i]);
    console.log(score);
    console.log("---------");
    allScore.push(...score);
  }
  console.log("allScore:   " + JSON.stringify(allScore));
  return allScore;
};

const getSpecificPlayerScore = (inputPlayer) => {
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
//getMatchResult(getMatchScore(matchArray, "02"));
console.log(getSpecificPlayerScore("Person C"));
