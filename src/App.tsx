import { useEffect, useState } from 'react';
import './App.css';
import { PuzzleBoard } from './PuzzleBoard/PuzzleBoard';
import { Menu } from './Menu/Menu';
import { getGame } from './api/requests';
import { GetGameResponse } from './api/types';
import { Timer } from './Timer/Timer';
import ConfettiExplosion from 'react-confetti-explosion';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [fetchBoard, setFetchBoard] = useState<boolean>(false);
  const [board, setBoard] = useState<number[]>([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]);
  const [startingTime, setStartingTime] = useState<string>("");
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("gameId")){
      setGameStarted(true);
      getGame({id : parseInt(localStorage.getItem("gameId")!),  callback : (response : GetGameResponse) : void => {
        setBoard(response.board.flat())
        setStartingTime(response.startTime);
        setIsExploding(response.endTime != null)
      }})
    }
  }, [])

  useEffect(() => {
    if(gameStarted){
      getGame({id : parseInt(localStorage.getItem("gameId")!),  callback : (response : GetGameResponse) : void => {
        setBoard(response.board.flat())
        setStartingTime(response.startTime);
        setIsExploding(response.endTime != null)
      }})
    }
  }, [fetchBoard])

  return (
    <div className="App">
      {isExploding && <ConfettiExplosion duration={3000} force={0.8} particleCount={250} width={1600}/>}
      <h1>15 Puzzle Game</h1>
      {!gameStarted ?
      <Menu  onStart={() => {
        setGameStarted(true);
        setFetchBoard((prev) => !prev)
      }}/> :
      <>
        <Timer startingTime={startingTime} isFinised={isExploding}/>
        <PuzzleBoard setBoard={setBoard} tiles={board} setIsExploding={setIsExploding}/>
        <Menu  onStart={() => {
          setGameStarted(true);
          setFetchBoard((prev) => !prev)
        }}/>
      </>
      }
      
    </div>
  );
}

export default App;
