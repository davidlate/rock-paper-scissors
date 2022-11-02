getComputerChoice = () => {

    let choice = Math.floor(Math.random()*3+1)
    let result;

    switch (choice) {

        case 1:
            result = "rock";
            break;

        case 2:
            result = "paper";
            break;

        case 3:
            result = "scissors";
    }
    return result;
}



function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
    let result;

    if(playerSelection === computerSelection){
        result = "tie"; //player increment; computer increment
        const output = [playerSelection, computerSelection, result]
        return output;
    }

    switch(playerSelection){
        case "rock":
            if (computerSelection == "scissors") result = "player"
            else result = "computer";
            break;
        
        case "scissors":
            if(computerSelection == "paper") result = "player"
            else result = "computer";
            break;
        
        case "paper":
            if (computerSelection == "rock")result = "player"
            else result = "computer";
            break;
        
        case "next":
            result = "next";
            break;
        
        case "reset":
            result = "end";
            break;
        
        default:
            result = "error";
    
        }
        const output = [playerSelection, computerSelection, result]
    return output;

}



function game(selection) {

    const output = playRound(selection);

    if ((playerScore >= 5 || computerScore >= 5) && output[2] !== "end") {
        lowerResults2.textContent = 'Press Enter to reset the game.';
        return;
    }

    let message;

    switch (output[2]){
        case "player":
            playerScore += 1;
            message = `The computer chose ${output[1]}.  You win this round!`;
            break;
    
        case "computer":
            computerScore += 1;
            message = `The computer chose ${output[1]}. You lost this round!`;
            break;
    
        case "tie":
            message =  `The computer also chose ${output[1]}. Tie!`;
            break;

        case "end":
            message = ' ';
            playerScore = 0;
            computerScore = 0;
            gameNumber = 0;

        case "next":
            message = ' ';
    }


    if (playerScore == 5) message = "You beat the computer! Press Enter to reset the game";
    if (computerScore == 5) message = "The computer won this game.  Press Enter to try again";

    message2 = `Game Number: ${gameNumber}.  Your Score: ${playerScore}.  Computer Score: ${computerScore}.`
    lowerResults.textContent = message;
    lowerResults2.textContent = message2;

}



function getSelectionFromKey(e) {
    let div = document.querySelector(`.game-button[data-key="${e.key}"]`);
    if (!div) return;
    let selection = div.id;
    output = game(selection);
}

function getSelectionFromClick(e){
    let selection;
    if (e.target.classList.contains('keypress')) selection = e.target.parentNode;
    else selection = e.target;


    output = game(selection.id);
}


let playerScore = 0;
let computerScore = 0;
let gameNumber = 0;

const buttons = document.querySelectorAll('.game-button');


window.addEventListener('keydown', getSelectionFromKey);
buttons.forEach(btn => btn.addEventListener('click', getSelectionFromClick));

lowerResults = document.querySelector('#message');
lowerResults2 = document.querySelector('#scores');
