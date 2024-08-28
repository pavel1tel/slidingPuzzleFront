import { startNewGame } from "../api/requests";
import { CreateGameResponse } from "../api/types";
import "./menu.css";

export const Menu = ({ onStart } : {onStart : () => void}) => {
    const handleStart = () : void => {
        startNewGame({callback : (a: CreateGameResponse) => {
            localStorage.setItem("gameId", a.gameId.toString());
            onStart()
        }}) 
    }
    return (
      <div className="menu">
        <button onClick={handleStart}>Start New Game</button>
      </div>
    );
  };