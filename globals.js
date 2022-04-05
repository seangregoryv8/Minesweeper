export const GRID = document.querySelector('.grid');
export const WINDOW_WIDTH = window.innerHeight;
export const MARGIN = 100
export const GRID_SIZE = WINDOW_WIDTH - (MARGIN * 2);
export const TILE_WIDTH = 10;
export const BOARD_WIDTH = TILE_WIDTH * TILE_WIDTH;

/**
 * 
 * @param {Square} square 
 */
export function click(square)
{
    if (square.board.game.isGameOver) return;
    if (square.checked || square.flagged) return
    if (square.isBomb())
    {
        square.board.game.gameOver();
    }
    else
    {
        if (square.total != 0)
        {
            square.check();
            square.divElement.innerHTML = square.total.toString();
            return;
        }
        square.board.checkSquare(square);
    }
    square.check();
}

export function delay(milliseconds)
{
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    })
}