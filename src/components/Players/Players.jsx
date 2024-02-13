import { useState } from "react";

export default function Players({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName) 
  const [isEdit, setIsEdit] = useState(false);

  const handleEditedName = () => {
    setIsEdit((editing) => !editing);

    if(isEdit){
      onChangeName(symbol, playerName)
    }
  };
  const handleUpdateName = (e) =>{
    setPlayerName(e.target.value)
  }

    let editedPlayerName = <span className="player-name">{playerName}</span>

    if(isEdit) {
        editedPlayerName = <input type="text" required value={playerName} onChange={handleUpdateName} />
    }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editedPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditedName}>{isEdit ? 'Save' : 'Edit'}</button>
    </li>
  );
}
