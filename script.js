// Navigation

function showGame(id){

    let sections = document.querySelectorAll(".section");

    sections.forEach(section=>{
        section.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


// =======================
// TIC TAC TOE
// =======================

let currentPlayer = "X";

let board = ["","","","","","","","",""];

let gameOver = false;

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function play(index){

    const cells = document.querySelectorAll(".cell");

    if(board[index] !== "" || gameOver)
        return;

    board[index] = currentPlayer;

    cells[index].innerHTML = currentPlayer;

    if(checkWinner(currentPlayer)){

        document.getElementById("status").innerHTML =
        currentPlayer + " Wins!";

        gameOver = true;
        return;
    }

    if(board.every(cell => cell !== "")){

        document.getElementById("status").innerHTML =
        "Draw!";

        gameOver = true;
        return;
    }

    const mode = document.getElementById("mode").value;

    if(mode === "friend"){

        currentPlayer =
        currentPlayer === "X" ? "O" : "X";

        document.getElementById("status").innerHTML =
        "Player " + currentPlayer + " Turn";
    }

    else{

        if(currentPlayer === "X"){

            currentPlayer = "O";

            setTimeout(aiMove,500);
        }
    }
}


function aiMove(){

    for(let i=0;i<9;i++){
        if(board[i] === ""){
            board[i] = "O";

            if(checkWinner("O")){
                board[i] = "";
                makeMove(i);
                return;
            }

            board[i] = "";
        }
    }

    for(let i=0;i<9;i++){
        if(board[i] === ""){
            board[i] = "X";

            if(checkWinner("X")){
                board[i] = "";
                makeMove(i);
                return;
            }

            board[i] = "";
        }
    }

    if(board[4] === ""){
        makeMove(4);
        return;
    }

    let corners = [0,2,6,8];

    for(let corner of corners){
        if(board[corner] === ""){
            makeMove(corner);
            return;
        }
    }

    let empty = [];

    for(let i=0;i<9;i++){
        if(board[i] === "")
            empty.push(i);
    }

    if(empty.length > 0){
        let move = empty[Math.floor(Math.random()*empty.length)];
        makeMove(move);
    }
}
function makeMove(move){

    board[move] = "O";

    document.querySelectorAll(".cell")[move].innerHTML = "O";

    if(checkWinner("O")){

        document.getElementById("status").innerHTML =
        "AI Wins!";

        gameOver = true;
        return;
    }

    if(board.every(cell => cell !== "")){

        document.getElementById("status").innerHTML =
        "Draw!";

        gameOver = true;
        return;
    }

    currentPlayer = "X";

    document.getElementById("status").innerHTML =
    "Player X Turn";
}

function checkWinner(player){

    return wins.some(pattern =>
        pattern.every(index =>
            board[index] === player
        )
    );
}


function restartGame(){

    board =
    ["","","","","","","","",""];

    currentPlayer = "X";

    gameOver = false;

    document.querySelectorAll(".cell")
    .forEach(cell=>{
        cell.innerHTML = "";
    });

    document.getElementById("status").innerHTML =
    "Player X Turn";
}
// =======================
// SUDOKU
// =======================
const sudokuData = {
easy: {
    puzzle: [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ],
    solution: [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
    ]
}
};
function loadSudoku(){

    let level = document.getElementById("difficulty").value;
    let board = document.getElementById("sudokuBoard");
    board.innerHTML = "";

    let puzzle = sudokuData[level].puzzle;

    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){

            let input = document.createElement("input");
            input.className = "sudoku-cell";
            input.maxLength = 1;

            if(puzzle[r][c] !== 0){
                input.value = puzzle[r][c];
                input.disabled = true;
            }

            input.dataset.row = r;
            input.dataset.col = c;

            input.addEventListener("input", validateCell);

            board.appendChild(input);
        }
    }

    startTimer();
}
function validateCell(e){

    let input = e.target;
    let r = input.dataset.row;
    let c = input.dataset.col;

    let level = document.getElementById("difficulty").value;
    let correct = sudokuData[level].solution[r][c];

    if(parseInt(input.value) === correct){
        input.style.background = "lightgreen";
    }else{
        input.style.background = "salmon";
    }
}

function checkSudoku(){

    let inputs = document.querySelectorAll(".sudoku-cell");
    let level = document.getElementById("difficulty").value;

    let solution = sudokuData[level].solution;

    let i = 0;
    let correct = true;

    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){

            if(parseInt(inputs[i].value) !== solution[r][c]){
                correct = false;
            }
            i++;
        }
    }

    alert(correct ? "🎉 You Won!" : "❌ Try Again!");
}

function giveHint(){

    let inputs = document.querySelectorAll(".sudoku-cell");
    let level = document.getElementById("difficulty").value;

    let solution = sudokuData[level].solution;

    let empty = [];

    inputs.forEach((inp,i)=>{
        if(inp.value === ""){
            empty.push(i);
        }
    });

    if(empty.length === 0) return;

    let rand = empty[Math.floor(Math.random()*empty.length)];

    let r = Math.floor(rand/9);
    let c = rand%9;

    inputs[rand].value = solution[r][c];
    inputs[rand].style.background = "lightblue";
}
let time = 0;
let timer;

function startTimer(){

    clearInterval(timer);
    time = 0;

    timer = setInterval(()=>{
        time++;
        document.getElementById("timer").innerHTML =
        "Time: " + time + "s";
    },1000);
}

// =======================
// MEMORY GAME
// =======================

const emojis = [
"🍎","🍎",
"⭐","⭐",
"🎲","🎲",
"🚀","🚀",
"🎧","🎧",
"⚽","⚽",
"🎮","🎮",
"🔥","🔥"
];

let shuffled = [...emojis].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function flipCard(card){

    if(lockBoard) return;

    if(card.innerHTML !== "")
        return;

    let cards =
    document.querySelectorAll(".memory-card");

    let index =
    Array.from(cards).indexOf(card);

    card.innerHTML = shuffled[index];

    if(!firstCard){

        firstCard = card;
        return;
    }

    secondCard = card;

    moves++;

    document.getElementById("memoryStatus")
    .innerHTML = "Moves: " + moves;

    if(firstCard.innerHTML === secondCard.innerHTML){

        firstCard = null;
        secondCard = null;
    }
    else{

        lockBoard = true;

        setTimeout(()=>{

            firstCard.innerHTML = "";
            secondCard.innerHTML = "";

            firstCard = null;
            secondCard = null;

            lockBoard = false;

        },1000);
    }
}
let matched =
document.querySelectorAll(".memory-card");

let completed = [...matched]
.every(card => card.innerHTML !== "");

if(completed){
    setTimeout(() => {
        alert("🎉 Congratulations! You matched all pairs!");
    }, 300);
}
function resetMemoryGame(){

   shuffled = [...emojis].sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;

    document.getElementById("memoryStatus").innerHTML =
    "Moves: 0";

    document.querySelectorAll(".memory-card")
    .forEach(card => {
        card.innerHTML = "";
    });
}
