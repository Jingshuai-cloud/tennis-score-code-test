const { readMatchScoreToArray } = require("./readScoreFile");

it("correctly read txt file data", () => {
  const txtFile = "./full_tournament.txt";
  const allScoreArray = readMatchScoreToArray(txtFile);
  expect(allScoreArray.length).toBe(2);
  expect(allScoreArray[0][0]).toBe("01");
  expect(allScoreArray[1][0]).toBe("02");
});
