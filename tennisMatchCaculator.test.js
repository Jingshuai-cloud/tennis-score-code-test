const {
  printMatchResultAndPlayerScore,
  printOneMatchResult,
  printOnePlayerScore,
} = require("./tennisMatchCaculator");
const { readMatchScoreToArray } = require("./readScoreFile");

const scoreFile = "./full_tournament.txt";
const allMatchScore = readMatchScoreToArray(scoreFile);

it("failed print the input match result and score summary for input player", () => {
  let commandArgs = [""];
  let outcome = printMatchResultAndPlayerScore(commandArgs, allMatchScore);
  expect(outcome).toBe(false);
  commandArgs = ["01", "Person A"];
  outcome = printMatchResultAndPlayerScore(commandArgs, allMatchScore);
  expect(outcome).toBe(true);
});

it("success print the input match result and score summary for input player", () => {
  let commandArgs = ["01", "Person A"];
  let outcome = printMatchResultAndPlayerScore(commandArgs, allMatchScore);
  expect(outcome).toBe(true);
});

it("print match result", () => {
  let matchId = "01";
  console.log = jest.fn();
  printOneMatchResult(allMatchScore, matchId);
  expect(console.log.mock.calls[0][0]).toBe("Person A defeated Person B");
  expect(console.log.mock.calls[1][0]).toBe("2 sets to 0");
  expect(console.log.mock.calls[2][0]).toBe("-----------------------");
});

it("print one player score summary", () => {
  let inputPlayer = "Person A";
  console.log = jest.fn();
  printOnePlayerScore(allMatchScore, inputPlayer);
  expect(console.log.mock.calls[0][0]).toBe("Person A  Score  [ 23,17 ]");
  expect(console.log.mock.calls[1][0]).toBe("-----------------------");
});
