// Access HTML elements
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
// Function to check if a door has been clicked
const isClicked = door => {
    if (door.src === closedDoorPath) {
        return true;
    } else {
        return false;
    }
};

//Function to check if Chore Door has been clicked
const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
};

//Function to display game over message
const gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        increaseWins();
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        increaseLosses();
    } 
    // Set currentlyPlaying to false to prevent further clicks
    currentlyPlaying = false;
    // Update scoreboard
    upateScoreboard();
};


let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

// Define game logic to check doors, progress game, end game, and choose a random chore door
const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
};

const randomChoreDoorGenerator = () => {
  const doorsArray = [botDoorPath, beachDoorPath, spaceDoorPath];
  doorsArray.sort(() => Math.random() - 0.5); 
  [openDoor1, openDoor2, openDoor3] = doorsArray;
};

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
}

// Start a game round
const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    currentlyPlaying = true;
    startButton.innerHTML = 'Good luck!';
    randomChoreDoorGenerator();
};

// Initialize the first round
startRound();

//Local storage  to save wins 
const increaseWins = () => {
    let wins = parseInt(localStorage.getItem('wins')) || 0; 
    wins ++;
    localStorage.setItem('wins', wins);
};

const increaseLosses = () => {
    let losses = parseInt(localStorage.getItem('losses')) || 0; 
    losses ++;
    localStorage.setItem('losses', losses);
};

const upateScoreboard = () => {
  document.getElementById('wins').innerText = localStorage.getItem('wins') || 0;
  document.getElementById('losses').innerText = localStorage.getItem('losses') || 0;
};

// Update scoreboard on page load
upateScoreboard();

