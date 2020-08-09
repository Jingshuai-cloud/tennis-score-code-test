const {
  checkCommandLineIsValid,
  getAllMatchId,
  getAllPlayersName,
  checkCommandArgNum,
  checkMatchIdIsValid,
  checkPlayerNameIsValid,
  printCommandLineFormatNotValid,
  printCommandLineMatchIdNotValid,
  printCommandLinePlayerNameNotValid,
} = require("./checkCommandLine");

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

it("check the input command line argument is valid", () => {
  let testCommandArgs = ["01", "Person A"];
  expect(checkCommandLineIsValid(testCommandArgs, testMatchArray)).toBe(true);
  testCommandArgs = ["01"];
  expect(checkCommandLineIsValid(testCommandArgs, testMatchArray)).toBe(false);
});

it("get all valid match ID", () => {
  expect(getAllMatchId(testMatchArray)).toStrictEqual(["01", "02"]);
});

it("get all valid player name", () => {
  expect(getAllPlayersName(testMatchArray)).toStrictEqual([
    "Person A",
    "Person B",
    "Person B",
    "Person C",
  ]);
});

it("command line argument number is 2", () => {
  let commandArg = [];
  expect(checkCommandArgNum(commandArg)).toBe(false);
  commandArg = ["01", "Person A"];
  expect(checkCommandArgNum(commandArg)).toBe(true);
});

it("command line match ID is valid", () => {
  let matchId = "03";
  expect(checkMatchIdIsValid(matchId, testMatchArray)).toBe(false);
  matchId = "01";
  expect(checkMatchIdIsValid(matchId, testMatchArray)).toBe(true);
});

it("command line player name is valid", () => {
  let playerName = "Person D";
  expect(checkPlayerNameIsValid(playerName, testMatchArray)).toBe(false);
  playerName = "Person A";
  expect(checkPlayerNameIsValid(playerName, testMatchArray)).toBe(true);
});

it("print the correct command line format", () => {
  console.log = jest.fn();
  printCommandLineFormatNotValid();
  expect(console.log).toHaveBeenCalledWith(
    "Please enter the correct command:\n",
    "yarn tennis-caculator  [MatchID]  [Player Name]\n",
    "---------------------------------\n",
    "For example:\n",
    'yarn tennis-caculator 02 "Person A"\n',
    "---------------------------------\n"
  );
});

it("print command line match id is not valid", () => {
  console.log = jest.fn();
  const matchId = "05",
    allMatchId = ["01", "02"];
  printCommandLineMatchIdNotValid(matchId, allMatchId);
  expect(console.log).toHaveBeenCalledWith(
    "There is no match 05 ,\n",
    "Valid match Id are 01,02\n",
    "Please run the command again."
  );
});

it("print command line player name is not valid", () => {
  console.log = jest.fn();
  const playerName = "Jingshuai",
    allPlayerName = ["Person A", "Person B"];
  printCommandLinePlayerNameNotValid(playerName, allPlayerName);
  expect(console.log).toHaveBeenCalledWith(
    "There is no player Jingshuai ,\n",
    "Valid player name are Person A,Person B\n",
    "Please run the command again."
  );
});
