import { move } from "../api/requests";
import { MoveDirection } from "../api/types";
import "./puzzleboard.css";

export const Tile = ({ num, setBoard, board, isCorrect, setIsExploding, image } : {num : number; setBoard: React.Dispatch<React.SetStateAction<number[]>>; board : number[]; isCorrect : boolean; setIsExploding: React.Dispatch<React.SetStateAction<boolean>>; image: any}) => {

    const defineDirection = (num : number) : MoveDirection | null => {
      let emptyTileIndex = board.indexOf(0);
      let numTileIndex = board.indexOf(num);
      if(emptyTileIndex + 4 == numTileIndex) {
        return MoveDirection.DOWN;
      } else if (emptyTileIndex - 4 == numTileIndex) {
        return MoveDirection.UP;
      } else if (emptyTileIndex + 1 == numTileIndex) {
        return MoveDirection.RIGHT;
      } else if (emptyTileIndex - 1 == numTileIndex) {
        return MoveDirection.LEFT;
      }

      return null;
    }

    return (
      <div onClick={() => {
        let moveDirection = defineDirection(num);
        if(moveDirection !== null) {
          move({
            id: parseInt(localStorage.getItem("gameId")!),
            direction: moveDirection,
            callback: (data) => {
              setBoard(data.board.flat())
              setIsExploding(data.endTime != null);
            }
          })
        }
      }} className={`tile ${num === 0 ? "empty" : ""} ${isCorrect ? "correct" : ""} ${image ? "border" : ""}`}>
        {image ? 
          <div className="tile" style={{
            backgroundImage: `url(${image.imageSrc})`,
            backgroundPosition: `${image.position.x}px ${image.position.y}px`,
            backgroundSize: `${100 * 4}px ${100 * 4}px`,
          }}/>
        : (num !== 0 && num)}
      </div>
    );
  };