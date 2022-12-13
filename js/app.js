class Game {
    constructor() {
        // Grab the restart button
        this.gameRestartBtn = document.getElementById('gameRestart');
        this.gameStatus = document.getElementById('gameStatus');
        this.xWins = document.getElementById('xWins');
        this.oWins = document.getElementById('oWins');
        this.submitBtn = document.getElementById('submitBtn');
        this.playerOne = document.getElementById('playerOne');
        this.playerTwo = document.getElementById('playerTwo');

        // Winning count object
        this.winCount = {
            x: 0,
            o: 0
        }
        // Game active
        this.gameActive = true;
        this.currentPlayer = 'X';
        // Empty array to store the game state
        this.gameState = ['', '', '', '', '', '', '', '', ''];

        // Winning conditions
        this.winningConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        // Players object
        this.players = {
            player1: 'Player 1',
            player2: 'Player 2'
        }

    }

    // Method to initialize the game
    init (){
        this.playerOne.innerText = this.players.player1;
        this.playerTwo.innerText = this.players.player2;
        this.getPlayersNames();
        this.handleCellClicked();
        this.gameRestartBtn.addEventListener('click', ()=>  {
        this.restartGame();
        })
    
    }

    // Method to handle the game state
    currPlayerTurn() {
        const message = `It's ${this.currentPlayer}'s turn'`
        return this.gameStatus.innerText = message;
    }

    drawMessage() {
        const message = `It's a draw!`;
        return this.gameStatus.innerText = message;
    }

    winningMessage() {
        const message = `${this.currentPlayer} has won!`;
        return this.gameStatus.innerText = message;
    }

    // Handle the cell clicked
    handleCellClicked() {
        // grab cell clicked
        const cell = document.querySelectorAll('.cell');
        // loop through the cell
        cell.forEach((cell) => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'));
            // add event listener to each cell
            cell.addEventListener('click', () => {
                // console.log(cellIdx);
                // if the game is active and the cell is empty
                if(this.gameState[cellIdx] != '' || !this.gameActive) {
                    return;
                }

                this.handleCellPlayed(cell, cellIdx);
                this.resultValidation();

            })
        })
    }

    handleCellPlayed(cell, cellIdx) {
        this.gameState[cellIdx] = this.currentPlayer;
        // console.log(this.gameState);
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue');
        cell.innerText = this.currentPlayer;
    }

    resultValidation() {
        let gameWon = false;
        for(let i = 0; i <= 7; i++) {
            // console.log(this.winningConditions[i]);
            const win = this.winningConditions[i];
            let a = this.gameState[win[0]];
            let b = this.gameState[win[1]];
            let c = this.gameState[win[2]];
            // console.log(a, b, c);
            if(a === '' || b === '' || c === '') {
                continue;
            }
            if(a === b && b === c) {
                gameWon = true;
                break;
            }
        }

        if(gameWon) {
            // console.log('Game Won');
            const tallyMark = 'x'; 
            this.winningMessage();
            const winner = this.currentPlayer;
            // console.log(winner);
            if (winner == 'X') {
                this.winCount.x++;
                this.xWins.innerText = this.winCount.x;
            } else {
                this.winCount.o++;
                this.oWins.innerText = this.winCount.o;
            }

            this.checkWinCount()
            this.gameActive = false;
            return;
        }

        let roundDraw = !this.gameState.includes('');
        if(roundDraw) {
            this.drawMessage();
            this.gameActive = false;
            return;
        }

        this.playerChange();
    }

    // Method to handle the current player
    playerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        console.log(this.currentPlayer)
        this.currPlayerTurn();
    }

    // Method to handle the restart button
    restartGame() {
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.currPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = ''
            cell.classList.remove('blue');
            
        })

    }
    // Limit the game to 3 wins
    checkWinCount() {
        let oWinTotal = this.winCount.o;
        let xWinTotal = this.winCount.x;

        console.log(this.winCount);
        if (oWinTotal == 3) {
            // alert('X has won the game') 
            this.gameStatus.innerText = `${this.players.player2}'has won the game';`

        } else if (xWinTotal == 3) {
            // alert('O has won the game')
            this.gameStatus.innerText = `${this.players.player1}'has won the game';`
        }
        
        this.gameActive = false;
        // this.restartGame();

    }

    getPlayersNames() {
        const submitBtn= this.submitBtn;
        const playerOne = this.playerOne;
        const playerTwo = this.playerTwo;

        
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log('clicked')
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;
            // console.log(player1Name, player2Name);
            this.players.player1 = player1Name;
            this.players.player2 = player2Name;
            playerOne.innerText = `${this.players.player1}: X's turn`;
            playerTwo.innerText = `${this.players.player2}: O's turn`;
        })

    }
    
}


const action = new Game();
action.init();