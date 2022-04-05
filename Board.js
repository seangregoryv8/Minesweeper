import Game from "./Game.js";
import { BOARD_WIDTH, GRID_SIZE, click } from "./globals.js";
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
        this.bombAmount = 1;
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

            if (this.squares[i].isValid())
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
            this.squares[i].total = total;
        }
    }



    /**
     * 
     * @param {Square} square
     */
    async checkSquare(square)
    {
        //https://alvarotrigo.com/blog/wait-1-second-javascript/#:~:text=To%20force%20a%201%20second%20pause%20or%20delay,some%20should%20only%20be%20used%20in%20specific%20circumstances.
        let id = parseInt(square.divElement.id);
        this.squareEdges.setValues(id);

        setTimeout(() => 
        {
            let e = this.squareEdges;
            if (e.checkBottom())
            {
                console.log(this.squares[e.bottom.value].id);
                await delay(1000);
                click(this.squares[e.bottom.value]);
            }
            if (e.checkBottomLeft())
            {
                console.log(this.squares[e.bottomLeft.value].id)
                await delay(1000);
                click(this.squares[e.bottomLeft.value]);
            }
            if (e.checkBottomRight())
            {
                console.log(this.squares[e.bottomRight.value].id)
                await delay(1000);
                click(this.squares[e.bottomRight.value]);
            }
            if (e.checkLeft())
            {
                console.log(this.squares[e.left.value].id)
                await delay(1000);
                click(this.squares[e.left.value]);
            }
            if (e.checkRight())
            {
                console.log(this.squares[e.right.value].id)
                await delay(1000);
                click(this.squares[e.right.value]);
            }
            if (e.checkTop())
            {
                console.log(this.squares[e.top.value].id)
                await delay(1000);
                click(this.squares[e.top.value]);
            }
            if (e.checkTopLeft())
            {
                console.log(this.squares[e.topLeft.value].id)
                await delay(1000);
                click(this.squares[e.topLeft.value]);
            }
            if (e.checkTopRight())
            {
                console.log(this.squares[e.topRight.value].id)
                await delay(1000);
                click(this.squares[e.topRight.value]);
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

    shuffleBombArray()
    {
        let bombsArray = Array(this.bombAmount).fill('bomb');
        let emptyArray = Array(BOARD_WIDTH - this.bombAmount).fill('valid');
        let gameArray = emptyArray.concat(bombsArray);
        return gameArray.sort(() => Math.random() - 0.5)
    }
}