const readMatchScoreToArray = (txtFile) => {
  let fs = require("fs");
  let scoreSplitPerMatch = fs
    .readFileSync(txtFile, "utf8")
    .toString()
    .split("Match: ");

  let matchArray = [];
  for (let i = 1; i < scoreSplitPerMatch.length; i++) {
    matchArray.push(scoreSplitPerMatch[i].toString().split("\r\n"));
  }
  return matchArray;
};

module.exports = {
  readMatchScoreToArray,
};
