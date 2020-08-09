const {
  recordTwoPlayersScoreForOneMatch,
  getAllPlayerScore,
  getOneSpecificPlayerScore,
  printOneSpecificPlayerScore,
} = require("./queryPlayerScore");

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

const testFirstMatchScore = testMatchArray[0];
const testSecondMatchScore = testMatchArray[1];

it("record two players score for one match", () => {
  expect(recordTwoPlayersScoreForOneMatch(testFirstMatchScore)).toStrictEqual([
    {
      player: "Person A",
      success: 2,
      failed: 0,
    },
    {
      player: "Person B",
      success: 0,
      failed: 2,
    },
  ]);
});

it("record two players score for one match another situation", () => {
  expect(recordTwoPlayersScoreForOneMatch(testSecondMatchScore)).toStrictEqual([
    {
      player: "Person B",
      success: 0,
      failed: 2,
    },
    {
      player: "Person C",
      success: 2,
      failed: 0,
    },
  ]);
});

it("record all players score for all match", () => {
  expect(getAllPlayerScore(testMatchArray)).toStrictEqual([
    {
      player: "Person A",
      success: 2,
      failed: 0,
    },
    {
      player: "Person B",
      success: 0,
      failed: 2,
    },
    {
      player: "Person B",
      success: 0,
      failed: 2,
    },
    {
      player: "Person C",
      success: 2,
      failed: 0,
    },
  ]);
});

it("get player A score summary", () => {
  const inputPlayer = "Person A";
  expect(getOneSpecificPlayerScore(testMatchArray, inputPlayer)).toStrictEqual([
    2,
    0,
    "Person A",
  ]);
});

it("get player B score summary", () => {
  const inputPlayer = "Person B";
  expect(getOneSpecificPlayerScore(testMatchArray, inputPlayer)).toStrictEqual([
    0,
    4,
    "Person B",
  ]);
});

it("get player C score summary", () => {
  const inputPlayer = "Person C";
  expect(getOneSpecificPlayerScore(testMatchArray, inputPlayer)).toStrictEqual([
    2,
    0,
    "Person C",
  ]);
});

it("correctly print player A score summary", () => {
  console.log = jest.fn();
  const playerAScore = [2, 0, "Person A"];
  printOneSpecificPlayerScore(playerAScore);
  expect(console.log.mock.calls[0][0]).toBe("Person A  Score  [ 2,0 ]");
  expect(console.log.mock.calls[1][0]).toBe("-----------------------");
});
