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
            result = "none";
    
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


function changeSelectedStyle(elementId, direction, style='selected'){
    
    let element = document.querySelector(`#${elementId}`);

    if (direction=='add') element.classList.add('selected');
    if (direction=='remove') element.classList.remove('selected')
}

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    gameNumber = 0;
    btns = document.querySelectorAll('.game-button');
    btns.forEach(btn => btn.classList.remove('selected'));
    btns.forEach(btn => btn.classList.remove('hover'));
    document.querySelector('#next').classList.add('hover');
    document.querySelector('#start-next').textContent = 'Start Game';
    gameState = "start";
    setDefaultMessages();

    if (rpsInterval) clearInterval(rpsInterval);

 }


 function setDefaultMessages() {
    const msgBox = document.querySelector('#message');
    const msgBox2 = document.querySelector('#result');
    const scoreBox = document.querySelector('#scores');
    scoreBox.textContent = `Game Number: ${gameNumber}. Your Score: ${playerScore}. Computer Score: ${computerScore}.`;
    if (gameNumber==0) msgBox.textContent = `Play against the computer.  First to ${MAX_SCORE} wins!`;
    if (gameNumber>0) msgBox.textContent = 'Choose a new selection';
    
    RPS.textContent = 'Click Start Game to Start!';

    //document.querySelector('#start-next').textContent = 'Start Game';

    msgBox2.textContent = '';

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
        default:
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



function checkWin(computerSelection){


    if (gameState !== 'playerWin' && gameState !== 'computerWin') return;
    
    
    else {
        const msgBox = document.querySelector('#message');
        const msgBox2 = document.querySelector('#result');

        difference = Math.abs(playerScore - computerScore);
        let plural = '';
        if (difference !== 1) plural = 's';
        
        document.querySelector('#next').classList.remove('hover');

        if (gameState == 'computerWin' && computerSelection == 'none'){
        msgBox.textContent = `Sorry! You forfeit this round to the computer.`
        msgBox2.textContent = `The computer beat you by ${playerScore - computerScore} point${plural}`;
    }
        
        else if (gameState == 'playerWin') {
            msgBox.textContent = `Congratulations! The computer chose ${computerSelection}.`
            msgBox2.textContent = `You beat the computer by ${playerScore - computerScore} point${plural}!`;
        }
        else if (gameState == 'computerWin'){

        msgBox.textContent = `Sorry! The computer chose ${computerSelection}.`
        msgBox2.textContent = `The computer beat you by ${computerScore - playerScore} point${plural}. Reset to try again!`;


        }
    }

}



function handleEarly(){
    clearInterval(rpsInterval);
    RPS.textContent = 'Too Early!'
    const msgBox = document.querySelector('#message')
    msgBox.textContent = 'You forfeit this round to the computer.'
    for (item of ['rock', 'paper', 'scissors']){
        document.querySelector(`#${item}`).classList.remove('hover');
    }
    document.querySelector('#next').classList.add('hover');
    document.querySelector('#reset').classList.add('hover');
    computerScore ++;
    roundResultMessage([,,], [playerScore, computerScore, gameNumber]);
    
    if (playerScore == MAX_SCORE) gameState = 'playerWin';
    else if (computerScore == MAX_SCORE) gameState = 'computerWin';
    else gameState = 'pause';
    checkWin('none');
}



function handleLate(){
    clearInterval(rpsInterval);
    RPS.textContent = 'You waited too long!'
    const msgBox = document.querySelector('#message')
    msgBox.textContent = 'You forfeit this round to the computer.'
    for (item of ['rock', 'paper', 'scissors']){
        document.querySelector(`#${item}`).classList.remove('hover');
    }
    document.querySelector('#next').classList.add('hover');
    document.querySelector('#reset').classList.add('hover');
    computerScore ++;
    roundResultMessage([,,], [playerScore, computerScore, gameNumber]);
    if (playerScore == MAX_SCORE) gameState = 'playerWin';
    else if (computerScore == MAX_SCORE) gameState = 'computerWin';
    else gameState = 'pause';
    
    result = playRound('none');
    checkWin('none');

}




function updateGame(selection){
    
    
    if (selection == 'start-next') selection = 'next';

    if (selection == "reset") {
        resetGame();
        return;
    }

    else if (gameState == 'early' && selection !== 'next'){
        handleEarly();
        return;
    }

    else if (gameState == 'late'){
        handleLate();
        return;
    }

    else if(gameState=="pause" || gameState == 'start'){
        if (selection !== "next") return;
        else if (selection == "next"){

            document.querySelectorAll('button').forEach(btn=> btn.classList.remove('selected'))
            document.querySelector('#next').classList.remove('hover');
            for (item of ['rock', 'paper', 'scissors']){
                document.querySelector(`#${item}`).classList.add('hover')
            }
            document.querySelector('#reset').classList.add('hover');
            document.querySelector('#start-next').textContent = 'Next Round';
        
            
            setDefaultMessages();
            animateRPS();

            }
        }



    else if (gameState=='play'){


        if(selection == 'rock' || selection == 'paper' || selection == 'scissors'){
            

            if(clearInterval(rpsInterval)) clearInterval(rpsInterval);
            
            changeSelectedStyle(selection, "add"); 
            roundResult = playRound(selection);
            updateScore(roundResult);

            let scores = [playerScore, computerScore, gameNumber]

            roundResultMessage(roundResult, scores);
        

            for (item of ['rock', 'paper', 'scissors']){
                document.querySelector(`#${item}`).classList.remove('hover')
            }
            document.querySelector('#next').classList.add('hover');

        if (playerScore == MAX_SCORE) gameState = 'playerWin';
        else if (computerScore == MAX_SCORE) gameState = 'computerWin';
        else gameState = 'pause';

        }

        checkWin(roundResult[1]);
    }}
    
    
let playerScore = 0;
let computerScore = 0;
let gameNumber = 0;
let gameState = 'start';
let MAX_SCORE = 3;
let MAX_WAIT = 2;
let rpsInterval;



const buttons = document.querySelectorAll('.game-button');
const RPS = document.querySelector('.RPS');



window.addEventListener('keydown', getSelectionFromInput);
buttons.forEach(btn => btn.addEventListener('click', getSelectionFromInput));

const lowerResults = document.querySelector('#message');
const lowerResults2 = document.querySelector('#scores');


document.querySelector('#message').textContent = `Play against the computer. First to ${MAX_SCORE} wins!`;



function animateRPS(){
    const rpsOptions = ['Rock...', 'Paper...', 'Scissors...', 'Shoot!']
    let rpsCounter = 0;
    let lateCounter = 0;
    exit = 0;
    const msgBox = document.querySelector('#message')
    let end = false;
    gameState = 'early'

    function updateRPS(){
        RPS.textContent = rpsOptions[rpsCounter];

        if (rpsCounter == rpsOptions.length-1 || end == true){
            RPS.textContent = rpsOptions[rpsOptions.length-1];
            end = true;
            gameState = 'play';
            lateCounter ++;
        }

        rpsCounter++;

        if (lateCounter >= MAX_WAIT){
            gameState = 'late';
            RPS.textContent = 'You waited too long!';
            msgBox.textContent = 'Computer wins this round.';
            gameState = 'late';
            updateGame('late');
        } 
    }

    updateRPS();
    rpsInterval = setInterval(updateRPS, 700);

}







