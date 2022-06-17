let start_button = document.getElementById("start-canvas");
let clear_button = document.getElementById("clear-canvas");

// Maze State
var rows, cols;
var w = 40;

var grid = [];

// Canvas Shortcut Functions
// Create Canvas Element
let createCanvas = (w, h) => {
    let new_canvas = document.createElement("canvas");
    new_canvas.width = w;
    new_canvas.height = h;

    return new_canvas;
};

// Draw a Line
let line = (ctx, x, y, dx, dy) => {
    // Style
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(dx, dy);
    ctx.stroke();
    ctx.closePath();
    // console.log(`Line Drawn: (${x}, ${y}) -> (${dx}, ${dy})`);
};

// Grid Cell
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.l = 0;
        this.r = 0;
        this.u = 0;
        this.d = 0;
    }

    editWalls(top = 0, right = 0, bottom = 0, left = 0) {
        this.u = top;
        this.r = right;
        this.d = bottom;
        this.l = left;
    }

    show(ctx) {
        var x = this.i * w;
        var y = this.j * w;

        if (this.l) {
            // left path -> x, y -> x, y + w
            line(ctx, x, y, x, y + w);
        }
        if (this.r) {
            // right path -> x + w, y -> x + w, y + w
            line(ctx, x + w, y, x + w, y + w);
        }
        if (this.u) {
            // top(up) path -> x, y -> x + w, y
            line(ctx, x, y, x + w, y);
        }
        if (this.d) {
            // bottom(down) path -> x, y + w -> x + w, y + w
            line(ctx, x, y + w, x + w, y + w);
        }

        // ctx.strokeStyle = "blue";
        // ctx.strokeRect(x, y, w, w);
    }
}

// Setup Canvas and grid, then draw grid on canvas
function setup(width, height) {
    // Create Canvas
    let canvas = createCanvas(width, height);
    var ctx = canvas.getContext("2d"); // Create(or get?) Contex

    // Attach Canvas
    let root = document.getElementById("game");
    root.appendChild(canvas);

    console.log("Created/Added Canvas to [#game] Element");

    // set Global cols, rows var
    cols = width / w;
    rows = height / w;

    // CSS order
    let walls = [1, 1, 1, 1]; // [top, right, bottom, left]

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            // Create Cell
            var cell = new Cell(i, j);
            // Edit Walls
            cell.editWalls(...walls);

            // Push to Grid
            grid.push(cell);
        }
    }

    start_button.addEventListener("click", () => {
        // Draw our grid
        for (var i = 0; i < grid.length; i++) {
            grid[i].show(ctx);
        }
    });

    clear_button.addEventListener("click", () => {
        // Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    console.log("Grid Drawn on Canvas");
}

// Run Setup
setup(400, 400);
