import "./puzzleboard.css";
import { Tile } from "./Tile";

export const PuzzleBoard = ({ tiles, setBoard, setIsExploding, imageTiles } : {tiles : number[] ; setBoard: React.Dispatch<React.SetStateAction<number[]>>;setIsExploding: React.Dispatch<React.SetStateAction<boolean>>; imageTiles : any}) => {
    return (<>
      <div className="puzzle-board">
      {tiles.map((number, index) => (
        <Tile image={imageTiles[number - 1]} setIsExploding={setIsExploding} isCorrect={number - 1 == index} board={tiles} setBoard={setBoard} key={index} num={number} />
      ))}
    </div>
    </>
    );
  };