// var array = [
//   { Player: "Person A", Success: 12, Loose: 0 },
//   { Player: "Person B", Success: 0, Loose: 12 },
//   { Player: "Person A", Success: 11, Loose: 17 },
//   { Player: "Person C", Success: 17, Loose: 11 },
// ];

// var output = [];

// array.forEach(function (item) {
//   var existing = output.filter(function (v, i) {
//     return v.Player == item.Player;
//   });
//   if (existing.length) {
//     var existingIndex = output.indexOf(existing[0]);
//     output[existingIndex].Success =
//       output[existingIndex].Success + item.Success;
//     output[existingIndex].Loose = output[existingIndex].Loose + item.Loose;
//   } else {
//     if (typeof item.Success == "string") item.Success = [item.Success];
//     output.push(item);
//   }
// });

// console.dir(output);

var allScore = [
  { player: "playerA", success: 12, failed: 0 },
  { player: "playerB", success: 0, failed: 12 },
  { player: "playerA", success: 11, failed: 17 },
  { player: "playerC", success: 17, failed: 11 },
];

//console.log(allScore);

function Stats(inputPlayer) {
  var win = 0,
    lose = 0;
  allScore.forEach((result) =>
    result.player === inputPlayer
      ? ((win += result.success), (lose += result.failed))
      : null
  );
  return [win, lose];
}

console.log(Stats("playerA"));
