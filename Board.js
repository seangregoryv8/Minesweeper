import { GRID } from "./globals.js";

export default class Board
{
    constructor()
    {
        this.tileWidth = 10;
        this.boardWidth = this.tileWidth * this.tileWidth
        this.squares = [];
        this.bombAmount = 20;
        this.shuffledArray = this.shuffleBombArray();
    }

    createBoard()
    {
        for (let i = 0; i < this.boardWidth; i++)
        {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(this.shuffledArray[i]);
            GRID.appendChild(square);
            this.squares.push(square);
        }
    }

    addNumbers()
    {
        for (let i = 0; i < this.squares.length; i++)
        {
            let total = 0;
            const isLeftEdge = (i % this.tileWidth === 0);
            const isRightEdge = (i % this.tileWidth === this.tileWidth - 1);

            if (squares[i].classList.contains('valid'))
            {
                if (this.checkLeftEdge(i, isLeftEdge)) total++;
                if (this.checkRightEdge(i, isRightEdge)) total++;
            }
        }
    }

    checkLeftEdge(i, isEdge)
    {
        return (i > 0 && !isEdge && this.squares[i - 1].classList.contains('bomb'))
    }

    checkRightEdge(i, isEdge)
    {
        return (i > 0 && !isEdge && this.squares[i + 1 - this.tileWidth].classList.contains('bomb'))
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