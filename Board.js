import Game from "./Game.js";
import { GRID } from "./globals.js";
import Square from "./Square.js";


export default class Board
{
    /**
     * 
     * @param {Game} game 
     */
    constructor(game)
    {
        this.game = game;
        this.tileWidth = 10;
        this.boardWidth = this.tileWidth * this.tileWidth
        this.squares = [];
        this.bombAmount = 20;
        this.shuffledArray = this.shuffleBombArray();
        this.edges = 
        {
            left: false,
            right: false
        };
    }

    createBoard()
    {
        for (let i = 0; i < this.boardWidth; i++)
        {
            let newSquare = new Square(i, this.shuffledArray[i], this);
            this.squares.push(newSquare.createSquare());
        }
        this.addNumbers();
    }

    calculateEdges(i)
    {
        this.edges.left = i % this.tileWidth === 0;
        this.edges.right = i % this.tileWidth === this.tileWidth - 1;
    }
 
    addNumbers()
    {
        for (let i = 0; i < this.squares.length; i++)
        {
            let total = 0;
            this.calculateEdges(i);

            if (this.squares[i].classList.contains('valid'))
            {
                if (this.checkLeft(i)) total++;
                if (this.checkBottomLeft(i)) total++;
                if (this.checkBottom(i)) total++;
                if (this.checkBottomRight(i)) total++;
                if (this.checkRight(i)) total++;
                if (this.checkTopRight(i)) total++;
                if (this.checkTopLeft(i)) total++;
                if (this.checkTop(i)) total++;
            }
            this.squares[i].setAttribute('data', total);
        }
    }

    checkSquare(square, currentId)
    {
        this.calculateEdges(currentId);

        setTimeout(() => 
        {
            if (currentId > 0 && !this.edges.left)
            {
                const newId = this.squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                //click(newSquare);
            }
        })
    }

    containsBomb(num)
    {
        return this.squares[num].classList.contains('bomb');
    }

    checkLeft(i)
    {
        return i > 0 && !this.edges.left && this.containsBomb(i - 1)
    }

    checkTopRight(i)
    {
        return i > 9 && !this.edges.right && this.containsBomb(i + 1 - this.tileWidth)
    }

    checkTop(i)
    {
        return i > 10 && this.containsBomb(i - this.tileWidth)
    }

    checkTopLeft(i)
    {
        return i > 11 && !this.edges.left && this.containsBomb(i - 1 - this.tileWidth)
    }

    checkRight(i)
    {
        return i < 98 && !this.edges.right && this.containsBomb(i + 1)
    }

    checkBottomLeft(i)
    {
        return i < 90 && !this.edges.left && this.containsBomb(i - 1 + this.tileWidth)
    }

    checkBottomRight(i)
    {
        return i < 88 && !this.edges.right && this.containsBomb(i + 1 + this.tileWidth)
    }

    checkBottom(i)
    {
        return i < 89 && this.containsBomb(i + this.tileWidth)
    }


    shuffleBombArray()
    {
        let bombsArray = Array(this.bombAmount).fill('bomb');
        let emptyArray = Array(this.boardWidth - this.bombAmount).fill('valid');
        let gameArray = emptyArray.concat(bombsArray);
        let shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        return shuffledArray
    }
}