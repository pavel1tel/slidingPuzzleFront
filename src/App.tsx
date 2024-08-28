import { useEffect, useState } from 'react';
import './App.css';
import { PuzzleBoard } from './PuzzleBoard/PuzzleBoard';
import { Menu } from './Menu/Menu';
import { getGame, getGames } from './api/requests';
import { GetGameResponse } from './api/types';
import { Timer } from './Timer/Timer';
import ConfettiExplosion from 'react-confetti-explosion';
import { useDropzone } from 'react-dropzone';
import { RecordTable } from './RecordTable/RecordTable';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [fetchBoard, setFetchBoard] = useState<boolean>(false);
  const [board, setBoard] = useState<number[]>([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]);
  const [startingTime, setStartingTime] = useState<string>("");
  const [isExploding, setIsExploding] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [imageTiles, setImageTiles] = useState<any>([]);
  const [recordTable, setRecordTable] = useState<GetGameResponse[]>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const tileSize = { width: 100, height: 100 };
        const newTiles = [];
        for (let i = 0; i < 16; i++) {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const position = { x: -col * tileSize.width, y: -row * tileSize.height };
          newTiles.push({ imageSrc, position });
        }
        console.log(newTiles);
        setImageTiles(newTiles);
      };
    }
  }, [imageSrc]);
  
  useEffect(() => {
    if(localStorage.getItem("gameId")){
      setGameStarted(true);
      getGame({id : parseInt(localStorage.getItem("gameId")!),  callback : (response : GetGameResponse) : void => {
        setBoard(response.board.flat())
        setStartingTime(response.startTime);
        setIsExploding(response.endTime != null)
      }})
      getGames({callback : (response) => {
        setRecordTable(response);
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
      getGames({callback : (response) => {
        setRecordTable(response);
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
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Make it funny, click or drop an image!</p>
          </div>
        <Timer startingTime={startingTime} isFinised={isExploding}/>
        <PuzzleBoard imageTiles={imageTiles} setBoard={setBoard} tiles={board} setIsExploding={setIsExploding}/>
        <Menu  onStart={() => {
          setGameStarted(true);
          setFetchBoard((prev) => !prev)
        }}/>
        <RecordTable records={recordTable ? recordTable : []}/>
      </>
      }
      
    </div>
  );
}

export default App;
