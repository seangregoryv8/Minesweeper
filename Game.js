import Board from "./Board.js"

export default class Game
{
    constructor()
    {
        this.isGameOver = false;
    }

    start()
    {
        let board = new Board(this);
        board.createBoard();
    }
}