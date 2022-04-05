import Board from "./Board.js"
import { MARGIN, GRID_SIZE } from "./globals.js";

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
        this.render();
    }

    async render()
    {
        while (true)
        {
            let grid = document.getElementsByClassName('grid')[0]
            //grid.style.setProperty('vertical-align', 'middle')
            grid.style.setProperty('width', GRID_SIZE + 'px')
            grid.style.setProperty('height', GRID_SIZE + 'px')
            grid.style.setProperty('margin', MARGIN + 'px')
            this.board.render();
    
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
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