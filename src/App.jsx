import { useState } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Players from "./components/Players/Players";
import Log from "./components/Log/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [newPlayer, setNewPlayer] = useState({
    "X": "Player 1",
    "O": "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdCombination =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstCombination &&
      firstCombination === secondCombination &&
      firstCombination === thirdCombination
    ) {
      winner = newPlayer[firstCombination]
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatePlayer = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatePlayer;
    });
    console.log(gameTurns);
  };
   
  const handlerRestart = () =>{
    setGameTurns([])
  }
  const handlerChangeNewName = (symbol, newName) =>{
   setNewPlayer(prevPlayer =>{
    return{
      ...prevPlayer,
      [symbol] : newName
    }
   })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlerChangeNewName}
          />
          <Players
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlerChangeNewName}

          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handlerRestart}/> 
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
