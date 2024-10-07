// script.js

let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
let calledNumbers = [];
let bingoLettersCount = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function newGame() {
    numbers = shuffle(numbers);
    calledNumbers = [];
    bingoLettersCount = 0;
    document.getElementById('called-numbers').innerHTML = '';
    document.getElementById('bingo-letters').innerHTML = '';
    const card = document.getElementById('bingo-card');
    card.innerHTML = '';
    numbers.forEach((number, index) => {
        const cell = document.createElement('div');
        cell.classList.add('bingo-cell');
        cell.textContent = number;
        cell.addEventListener('click', () => {
            cell.classList.toggle('marked');
            checkForBingo();
        });
        card.appendChild(cell);
    });
}



function checkForBingo() {
    const card = document.getElementById('bingo-card');
    const cells = card.getElementsByClassName('bingo-cell');
    const lines = [
        [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], // Rows
        [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24] // Columns
    ];

    lines.forEach((line, index) => {
        if (line.every(i => cells[i].classList.contains('marked'))) {
            if (!document.getElementById(`line-${index}`)) {
                drawLine(line, index);
                addBingoLetter();
            }
        }
    });
}

function drawLine(line, index) {
    const card = document.getElementById('bingo-card');
    const firstCell = card.children[line[0]];
    const lastCell = card.children[line[line.length - 1]];

    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    lineDiv.id = `line-${index}`;

    if (line[0] % 5 === line[line.length - 1] % 5) { // Vertical
        lineDiv.classList.add('vertical-line');
        lineDiv.style.left = `${firstCell.offsetLeft + firstCell.offsetWidth / 2 - 2.5}px`;
        lineDiv.style.top = `${firstCell.offsetTop}px`;
        lineDiv.style.height = `${firstCell.offsetHeight * 5}px`;
    } else { // Horizontal
        lineDiv.style.top = `${firstCell.offsetTop + firstCell.offsetHeight / 2 - 2.5}px`;
        lineDiv.style.left = `${firstCell.offsetLeft}px`;
        lineDiv.style.width = `${firstCell.offsetWidth * 5}px`;
    }

    card.appendChild(lineDiv);
}

function addBingoLetter() {
    const letters = 'BINGO';
    if (bingoLettersCount < letters.length) {
        document.getElementById('bingo-letters').textContent += letters[bingoLettersCount];
        bingoLettersCount++;

        if (bingoLettersCount === letters.length) {
            setTimeout(() => {
                alert('You win!');
            }, 100);
        }
    }
}

// Initialize the game
newGame();
