import React from 'react'

export default function GameOver({winner, onRestart}){
return(
    <div id='game-over'>
        <h2>Game Over</h2>
        {winner && <p>{winner}, вы выиграли</p>}
        {!winner && <p>Это ничья</p>}
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
)
}