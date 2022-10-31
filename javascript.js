console.log("Hello World");



getComputerChoice = () => {

    let choice = Math.floor(Math.random()*3+1)
    let result;

    switch (choice) {

        case 1:
            result = "Rock";
            break;

        case 2:
            result = "Paper";
            break;

        case 3:
            result = "Scissors";
    }
    return result;
}

findWinner = (playerSelection, computerSelection) => {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();


    if(playerSelection == computerSelection){
        return result = "tie";
    }

    switch(playerSelection){
        case "rock":
            computerSelection == "scissors" ? result = "player": result = "computer";
            break;
        
        case "scissors":
            computerSelection == "paper" ? result = "player": result = "computer";
            break;
        
        case "paper":
            computerSelection == "rock" ? result = "player": result = "computer";

        
    }

    return result;

}

playRound = (playerSelection, computerSelection) =>{

    let winner = findWinner(playerSelection, computerSelection)
    let message

    switch(winner){

        case "tie":
            message = "Tie! Play again to find a winner.";
            break;

        case "computer":
            message = "You lose!  Try your luck again.";
            break;

        case "player":
            message = "You win! Congratulations.";
            break;
    }

    console.log(message);
    return winner
}

getPlayerInput = () => {
    playerInput = prompt("Rock, paper, or scissors?");
    playerInput = playerInput.toLowerCase();

    if(playerInput == "rock"||playerInput== "paper" || playerInput == "scissors"){
        return playerInput;
    }

    else{
        console.log("Only select rock, paper, or scissors");
        getPlayerInput();
        return playerInput;
    }
    
}


game = () => {
    let winner;
    let playerScore = 0;
    let computerScore = 0;
    let victor;
    for(let i=0; i<5; i++){
        winner = playRound(getPlayerInput(), getComputerChoice());

        switch(winner){
            case "player":
                playerScore++;
                break;
            case "computer":
                computerScore++;
                break;
        }}

    if(playerScore > computerScore){
        victor = "player";
        console.log(`You won with a score of ${playerScore}!.  Computer loses with a score of ${computerScore}.`);
        return;
    }
    else if(computerScore > playerScore){
        victor = "computer";
        console.log(`Computer wins with a score of ${computerScore}!. You lost with a score of ${playerScore}.`);
        return;
    }     
    else{
        victor = "tie"
        console.log(`Tie!`);
    }
            
}

game();