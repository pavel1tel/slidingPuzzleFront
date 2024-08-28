import { GetGameResponse } from "../api/types";
import "./recordtable.css"
export const RecordTable = ({records} : {records: GetGameResponse[]}) => {
    const formatTimeDifference = (startTime: string ,endTime: string) => {
        const start = new Date(startTime);
        const end = endTime ? new Date(endTime) : new Date();
        // @ts-ignore
        const timeDiff = Math.floor((end - start) / 1000);
      
        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
      
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      const getTimeDifferenceInSeconds = (startTime : string, endTime : string) => {
        const start = new Date(startTime);
        const end = endTime ? new Date(endTime) : new Date();
        // @ts-ignore
        return Math.floor((end - start) / 1000); 
      };
      

    return (
        <>
        <h1>Record table</h1>
        <table className="record-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Time Taken</th>
        </tr>
      </thead>
      <tbody>
        {records.filter(record => record.endTime != null)
        .sort((a, b) => getTimeDifferenceInSeconds(a.startTime, a.endTime!) - getTimeDifferenceInSeconds(b.startTime, b.endTime!))
        .map((record, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{new Date(record.startTime).toLocaleString()}</td>
            <td>{record.endTime ? new Date(record.endTime).toLocaleString() : 'In Progress'}</td>
            <td>{formatTimeDifference(record.startTime, record.endTime!)}</td>
          </tr>
        ))}
      </tbody>
    </table>    
        </>
    )
}