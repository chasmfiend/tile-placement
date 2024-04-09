class Tile {
  constructor(size, row, col) {
    this.size = size;
    this.row = row;
    this.col = col;
  }
}

function isValidPlacement(grid, tile, row, col) {
  for (let i = row; i < row + tile.size; i++) {
    for (let j = col; j < col + tile.size; j++) {
      if (i >= grid.length || j >= grid[0].length || grid[i][j] !== null) {
        return false;
      }
    }
  }
  return true;
}

function placeTiles(gridSize, largeCount, mediumCount, smallCount) {
  const grid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(null));
  const tileSizes = [
    ["Large", 100],
    ["Medium", 50],
    ["Small", 10],
  ];
  const tileCounts = [largeCount, mediumCount, smallCount];

  for (let i = 0; i < tileSizes.length; i++) {
    const [size, count] = [tileSizes[i][0], tileCounts[i]];
    for (let j = 0; j < count; j++) {
      while (true) {
        const row = Math.floor(Math.random() * (gridSize - tileSizes[i][1]));
        const col = Math.floor(Math.random() * (gridSize - tileSizes[i][1]));
        const tile = new Tile(size, row, col);
        if (isValidPlacement(grid, tile, row, col)) {
          for (let k = row; k < row + tileSizes[i][1]; k++) {
            for (let l = col; l < col + tileSizes[i][1]; l++) {
              grid[k][l] = tile;
            }
          }
          break;
        }
      }
    }
  }

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === null) {
        grid[row][col] = new Tile("Small", row, col);
      }
    }
  }

  return grid;
}

// Example usage
const gridSize = 400;
const largeCount = 3;
const mediumCount = 6;
const smallCount = Math.pow(gridSize / 10, 2) - largeCount - mediumCount;

const grid = placeTiles(gridSize, largeCount, mediumCount, smallCount);

// Print the grid
for (const row of grid) {
  let rowString = "";
  for (const tile of row) {
    rowString += `(${tile.size}, (${tile.row}, ${tile.col})), `;
  }
  console.log(rowString);
}