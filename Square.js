import Board from "./Board.js";
import { GRID, WINDOW_WIDTH, click } from "./globals.js";

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
        this.divElement.style.backgroundColor = '#000000';
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

    createSquare()
    {
        this.divElement = document.createElement('div');
        this.divElement.setAttribute('id', this.id);
        let size = WINDOW_WIDTH / 10;
        this.divElement.style.setProperty('width', size);
        this.divElement.style.setProperty('height', size);
        //border: 2px solid #9c998d;
        GRID.appendChild(this.divElement);

        this.addEvents();
    }

    addEvents()
    {
        this.divElement.addEventListener('click', () => 
        {
            click(this);
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
    isValid() { return this.class == 'valid'; }

}