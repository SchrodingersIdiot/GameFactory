//When player X places a mark in local board (i, j) at cell (a, b), the next move must be in board (a, b)...

//const bigFart = Array(3).fill().map(() => Array(3).fill(0));
const boardWidth = 3
const boardLength = 3
firstTurn = true 
moveList = []
cellList = []
indexCellBig = null
let playerOne = "X"
let playerTwo = "O"
let playerOneColor = "red"
let playerTwoColor = "blue"

class move {
  constructor(board, cell) {
    this.move = [board, cell]
    this.mover = null

  }
}
class smallBoard {
    constructor() {
    this.board = Array(3).fill().map(() => Array(3).fill())
    this.winner = null
    this.priorBoard = null
    }
}
let game = {
    bigAhBoard: [[],[],[]]
}
for (let i = 0; i < boardLength; i++) {
  for(let p = 0; p < boardWidth; p++) {
    console.log("super fart")
    game.bigAhBoard[i].push(new smallBoard)
  }
}

function boardFinder(row, col, lilRow, lilCol, Z) {
  let holder = game.bigAhBoard[row][col].board
  holder[lilRow][lilCol] == Z
}

//function makeAMove(row, col, lilRow, lilCol) {
  
//}
const wholeBoard = document.getElementById("board")
for (let j = 0; j < 9; j++) {
  const subBoard = document.createElement("div")
  subBoard.classList.add("subBoard")
  subBoard.dataset.subIndex = j
  subBoard.addEventListener("click", handleBoard)
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i
    cell.addEventListener("click", handleCell)
    subBoard.appendChild(cell)
 
  }
  wholeBoard.appendChild(subBoard)
const resetButton = document.getElementById("resetButton")
resetButton.addEventListener("click", handleReset)
const heartButton = document.getElementById("heartButton")
heartButton.addEventListener("click", handleHeart)
}
function handleBoard(event) {
  console.log(playerTwo, playerTwoColor)
  if (firstTurn){
    Z = playerOne
    farto = playerOneColor
  } else{
    Z = playerTwo
    farto = playerTwoColor
  }
  const indexBoard = event.currentTarget.dataset.subIndex
  console.log("You clicked Board:", indexBoard)
  const b =indexBoard
  const c = indexCellBig
  let fart = new move(b,c)
  moveList.push(fart.move)
  if (cellList.includes(event.target)) {
    console.log("fuck you")
  } else if (isLegal(moveList.at(-1)) && event.target.className !== "subBoard") {
    const celly = event.target
    console.log(celly)
    console.log(event.target.dataset.class)
    celly.textContent = Z
    celly.style.color = farto
    const garp = converter(b,c)
    console.log(garp, 3)
    game.bigAhBoard[garp[0]][garp[1]].board[garp[2]][garp[3]] = Z
    cellList.push(event.target)
    firstTurn = !firstTurn
    if (checkWinner()){
      const boardy = event.currentTarget
      game.bigAhBoard[garp[0]][garp[1]].winner = Z
      const subBoard = document.querySelector(`.subBoard[data-sub-index="${b}"]`)
      const overlay = document.createElement("div")
      overlay.classList.add("overlay", "heart-overlay")
      overlay.textContent = Z
      overlay.style.color = farto
      subBoard.appendChild(overlay); 

      if (checkTrueWinner()){
        overlay.classList.remove("heart-overlay")
        overlay.classList.add("super-overlay")
        const bigCell = document.querySelectorAll(".cell")
        const bigBoard = document.querySelector(".board")
        bigBoard.appendChild(overlay)
        
      }
      console.log("I'm splooging")
       
    }
    if (game.bigAhBoard[garp[2]][garp[3]].winner !== null){
        moveList = []
      }
  } else if (event.target.className !== "subBoard") {
    moveList.pop()
  }
  
  
}
function handleCell(event) {
  const indexCell = event.target.dataset.index
  console.log("You clicked cell:", indexCell)
  indexCellBig = indexCell
  
}
function getMove(indexBoard, indexCell) {
  const b = indexBoard
  const c = indexCell
  
}
function handleHeart() {
  playerTwo = "❤"
  playerTwoColor = "pink"
  handleReset()
}
function handleReset() {
  rowCheck = []
  colCheck = []
  document.querySelectorAll(".overlay").forEach(overlay => overlay.remove());
  for (let i = 0; i < 3*boardLength; i++) {
    for(let p = 0; p < 3*boardWidth; p++) {
      luke = converter(i,p)
      game.bigAhBoard[luke[0]][luke[1]].winner = null
      game.bigAhBoard[luke[0]][luke[1]].board[luke[2]][luke[3]] = undefined
      console.log("super fart")
      moveList = []
      cellList = []
      console.log(game.bigAhBoard)
      firstTurn = true
    }
  }
  const sBoard =document.querySelectorAll(".subBoard")
  sBoard.forEach(subBoard =>
    subBoard.style.backgroundColor = "black"
  )
  const Cell = document.querySelectorAll(".cell")
  Cell.forEach(cell => {
    cell.style.backgroundColor = "white"
    cell.textContent = ""
  })
}

function isLegal(move) {
  poop = converter(move[0], move[1])
  console.log(poop[0], poop[1])
  console.log(game.bigAhBoard[poop[0]][poop[1]].winner)
  if (moveList.length === 1) {
    console.log("AHHHHHHHHHHH")
    return true 
  }
  else if (moveList.at(-2)[1] === move[0] && game.bigAhBoard[poop[0]][poop[1]].winner === null) {
    console.log("BAHHHHHHHHHHH")
    return true
  } else {
    console.log(moveList.at(-2)[0])
    console.log(move[1])
    console.log("CAHHHHHHHHHHH")
    return false
  }
}
function checkWinner(){
  const check = moveList.at(-1)
  console.log(check)
  const RAH = converter(check[0], check[1])
  console.log(RAH)
  const rowCheck = []
  const colCheck = []
  const checkBoard = game.bigAhBoard[RAH[0]][RAH[1]].board
  console.log(checkBoard)
  for (i = 0; i < boardLength; i++){
    for (q = 0; q < boardWidth; q++){
      rowCheck.push(checkBoard[i][q])
      colCheck.push(checkBoard[q][i])
    }
    r = 3*i
    if ((rowCheck[r] === rowCheck[r+1] && rowCheck[r] === rowCheck[r+2] && rowCheck[r] !== undefined ) || (colCheck[r]===colCheck[r+ 1] && colCheck[r] === colCheck[r+2] && colCheck[r] !== undefined)){
      console.log("me PROBLEM")
      console.log(rowCheck)

      return true
    }
    else if (checkBoard[1][1] !== undefined){
      if (checkBoard[0][0] === checkBoard[1][1]){
        if (checkBoard[2][2] === checkBoard[1][1]){
          console.log("HE PROBLEM")

          return true
        }
      } else if (checkBoard[0][2] === checkBoard[1][1]){
        if (checkBoard[2][0]=== checkBoard[1][1]){
          return true
        }
      }

    }
  }
  return false
}
  
function converter(index, fartdex){
  plop = Math.floor(index/3) 
  slop = index % 3
  gorp = Math.floor(fartdex/3)
  porp = fartdex % 3
  return [plop, slop, gorp, porp]
}

function checkTrueWinner(){
  const check = moveList.at(-1)
  
  RAH = converter(check[2], check[3])
  
  bigRowCheck = []
  bigColCheck = []
  checkBoard = game.bigAhBoard
  for (i = 0; i < boardLength; i++){
    for (q = 0; q < boardWidth; q++){
      bigRowCheck.push(checkBoard[i][q].winner)
      bigColCheck.push(checkBoard[q][i].winner)
      console.log(bigRowCheck)
    }
    r = 3*i
    if ((bigRowCheck[r] === bigRowCheck[r+1] && bigRowCheck[r] === bigRowCheck[r+2] && bigRowCheck[r] !== null ) || (bigColCheck[r]===bigColCheck[r+ 1] && bigColCheck[r] === bigColCheck[r+2] && bigColCheck[r] !== null)){

      return true
    }
    else if (checkBoard[1][1].winner !== null){
      if (checkBoard[0][0].winner === checkBoard[1][1].winner){
        if (checkBoard[2][2].winner === checkBoard[1][1].winner){
          return true
        }
      } else if (checkBoard[0][2].winner === checkBoard[1][1].winner){
        if (checkBoard[2][0].winner === checkBoard[1][1].winner){
          return true
        }
      }

    }
  }
  return false
}
console.log(moveList)

console.log(game.bigAhBoard[1][1].board)
console.log(smallBoard.winner)
console.log(boardFinder(1,1,1,1))
console.log(game.bigAhBoard[1])
console.log(moveList)