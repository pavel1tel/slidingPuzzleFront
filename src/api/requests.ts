import { CreateGameResponse, GetGameResponse, MoveDirection } from "./types";

export const startNewGame = ({callback} : {callback : (arg0: CreateGameResponse) => void}) => {
    fetch("http://localhost:8080/api/v1/games", 
    {
        'credentials': 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
    }
    ).then((res) => {
        return res.json();
    }).then((data : CreateGameResponse) => {
        callback(data);
      });
}

export const getGame = ({id, callback} : { id : number ; callback : (arg0: GetGameResponse) => void}) => {
    fetch("http://localhost:8080/api/v1/games/" + id, 
    {
        'credentials': 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET",
    }
    ).then((res) => {
        return res.json();
    }).then((data : GetGameResponse) => {
        callback(data);
      });
}

export const getGames = ({callback} : { callback : (arg0: GetGameResponse[]) => void}) => {
  fetch("http://localhost:8080/api/v1/games", 
  {
      'credentials': 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET",
  }
  ).then((res) => {
      return res.json();
  }).then((data : GetGameResponse[]) => {
      callback(data);
    });
}


export const move = ({id, direction ,callback} : {id : number, direction : MoveDirection ,callback : (arg0: GetGameResponse) => void}) => {
  fetch("http://localhost:8080/api/v1/games/" + id, 
  {
      'credentials': 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body : JSON.stringify({"direction" : direction})
  }
  ).then((res) => {
      return res.json();
  }).then((data : GetGameResponse) => {
      callback(data);
    });
}