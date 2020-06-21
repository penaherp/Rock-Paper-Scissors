const selectionButtons = document.querySelectorAll("[data-selection]");
const computerResultsColumn = document.querySelector("[data-computer-column]");
const userScore = document.querySelector("[data-user-score]");
const compScore = document.querySelector("[data-computer-score]");

const SELECTIONS = [
    {
        name: "rock",
        emoji: "👊",
        beats: "scissors"
    },{
        name: "paper",
        emoji: "✋",
        beats: "rock"
    },{
        name: "scissors",
        emoji: "✌️",
        beats: "paper"
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener("click", e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    });
});

function makeSelection(selection) {
    const computerSelection = randomSelection();
    console.log("Your selection: " + JSON.stringify(selection));
    console.log("The computer's selection: " + JSON.stringify(computerSelection));
    const userWinner = isWinner(selection, computerSelection);
    const compWinner = isWinner(computerSelection, selection);
    console.log("Who won? " + (userWinner === compWinner ? "It's a draw!" : (userWinner === true ? "You did!" : "The computer did.  Boo!")));
    addSelectionResult(computerSelection, compWinner);
    addSelectionResult(selection, userWinner);

    if(userWinner) {
        userScore.innerText = parseInt(userScore.innerText) + 1;
    } else compScore.innerText = parseInt(compScore.innerText) + 1;
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function isWinner (selection, opposingSelection) {
    return selection.beats === opposingSelection.name;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement("div");
    div.innerText = selection.emoji;
    div.classList.add("result-selection");
    if(winner) {
        div.classList.add("winner");
    }
    computerResultsColumn.after(div);
}