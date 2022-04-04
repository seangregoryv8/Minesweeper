import Game from "./Game.js";
import { BOARD_WIDTH, WINDOW_WIDTH, GRID_SIZE } from "./globals.js";
import Square from "./Square.js";
import SquareEdges from "./SquareEdges.js";

export default class Board
{
    /**
     * 
     * @param {Game} game 
     */
    constructor(game)
    {
        this.game = game;
        this.squares = [];
        this.squareEdges = new SquareEdges();
        this.bombAmount = 20;
        this.flags = 0;
    }

    createBoard()
    {
        let shuffledArray = this.shuffleBombArray();
        for (let i = 0; i < BOARD_WIDTH; i++)
        {
            this.squares.push(new Square(i, shuffledArray[i], this));
        }
        
        this.render();
        this.addNumbers();
    }

    render()
    {
        let size = GRID_SIZE / 10 - 4;
        for (let i = 0; i < BOARD_WIDTH; i++)
        {
            let currentSquare = document.getElementById(i.toString())
            currentSquare.style.setProperty('width', size + 'px')
            currentSquare.style.setProperty('height', size + 'px')
            currentSquare.style.setProperty('margin', '2px')
        }
    }
 
    addNumbers()
    {
        for (let i = 0; i < this.squares.length; i++)
        {
            let total = 0;
            this.squareEdges.setValues(i)

            if (this.squares[i].divElement.classList.contains('valid'))
            {
                if (this.squareEdges.checkLeft() && this.squares[this.squareEdges.left.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkTop() && this.squares[this.squareEdges.top.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkRight() && this.squares[this.squareEdges.right.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkBottom() && this.squares[this.squareEdges.bottom.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkTopLeft() && this.squares[this.squareEdges.topLeft.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkTopRight() && this.squares[this.squareEdges.topRight.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkBottomLeft() && this.squares[this.squareEdges.bottomLeft.value].isBomb())
                {
                    total++;
                }
                if (this.squareEdges.checkBottomRight() && this.squares[this.squareEdges.bottomRight.value].isBomb())
                {
                    total++;
                }
            }
            this.squares[i].setTotal(total);
        }
    }

    /**
     * 
     * @param {Square} square
     */
    checkSquare(square)
    {
        let id = parseInt(square.divElement.id);
        this.squareEdges.setValues(id);

        setTimeout(() => 
        {
            let e = this.squareEdges;
            if (e.checkBottom())
            {
                const newSquare = this.squares[e.bottom.value];
                newSquare.click();
            }
            if (e.checkBottomLeft())
            {
                const newSquare = this.squares[e.bottomLeft.value];
                newSquare.click();
            }
            if (e.checkBottomRight())
            {
                const newSquare = this.squares[e.bottomRight.value];
                newSquare.click();
            }
            if (e.checkLeft())
            {
                const newSquare = this.squares[e.left.value];
                newSquare.click();
            }
            if (e.checkRight())
            {
                const newSquare = this.squares[e.right.value];
                newSquare.click();
            }
            if (e.checkTop())
            {
                const newSquare = this.squares[e.top.value];
                newSquare.click();
            }
            if (e.checkTopLeft())
            {
                const newSquare = this.squares[e.topLeft.value];
                newSquare.click();
            }
            if (e.checkTopRight())
            {
                const newSquare = this.squares[e.topRight.value];
                newSquare.click();
            }
        }, 10)
    }

    /**
     * 
     * @param {Square} square 
     * @returns 
     */
    addFlag(square)
    {
        if (this.game.isGameOver) return;

        if (!square.checked && this.flags < this.bombAmount)
        {
            if (!square.flagged)
            {
                square.flag();
                this.flags++;
            }
            else
            {
                square.unflag();
                this.flags--;
            }
        }
    }

    /**
     * 
     * @param {Number} num
     */
    containsBomb = num => this.squares[num].isBomb();

    shuffleBombArray()
    {
        let bombsArray = Array(this.bombAmount).fill('bomb');
        let emptyArray = Array(BOARD_WIDTH - this.bombAmount).fill('valid');
        let gameArray = emptyArray.concat(bombsArray);
        return gameArray.sort(() => Math.random() - 0.5)
    }
}