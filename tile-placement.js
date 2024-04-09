class Tile {
  constructor(name, row, col) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    switch (name) {
      case "L":
        this.size = 10;
        break;
      case "M":
        this.size = 5;
        break;
      default:
        this.size = 1;
        break;
    }
    this.row = row;
    this.col = col;
  }
}

function isValidPlacement(grid, tile, row, col) {
  
  for (let i = row; i < row + tile.size; i++) {
    for (let j = col; j < col + tile.size; j++) {
      if (i >= grid.length || j >= grid[0].length || grid[i][j].name !== "S") {
        return false;
      }
    }
  }
  return true;
}
function printGrid(grid) {
  console.log("Grid:\n");
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].map((tile) => (tile ? tile.name : "null")).join(" "));
  }
  console.log("-------------------------------------------------------\n")
}

function placeTiles(gridSize, largeCount, mediumCount) {
  const grid = Array(gridSize)
    .fill()
    .map((i) => Array(gridSize).fill(new Tile("S",-1,-1)));
  const tileSizes = [
    {name: "L", size: 10},
   {name:"M", size: 5},
    {name:"S", size: 1}
  ];
  const tileCounts = [largeCount, mediumCount];
//Place the large and medium tiles
  for (let i = 0; i < tileSizes.length; i++) {
    const [name, count] = [tileSizes[i].name, tileCounts[i]];
    for (let j = 0; j < count; j++) {
      while (true) {
        const row = Math.floor(Math.random() * (gridSize - tileSizes[i].size));
        const col = Math.floor(Math.random() * (gridSize - tileSizes[i].size));
        const tile = new Tile(name, row, col);
        if (isValidPlacement(grid, tile, row, col)) {
          for (let k = row; k < row + tileSizes[i].size; k++) {
            for (let l = col; l < col + tileSizes[i].size; l++) {
              grid[k][l] = tile;
            }
          }
          break;
        }
      }
    }
  }
  return grid;
}

// Example usage
const gridSize = 40;
const largeCount = 5;
const mediumCount = 15;

const grid = placeTiles(gridSize, largeCount, mediumCount);

printGrid(grid);