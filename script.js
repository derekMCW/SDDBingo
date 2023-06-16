const table = document.querySelector("#tblBingo");

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let arr = Array.apply(null, { length: 9 }).map((_, index) => index + 1);
shuffle(arr);

function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex]
    ];
  }

  return arr;
}

let iterator = 0;
let cellCounter = 0;

for (i = 0; i < 3; i++) {
  let tr = document.createElement("tr");
  table.appendChild(tr);

  for (j = 0; j < 3; j++) {
    let td = document.createElement("td");
    td.id = arr[iterator].toString();
    td.style.height = "33.33%";
    td.style.width = "33.33%";
    td.classList.add("main-table-cell");

    let div = document.createElement("div");
    div.classList.add("cell-format");
    div.textContent = arr[iterator].toString();
    td.appendChild(div);
    tr.appendChild(td);
    iterator++;
  }
}

const cell = document.querySelectorAll(".main-table-cell");
let winningIterator = 0;
cell.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.add("strickout");
    cellCounter++;
    if (cellCounter === 9) {
      alert("Bingo!");
    }
  });
});

function matchWin() {
  const cell = document.querySelectorAll(".main-table-cell");

  return winningPositions.some((combination) => {
    let ite = 0;
    combination.forEach((index) => {
      if (cell[index].classList.contains("strickout")) ite++;
    });

    if (ite === 3) {
      let indexWin = winningPositions.indexOf(combination);
      winningPositions.splice(indexWin, 1);
    }

    return combination.every((index) => {
      return cell[index].classList.contains("strickout");
    });
  })
  || (cell[0].classList.contains("strickout") &&
      cell[4].classList.contains("strickout") &&
      cell[8].classList.contains("strickout"))
  || (cell[2].classList.contains("strickout") &&
      cell[4].classList.contains("strickout") &&
      cell[6].classList.contains("strickout"));
}

console.log(arr);

// new game
const newGameButton = document.querySelector("#new-game-button");

newGameButton.addEventListener("click", () => {
  location.reload();
  winningIterator = 0;
  document.getElementById("lines-matched-value").textContent = winningIterator;
});

// timer
const timer = document.querySelector("#timer");
const timeLeft = document.querySelector("#time-left");
let time = 180;

let countdown = setInterval(() => {
  time--;
  timeLeft.textContent = time;

  if (time == 0) {
    clearInterval(countdown);
    location.reload();
  }
}, 1000);

function chooseLetter() {
  let randomNum = Math.random();
  if (randomNum < 0.5) {
    return "A";
  } else {
    return "B";
  }
}

const randomButton = document.getElementById("random-button");
const resultParagraph = document.getElementById("result");

randomButton.addEventListener("click", () => {
  let letter = chooseLetter();
  resultParagraph.textContent = "The randomly chosen letter is: " + letter;
});