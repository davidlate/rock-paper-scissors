console.log("Hello World");



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
        
        default:
            result = "error";
    
        }
        const output = [playerSelection, computerSelection, result]
    return output;

}





function getSelectionFromKey(e) {
    let div = document.querySelector(`.game-button[data-key="${e.key}"]`);
    if (!div) return;
    let selection = div.id;
    output = playRound(selection);
    console.log(output);
}

function getSelectionFromClick(e){
    let selection;
    if (e.target.classList.contains('keypress')) selection = e.target.parentNode.id;
    else selection = e.target.id;
    output = playRound(selection);
    console.log(output)
}

const buttons = document.querySelectorAll('.game-button');


window.addEventListener('keydown', getSelectionFromKey);
buttons.forEach(btn => btn.addEventListener('click', getSelectionFromClick));

