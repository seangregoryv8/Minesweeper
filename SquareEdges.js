import { TILE_WIDTH } from "./globals.js";

export default class SquareEdges
{
    constructor()
    {
        this.edges = 
        {
            left: false,
            right: false
        };

        this.left = 
        {
            value: 0,
            condition: false
        };
        this.topRight = 
        {
            value: 0,
            condition: false
        };
        this.top = 
        {
            value: 0,
            condition: false
        };
        this.topLeft = 
        {
            value: 0,
            condition: false
        };
        this.right = 
        {
            value: 0,
            condition: false
        };
        this.bottomLeft = 
        {
            value: 0,
            condition: false
        };
        this.bottomRight = 
        {
            value: 0,
            condition: false
        };
        this.bottom = 
        {
            value: 0,
            condition: false
        };
    }

    /**
     * 
     * @param {Number} i 
     */
    setValues(i)
    {
        this.edges.left = i % TILE_WIDTH === 0;
        this.edges.right = i % TILE_WIDTH === TILE_WIDTH - 1;

        this.left.value = i - 1;
        this.left.condition = i > 0;

        this.topRight.value = i + 1 - TILE_WIDTH;
        this.topRight.condition = i > 9;

        this.top.value = i - TILE_WIDTH;
        this.top.condition = i > 10;

        this.topLeft.value = i - 1 - TILE_WIDTH;
        this.topLeft.condition = i > 11;

        this.right.value = i + 1;
        this.right.condition = i < 98;

        this.bottomLeft.value = i - 1 + TILE_WIDTH;
        this.bottomLeft.condition = i < 90;

        this.bottomRight.value = i + 1 + TILE_WIDTH;
        this.bottomRight.condition = i < 88;

        this.bottom.value = i + TILE_WIDTH;
        this.bottom.condition = i < 89;
    }

    checkLeft = () => this.left.condition && !this.edges.left;
    checkTopRight = () => this.topRight.condition && !this.edges.right;
    checkTop = () => this.top.condition;
    checkTopLeft = () => this.topLeft.condition && !this.edges.left;
    checkRight = () => this.right.condition && !this.edges.right;
    checkBottomLeft = () => this.bottomLeft.condition && !this.edges.left;
    checkBottomRight = () => this.bottomRight.condition && !this.edges.right;
    checkBottom = () => this.bottom.condition;
}