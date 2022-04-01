import Board from "./Board.js"

export default class Game
{
    constructor() {}

    start()
    {
        let board = new Board();
        board.createBoard();
    }
}