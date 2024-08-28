import { useEffect, useState } from "react";

export const Timer = ({ startingTime, isFinised} : {startingTime: string; isFinised : boolean}) => {
    const [timePassed, setTimePassed] = useState(0);
    const [inter, setInter] = useState<any>();
    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      };
      
    useEffect(() => {
        const startTime = new Date(startingTime).getTime();
        const updateCounter = () => {
          const currentTime = new Date().getTime();
          const timeDifference = Math.floor((currentTime - startTime) / 1000); 
          setTimePassed(timeDifference);
        };
    
        if(isFinised){
          return;
        }
        const intervalId = setInterval(updateCounter, 1000);
        setInter(intervalId);
        return () => clearInterval(intervalId);
      }, [startingTime]);

      useEffect(() => {
        clearInterval(inter);
      }, [isFinised])

    return (<div>
        Timer : {formatTime(timePassed)}
    </div>)
}
