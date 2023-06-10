
  // Factory function to create players
const Player = (name, symbol) => {
    return { name, symbol };
  };
  
  // Game object
  const game = {
    currentPlayer: null,
    board: Array(9).fill(null),
    players: [Player("Player 1", "X"), Player("Player 2", "O")],
    gameEnded: false,
  
    // Initialize the game
    init() {
      this.currentPlayer = this.players[0];
      this.render();
    },
  
    // Make a move
    makeMove(index) {
      if (this.board[index] === null && !this.gameEnded) {
        this.board[index] = this.currentPlayer.symbol;
        this.checkWin();
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
        this.render();
      }
    },
  
    // Check for a win
    checkWin() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
      ];
  
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          this.board[a] &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c]
        ) {
          this.gameEnded = true;
          this.displayMessage(`Player ${this.currentPlayer.name} wins!`);
          this.highlightCells(combination);
          return;
        }
      }
  
      if (this.board.every((cell) => cell !== null)) {
        this.gameEnded = true;
        this.displayMessage("It's a draw!");
      }
    },
  
    // Highlight the winning cells
    highlightCells(combination) {
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        if (combination.includes(i)) {
          cells[i].classList.add("winning");
        }
      }
    },
  
    // Reset the game
    reset() {
      this.board = Array(9).fill(null);
      this.currentPlayer = this.players[0];
      this.gameEnded = false;
      this.displayMessage("");
      this.clearHighlight();
      this.render();
    },
  
    // Clear cell highlighting
    clearHighlight() {
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("winning");
      }
    },
  
    // Render the game board
    render() {
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = this.board[i] || "";
      }
    },
  
    // Display message
    displayMessage(message) {
      const messageArea = document.getElementById("message");
      messageArea.textContent = message;
    },
  };
  
  // Initialize the game
  game.init();
  
  // Add event listeners to cells
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => game.makeMove(i));
  }
  
  // Add event listener to reset button
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => game.reset());
  