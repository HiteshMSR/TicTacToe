import './App.css';
import { useState } from "react";
import './App.css';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Button from '@mui/material/Button';
function App() {
  return(
    <>
<div className="Game">
<h1>Tic-Tac-Toe</h1>

    <Board />
</div>
</>
);

}


function Board(){

const[board,setBoard]=useState([null,null,null,null,null,null,null,null,null]);
const [isXTurn,setIsXTurn]=useState(true);
const DecideWinner  = (board)=>{
    let result=null
    const lines=[ [0,1,2],[3,4,5], [6,7,8],[0,3,6], [1,4,7],[2,5,8],[0,4,8],[2,4,6], ];
   

    for(let i=0; i<lines.length; i++){
        const[a,b,c]=lines[i];
        if(board[a]!==null && board[a]===board[b] && board[b]===board[c]){
            console.log("Winner",board[a]);
        return board[a];
        }
    }
    
    return result;
}

const { width, height } = useWindowSize()
const  winner=DecideWinner(board)
const handleClick=(index) =>{
    // console.log(index);
    if(board[index]=== null && winner===null){

    const boardCopy=[...board];
    boardCopy[index]= isXTurn ?'X' : 'O'; 
    setBoard(boardCopy);
    setIsXTurn(!isXTurn);
    } 
};

return(
<>
    <div className="board">

       {winner? <Confetti width={width} height={height} gravity={0.02} /> : null}
        {board.map((val, index) =>(
            <GameBox val={val} onPlayerClick={()=>handleClick(index)} />
        ))}
     {winner ? <h2>Winner is: {winner} </h2> :null }

    </div> 
    <div className="RestartButton">      
        <Button onClick={()=>{setIsXTurn(true);setBoard([null,null,null,null,null,null,null,null,null])}}variant="contained">Restart</Button>

    </div>
    </>
 
);
        }






        function GameBox({val,onPlayerClick}) {
            const styles={
                color: val==='X' ? "green": "red"
            };
            return(
                <div style={styles} onClick={onPlayerClick} className="game-box">{val}</div>
            );

            
        }

export default App;
