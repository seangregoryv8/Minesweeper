import Board from "./Board.js";
import { GRID } from "./globals.js";

export default class Square
{
    /**
     * 
     * @param {*} id 
     * @param {*} isBomb 
     * @param {Board} board 
     */
    constructor(id, isBomb, board)
    {
        this.id = id;
        this.currentId = null;
        this.isBomb = isBomb;
        this.board = board;
        this.total = 0;
    }

    createSquare()
    {
        const squ = document.createElement('div');
        squ.setAttribute('id', this.id);
        squ.classList.add(this.isBomb);
        GRID.appendChild(squ);

        squ.addEventListener('click', () => 
        {
            this.click(squ);
        })
        return squ;
    }

    checkIfBomb()
    {
        console.log(this.isBomb == 'bomb')
        return this.isBomb == 'bomb';
    }

    /**
     * 
     * @param {HTMLDivElement} square
     */
    click(square)
    {
        this.currentId = square.id;
        if (this.board.game.isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (this.checkIfBomb())
        {
            console.log('Game Over');
        }
        else
        {
            this.total = parseInt(square.getAttribute('data'));
            if (this.total != 0)
            {
                square.classList.add('checked')
                square.innerHTML = this.total.toString();
                return;
            }
            this.board.checkSquare(square, this.currentId);
        }
        square.classList.add('checked')
    }
}