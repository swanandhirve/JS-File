//Tic Tac Toe Game
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, player0

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();

  console.log("Resetting game, hiding message container.");
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      //playerO
      box.innerText = "O";
      turn0 = false;
    } else {
      //playerX
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkDraw();
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const checkDraw = () => {
  let count = 0;

  for (let box of boxes) {
    if (box.disabled) {
      count += 1;
    }
  }
  if (count === 9) {
    msg.innerText = `There is Draw between X and O`;
    msgContainer.classList.remove("hide");
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
