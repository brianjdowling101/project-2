// Define an array of game options
const options = ["rock", "paper", "scissors", "lizard", "spock"];

// Initialize player and computer scores
let playerScore = 0;
let computerScore = 0;

// Get DOM elements for displaying scores and result
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resultDisplay = document.getElementById("result");

// Function to play a round of the game
function playRound(playerSelection, computerSelection) {
    // Find the indexes of player and computer selections in the options array
    const playerIndex = options.indexOf(playerSelection);
    const computerIndex = options.indexOf(computerSelection);

    // Determine the result of the round based on the difference in indexes
    const resultIndex = (playerIndex - computerIndex + 5) % 5;
    switch (resultIndex) {
        // If indexes are equal, the round is a tie
        case 0:
            return "Tie!";
        // If the difference in indexes is 1 or 3, the player wins the round
        case 1:
        case 3:
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            // If the player's score reaches 15, display win message and disable options
            if (playerScore === 15) {
                resultDisplay.textContent = "You win!";
                disableOptions();
                showPlayAgainButton();
            }
            return "Win!";
        // If the difference in indexes is 2 or 4, the computer wins the round
        case 2:
        case 4:
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            // If the computer's score reaches 15, display lose message and disable options
            if (computerScore === 15) {
                resultDisplay.textContent = "You lose!";
                disableOptions();
                showPlayAgainButton();
            }
            return "Lose!";
    }
}

// Function to randomly generate the computer's selection
function computerPlay() {
    return options[Math.floor(Math.random() * options.length)];
}

// Function to reset the game scores and display
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = "";
    enableOptions();
    hidePlayAgainButton();
}

// Function to disable the game options
function disableOptions() {
    const optionsButtons = document.querySelectorAll(".options button");
    optionsButtons.forEach((button) => (button.disabled = true));
}

// Function to enable the game options
function enableOptions() {
    const optionsButtons = document.querySelectorAll(".options button");
    optionsButtons.forEach((button) => (button.disabled = false));
}

// Function to display the "play again" button
function showPlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    playAgainButton.style.display = "inline-block";
}

// Function to hide the "play again" button
function hidePlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    playAgainButton.style.display = "none";
}

// Get the start button element by its ID and add a click event listener to reset the game when clicked
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
    resetGame();
});

// Get the play again button element by its ID and add a click event listener to reset the game when clicked
const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", () => {
    resetGame();
});

// Get all the options buttons and add a click event listener to each of them
const optionsButtons = document.querySelectorAll(".options button");
optionsButtons.forEach((button) =>
    button.addEventListener("click", () => {
        // Get the computer's selection
        const computerSelection = computerPlay();
        // Play a round with the player's selection and the computer's selection
        const result = playRound(button.id, computerSelection);
        // Display the result of the round
        resultDisplay.textContent = result;
    })
);