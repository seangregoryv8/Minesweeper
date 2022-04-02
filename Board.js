import Game from "./Game.js";
import { BOARD_WIDTH } from "./globals.js";
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
        this.addNumbers();
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
            const newSquare = this.squareEdges.createNewSquare(this.squares);
            newSquare.click();
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