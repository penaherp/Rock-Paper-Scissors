const selectionButtons = document.querySelectorAll("[data-selection]");
const computerResultsColumn = document.querySelector("[data-computer-column]");
const userScore = document.querySelector("[data-user-score]");
const compScore = document.querySelector("[data-computer-score]");
const message = document.querySelector("[data-results-message]");

const SELECTIONS = [
    {
        name: "rock",
        emoji: "👊",
        beats: ["scissors","lizard"]
    },{
        name: "paper",
        emoji: "✋",
        beats: ["rock","spock"]
    },{
        name: "scissors",
        emoji: "✌️",
        beats: ["paper","lizard"]
    },{
        name: "lizard",
        emoji: "🦎",
        beats: ["paper","spock"]
    },{
        name: "spock",
        emoji: "🖖🏼",
        beats: ["rock","scissors"]
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
        message.innerText = "Congratulations! You win!";
        message.classList.remove("loser");
        message.classList.add("winner");
    } else if(compWinner) {
        compScore.innerText = parseInt(compScore.innerText) + 1;
        message.innerText = "Dang! You'll get 'em next time!";
        message.classList.add("loser");
        message.classList.remove("winner");
    } else {
        message.innerText = "It's a draw!";
        message.classList.remove("winner");
        message.classList.remove("loser");
    }
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function isWinner (selection, opposingSelection) {
    return selection.beats.includes(opposingSelection.name);
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