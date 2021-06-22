import React, {Component} from 'react';
import './node.css';

export default class Node extends Component {

    render(){
        const {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            isVisited,
            isShortest,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        }=this.props;
        const clsName=isStart?'node-start':isFinish?'node-finish':isWall?'node-wall':isVisited?'node-visited':isShortest?'node-shortest-path':'';
        return(
            <div 
                id={`node-${row}-${col}`}
                className={`node ${clsName}`}
                onMouseDown={()=>onMouseDown(row,col)}
                onMouseUp={()=>onMouseUp(row,col)}
                onMouseEnter={()=>onMouseEnter(row,col)}></div>
        );
    }
}