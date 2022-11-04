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


    }


    if (playerScore == 5) message = "You beat the computer! Press Enter to reset the game";
    if (computerScore == 5) message = "The computer won this game.  Press Enter to try again";

    message2 = `Game Number: ${gameNumber}.  Your Score: ${playerScore}.  Computer Score: ${computerScore}.`
    lowerResults.textContent = message;
    lowerResults2.textContent = message2;

}


function getSelectionFromInput(e) {
    let selection;

    if (e.type=='keydown'){ //if input is a keydown

        let div = document.querySelector(`.game-button[data-key="${e.key}"]`);
        if (!div) return; 
        selection = div.id;
    }

    else if(e.type == 'click'){ //if input is a click
        if (e.target.classList.contains('keypress')) selection = e.target.parentNode.id;
        else selection = e.target.id;
    }

    updateGame(selection);
    return selection;
}


function changeSelectedStyle(targetElementIds, direction, style='selected'){
    
    for (elementId of targetElementIds)
    element = document.querySelector(`#${ElementId}`);

    if (direction=='add') element.classList.add('selected');
    if (direction=='remove') element.classList.remove('selected')
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    gameNumber = 0;
    btns = document.querySelectorAll('.game-button');
    btns.forEach(btn => btn.classList.remove('selected'));
    gameState = "play";
    setDefaultMessages();

 }


 function setDefaultMessages() {
    const msgBox = document.querySelector('#message');
    const scoreBox = document.querySelector('#scores')
    scoreBox.textContent = `Game Number: ${gameNumber}. Your Score: ${playerScore}. Computer Score: ${computerScore}.`;
    if (gameNumber==0) msgBox.textContent = 'Play against the computer.  First to 5 wins!';
    if (gameNumber>0) msgBox.textContent = 'Choose a new selection';

}


function roundResultMessage(roundResult, scores){
    //roundResult = [player selection, computer selection, round winner]
    //scores = [playerScore, computerScore, gameNo]
    const msgBox = document.querySelector('#message');
    const scoreBox = document.querySelector('#scores')

    switch (roundResult[2]){
        
        case "tie":
            msgBox.textContent = `The computer also chose ${roundResult[1]}.  Tie!`;
            break;
        case "player":
            msgBox.textContent = `The computer chose ${roundResult[1]}.  You win this round!`;
            break;
        case "computer":
            msgBox.textContent = `The computer chose ${roundResult[1]}.  You lost this round!`;
            break;

        }
    scoreBox.textContent = `Game Number: ${scores[2]}. Your Score: ${scores[0]}. Computer Score: ${scores[1]}.`;

}

function updateScore(roundResult) {
    
    switch (roundResult[2]){
        case "tie":
            gameNumber +=1;
            return;
        case "player":
            playerScore +=1;
            gameNumber +=1;
            return
        case "computer":
            computerScore +=1;
            gameNumber +=1;
            return
        }
    }




function updateGame(selection){
    
    if (selection == "reset") resetGame();
    


    else if(gameState=="pause"){
        if (selection !== "next") return;
        else if (selection == "next"){
            document.querySelectorAll('button').forEach(btn=> btn.classList.remove('selected'))
            setDefaultMessages();
            gameState = 'play';
            return;
            }
        }


    else {

    changeSelectedStyle(selection, "add"); 
    roundResult = playRound(selection);
    updateScore(roundResult);
    let scores = [playerScore, computerScore, gameNumber]

    if (playerScore==MAX_SCORE) gameState = 'playerWin';
    if (computerScore==MAX_SCORE) gameState = 'computerWin';scores;
    roundResultMessage(roundResult, scores);

    gameState = "pause";

    }

}






let playerScore = 0;
let computerScore = 0;
let gameNumber = 0;
let gameState = 'play';
let MAX_SCORE = 5;






const buttons = document.querySelectorAll('.game-button');



window.addEventListener('keydown', getSelectionFromInput);
buttons.forEach(btn => btn.addEventListener('click', getSelectionFromInput));

const lowerResults = document.querySelector('#message');
const lowerResults2 = document.querySelector('#scores');

const RPS = document.querySelector('.RPS');



