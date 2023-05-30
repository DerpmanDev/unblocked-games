// Game state
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    // Create the game board
    const boardContainer = document.querySelector('.board');
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => makeMove(i));
      boardContainer.appendChild(cell);
    }

    // Handle player move
    function makeMove(index) {
      if (board[index] === '') {
        board[index] = currentPlayer;
        const cell = boardContainer.children[index];
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer, 'move-animation');
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    // Check for a win
    function checkWin() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
          // Highlight winning cells
          boardContainer.children[a].classList.add('win');
          boardContainer.children[b].classList.add('win');
          boardContainer.children[c].classList.add('win');

          // Disable further moves
          for (let i = 0; i < 9; i++) {
            boardContainer.children[i].removeEventListener('click', makeMove);
          }

          alert(`Player ${board[a]} wins!`);

          // Reset the game after a delay
          setTimeout(resetGame, 1000);
          return;
        }
      }

      // Check for a draw
      if (!board.includes('')) {
        alert('It\'s a draw!');

        // Reset the game after a delay
        setTimeout(resetGame, 1000);
      }
    }

    // Reset the game
    function resetGame() {
      currentPlayer = 'X';
      board = ['', '', '', '', '', '', '', '', ''];

      // Clear the board
      for (let i = 0; i < 9; i++) {
        const cell = boardContainer.children[i];
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'win', 'move-animation');
        cell.addEventListener('click', () => makeMove(i));
      }
    }

    // Dark mode switch
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--x-color', '#fff');
        document.documentElement.style.setProperty('--o-color', '#fff');
      } else {
        document.documentElement.style.setProperty('--x-color', '#000');
        document.documentElement.style.setProperty('--o-color', '#000');
      }
    });