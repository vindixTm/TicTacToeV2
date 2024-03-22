const reset = document.querySelector('.restart ');
const body = document.querySelector('body');

// object containing the gameboard and functions to crate the visual gameboad
const gameBoard = (() => {
  const m = 3; // rows
  const  n = 3; // columns
   const arr = new Array(m); // create an empty array of length n
  for (let i = 0; i < m; i++) {
    arr[i] = new Array(n); // make each element an array
  }
  // object containing playersrs and thier score and a function to increase thier score value
  function players(){
    let score = 0;
    const increaseScore = () => score += 1;
    const getScore = () => score;
    const resetScore = () => score *= 0;
    return{increaseScore,getScore,resetScore}}

    const playerX = players();
    const playerO = players();

  // function to check for winner or draw
  function checkWinner(grid){
    // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return grid[i][0]; // Winning row
     
    }
    if (grid[0][i] !== '' && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
      return grid[0][i]; // Winning column
      
    }
  }

  // Check diagonals
  if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return grid[0][0]; // Winning diagonal (top-left to bottom-right)
  }
  if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return grid[0][2]; // Winning diagonal (top-right to bottom-left)
  }

  return null; // No winner yet
  }

  function displayResults(result){
    const player1 = document.querySelector(".player_1")// player X
    const player2 = document.querySelector(".player_2")//player O
    if (result === 0) {
      playerO.increaseScore();
      let PlayerTwoScore = playerO.getScore();
      player2.textContent = PlayerTwoScore;
    }else if (result === 1) {
      playerX.increaseScore();
      let PlayerOneScore = playerX.getScore();
      player1.textContent = PlayerOneScore;
    };
    
  }

// Function to create the grid in HTML
 function createGrid() {
  const gridContainer = document.querySelector('.board');
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('cell');
      gridItem.addEventListener('click', () => {
        if (gridItem.innerHTML === "") {handleGridItemClick(i,j,count);
          count++;
          if (checkWinner(arr) === 0 || checkWinner(arr) === 1) {
            winnerDisplayer()
            count = 0;
          }
          console.log(count);}
        });
      gridContainer.appendChild(gridItem);  
    }
  }
}
 // Function to handle the click event on a grid item
 function handleGridItemClick(row, col,numb) {
  let count = numb;
  const gridItem = document.querySelector(`.cell:nth-child(${row * n + col + 1})`);
  // Toggle x or o and update values in array
  if (count % 2 === 0 ){
    
    const eclipse = document.createElement('img');
    eclipse.src = './img/big_O_icon.svg';
    eclipse.className = 'symbols eclipse';
    arr[row][col] = 0
    gridItem.appendChild(eclipse);
  }else if (count % 2 !== 0 ) {
    const cross = document.createElement('img');
    cross.src = ' ./img/big_X_icon.svg';
    cross.className = 'symbols cross';
    arr[row][col] = 1
    gridItem.appendChild(cross);
  }
  if (count >= 4) {
    displayResults(checkWinner(arr))
  } 
}

// FUNCTION TO CLEAR BOARD AND PLAYER SCORES TO END  MATCH *****************************************************************************************
function resetboard(){
  const divElements = document.querySelectorAll('.cell');
  const player1 = document.querySelector(".player_1")// player X
  const player2 = document.querySelector(".player_2")//player O
for (let index = 0; index < divElements.length; index++) {
    if (divElements[index].innerHTML !== "") {
        divElements[index].removeChild(divElements[index].firstChild)
        playerO.resetScore()
        playerX.resetScore()
        player2.textContent = 0;
        player1.textContent = 0;
    }}
    for (let i = 0; i < m; i++) {
      arr[i] = new Array(n); // make each element an array
    }
    console.log({playerO: playerO.getScore()})
    console.log({playerX: playerX.getScore()})
    console.log(arr)
}
// FUNCTION TO PLAY ANOTHER ROUND***********************************************************************************
function nextRound(){
  const divElements = document.querySelectorAll('.cell');
  for (let index = 0; index < divElements.length; index++) {
      if (divElements[index].innerHTML !== "") {
          divElements[index].removeChild(divElements[index].firstChild)
      }}
      for (let i = 0; i < m; i++) {
        arr[i] = new Array(n); // make each element an array
      }
      console.log({playerO: playerO.getScore()})
      console.log({playerX: playerX.getScore()})
      console.log(arr)
}
// WINNER DISPLAY SECTION ******************************************************************************************
function winnerDisplayer(){
  const whoWon = checkWinner(arr)
  // blur the background 
  const bgBlur = document.createElement('div');
  bgBlur.className ="background_blur";
  // conratulation div
  const omedetou = document.createElement('div');
  omedetou.className = "omedetou";
  const congrats  = document.createElement('div');
  congrats.className = "omedetou_text";
  congrats.textContent = "OMEDETOU !!";
  const winnertxt = document.createElement('div');
  winnertxt.className = "winner_text";
  const winnerimg = document.createElement("img")
  if (whoWon === 0) {
    winnerimg.src = "./img/normal_O_icon.svg"; 
  }else{
    winnerimg.src = "./img/normal_X_icon.svg";
  }
  const wontheround = document.createElement('div');
  wontheround.textContent = "WINS THIS ROUND";
  // next round or exit  buttons sections
  const nr_ebuttons = document.createElement('div');
  nr_ebuttons.className ="buttons";
  const endmatch  = document.createElement('div');
  endmatch.textContent = "END MATCH";
  endmatch.className = "btn end_match";
  const nextround = document.createElement('div');
  nextround.textContent = "NEXT ROUND"
  nextround.className = "btn next_round";
  
  winnertxt.appendChild(winnerimg);
  winnertxt.appendChild(wontheround);
  nr_ebuttons.appendChild(endmatch);
  nr_ebuttons.appendChild(nextround);
 
  omedetou.appendChild(congrats)
  omedetou.appendChild(winnertxt)
  omedetou.appendChild(nr_ebuttons)
  bgBlur.appendChild(omedetou)
  body.appendChild(bgBlur)

  const endmatchBtn = document.querySelector('.end_match')
  const nextroundBtn = document.querySelector('.next_round')
  endmatchBtn.addEventListener('click', () => {
    gameBoard.resetboard()
    body.removeChild(bgBlur)
    });
  
   nextroundBtn.addEventListener('click', () => {
    gameBoard.nextRound()
    body.removeChild(bgBlur)
    });
  
}

  return {createGrid, resetboard, nextRound};
})();


// RESET THE BOARD IF RESET IS CLICKED******************************************************************************

document.addEventListener('DOMContentLoaded', gameBoard.createGrid);


reset.addEventListener('click', () => {
  gameBoard.resetboard()
  });

// const endmatchBtn = document.querySelector('.end_match')
// const nextroundBtn = document.querySelector('.next_round')
// endmatchBtn.addEventListener('click', () => {
//   gameBoard.resetboard()
//   });

//  nextroundBtn.addEventListener('click', () => {
//   gameBoard.nextRound()
//   });

  

