let clicks = 0;
let curPLayer = 0;
let xMoves = "";
let oMoves = "";
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => tile.addEventListener('click', mark));

function mark () {

    if (clicks < 10) {

        if (clicks == 1) {
            curPLayer = 1;
        } else if (clicks % 2 == 0) {
            curPLayer = 0;
        } else {
            curPLayer = 1;
        }

        if (curPLayer == 0) {
            xMoves += `${this.classList[1]} `;
        } else {
            oMoves += `${this.classList[1]} `;
        }

        const player = this.children[curPLayer];
        player.classList.add('active');
        this.removeEventListener('click', mark);
        clicks ++;
        return findWinner(xMoves, oMoves, clicks);
    }
}

const findWinner = (xPlayerInputs, oPlayerInputs, clicks) => {

    const wins = {
        0: "tile1 tile2 tile3",
        1: "tile4 tile5 tile6",
        2: "tile7 tile8 tile9",
        3: "tile1 tile5 tile9",
        4: "tile1 tile4 tile7",
        5: "tile3 tile5 tile7",
        6: "tile2 tile5 tile8",
        7: "tile3 tile6 tile9",
    };

    for (idx in wins) {
        let possibleWin = wins[idx].split(' ');
        if ( xPlayerInputs.includes(possibleWin[0]) & xPlayerInputs.includes(possibleWin[1]) & xPlayerInputs.includes(possibleWin[2]) ) {
            document.querySelector('#title').innerText = 'X Won';
            tiles.forEach(tile => tile.removeEventListener('click', mark));
        } else if ( oPlayerInputs.includes(possibleWin[0]) & oPlayerInputs.includes(possibleWin[1]) & oPlayerInputs.includes(possibleWin[2]) ) {
            document.querySelector('#title').innerText = 'O Won';
            tiles.forEach(tile => tile.removeEventListener('click', mark));
        }
    }
}

const newRound = () => {
    clicks = 0;
    xMoves = "";
    oMoves = "";
    curPLayer = 0;
    document.querySelector('#title').innerText = 'Tic Tac Toe';
    tiles.forEach(tile => {
        let xIcon = tile.children[0];
        let oIcon = tile.children[1];
        xIcon.classList.remove('active');
        oIcon.classList.remove('active');
    })
    tiles.forEach(tile => tile.addEventListener('click', mark))
}

const restart = document.querySelector('button');
restart.addEventListener('click', newRound);