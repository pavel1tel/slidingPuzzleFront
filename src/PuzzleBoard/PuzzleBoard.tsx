import "./puzzleboard.css";
import { Tile } from "./Tile";

export const PuzzleBoard = ({ tiles, setBoard, setIsExploding } : {tiles : number[] ; setBoard: React.Dispatch<React.SetStateAction<number[]>>;setIsExploding: React.Dispatch<React.SetStateAction<boolean>>;}) => {
    return (<>
      <div className="puzzle-board">
      {tiles.map((number, index) => (
        <Tile setIsExploding={setIsExploding} isCorrect={number - 1 == index} board={tiles} setBoard={setBoard} key={index} num={number} />
      ))}
    </div>
    </>
    );
  };