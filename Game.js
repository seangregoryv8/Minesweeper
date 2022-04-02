import Board from "./Board.js"

export default class Game
{
    constructor()
    {
        this.isGameOver = false;
        this.board = new Board(this);
    }

    start()
    {
        this.board.createBoard();
    }

    checkForWin()
    {
        let matches = 0;

        this.board.squares.forEach(square =>
        {
            if (square.flagged && square.isBomb()) matches++;
        });
        if (matches == this.board.bombAmount)
        {
            console.log('YOU WIN');
            this.isGameOver = true;
        }
    }

    gameOver()
    {
        console.log("BOOM! Game Over!");
        this.isGameOver = true;
        this.board.squares.forEach(square => 
        {
            if (square.isBomb())
                square.divElement.innerHTML = '💣';
        })
    }
}