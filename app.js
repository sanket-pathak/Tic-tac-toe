let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");

let turn0 = true;
let winnerText = document.querySelector(".hide");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = ""; // Reset background color
    });
    msgContainer.classList.add("hide");
    turn0 = true; // Reset turn to initial state
    count = 0; // Reset move count
};

// Show winner
const showWinner = (winner, winningPattern) => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
    winningPattern.forEach(index => {
        boxes[index].style.backgroundColor = "lightgreen"; // Highlight winning boxes
    });
    winnerText.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let posVal1 = boxes[pattern[0]].innerText,
            posVal2 = boxes[pattern[1]].innerText,
            posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1, pattern);
                return; // Exit function once a winner is found
            }
        }
    }
    if (count === 9) {
        winnerText.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Adding event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked!");
        if (turn0) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turn0 = !turn0;
        box.disabled = true;
        count = count + 1;
        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);
