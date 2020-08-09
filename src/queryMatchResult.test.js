const {
  getMatchScoreByMatchId,
  getTwoMatchPlayerName,
  scoreDataIsValid,
  countPointScore,
  playerWinOneGame,
  caculateGameResult,
  caculateSetResult,
  printMatchResult,
} = require("./queryMatchResult");

const testMatchArray = [
  [
    "01",
    "Person A vs Person B",
    "0",
    "1",
    "0",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ],
  [
    "02",
    "Person B vs Person C",
    "1",
    "0",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
  ],
];
const testMatchId = "01";
const testFirstMatchScore = testMatchArray[0];
const testSecondMatchScore = testMatchArray[1];

it("get the correct match score data by match ID", () => {
  expect(getMatchScoreByMatchId(testMatchArray, testMatchId)[0]).toBe("01");
});

it("get two match player names", () => {
  const twoPlayerName = getTwoMatchPlayerName(testFirstMatchScore);
  expect(twoPlayerName[0]).toBe("Person A");
  expect(twoPlayerName[1]).toBe("Person B");
});

it("correctly count the score in match array", () => {
  expect(countPointScore("0")).toStrictEqual([1, 0]);
  expect(countPointScore("1")).toStrictEqual([0, 1]);
});

it("check the score data in match is valid", () => {
  const validData = "1",
    inValidData = "";
  expect(scoreDataIsValid(validData)).toBe(true);
  expect(scoreDataIsValid(inValidData)).toBe(false);
});

it("check if the player win a game score", () => {
  let point = 3,
    difference = 1;
  expect(playerWinOneGame(point, difference)).toStrictEqual([0, 3]);
  point = 4;
  difference = 1;
  expect(playerWinOneGame(point, difference)).toStrictEqual([0, 4]);
  point = 5;
  difference = 1;
  expect(playerWinOneGame(point, difference)).toStrictEqual([0, 5]);
  point = 4;
  difference = 2;
  expect(playerWinOneGame(point, difference)).toStrictEqual([1, 0]);
});

it("caculate the game score for one match", () => {
  expect(caculateGameResult(testFirstMatchScore)).toStrictEqual([2, 0]);
  expect(caculateGameResult(testSecondMatchScore)).toStrictEqual([0, 2]);
});

it("caculate the set score for one match", () => {
  expect(caculateSetResult([17, 11])).toStrictEqual([2, 1]);
  expect(caculateSetResult([12, 0])).toStrictEqual([2, 0]);
  expect(caculateSetResult([11, 17])).toStrictEqual([1, 2]);
  expect(caculateSetResult([0, 12])).toStrictEqual([0, 2]);
});

it("correctly print the first match result", () => {
  console.log = jest.fn();
  printMatchResult(testFirstMatchScore, [2, 1]);
  expect(console.log.mock.calls[0][0]).toBe("Person A defeated Person B");
  expect(console.log.mock.calls[1][0]).toBe("2 sets to 1");
  expect(console.log.mock.calls[2][0]).toBe("-----------------------");
});

it("correctly print the second match result", () => {
  console.log = jest.fn();
  printMatchResult(testSecondMatchScore, [0, 2]);
  expect(console.log.mock.calls[0][0]).toBe("Person C defeated Person B");
  expect(console.log.mock.calls[1][0]).toBe("2 sets to 0");
  expect(console.log.mock.calls[2][0]).toBe("-----------------------");
});
