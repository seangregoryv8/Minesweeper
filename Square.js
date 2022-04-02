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
        this.divElement = null;

        this.id = id;
        this.class = isBomb;
        this.board = board;
        this.total = 0;
        
        this.checked = false;
        this.flagged = false;

        this.createSquare();
    }

    check()
    {
        this.checked = true;
        this.divElement.classList.add('checked');
        this.divElement.style.backgroundColor = '#000000';
        //this.divElement.style.border = '1px solid #7b7b7b'
        //this.divElement.style.height = '39px';
        //this.divElement.style.width = '39px';
    }

    flag()
    {
        if (!this.checked)
        {
            this.flagged = true;
            this.divElement.classList.add('flag');
            this.divElement.innerHTML = '🚩';
        }
    }

    unflag()
    {
        this.flagged = false;
        this.divElement.classList.remove('flag');
        this.divElement.innerHTML = '';
    }

    setTotal(total)
    {
        this.total = total;
        this.divElement.setAttribute('data', total);
    }

    createSquare()
    {
        this.divElement = document.createElement('div');
        this.divElement.setAttribute('id', this.id);
        this.divElement.classList.add(this.class);
        this.total = parseInt(this.divElement.getAttribute('data'));
        GRID.appendChild(this.divElement);

        this.addEvents();
    }

    addEvents()
    {
        this.divElement.addEventListener('click', () => 
        {
            this.click();
        })

        let s = this;

        this.divElement.oncontextmenu = function(e) 
        {
            e.preventDefault();
            if (s.flagged) s.unflag();
            else s.flag();
            s.board.game.checkForWin();
        }
    }

    isBomb() { return this.class == 'bomb'; }

    /**
     * 
     * @param {Square} square
     */
    click(square = this)
    {
        this.currentId = square.id;
        if (square.board.game.isGameOver) return;
        if (square.checked || square.flagged) return
        if (this.isBomb())
        {
            this.board.game.gameOver();
        }
        else
        {
            if (this.total != 0)
            {
                square.check();
                square.divElement.innerHTML = this.total.toString();
                return;
            }
            this.board.checkSquare(this);
        }
        square.check();
    }
}