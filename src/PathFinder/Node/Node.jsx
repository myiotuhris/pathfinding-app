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
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        }=this.props;
        const clsName=isStart?'node-start':isFinish?'node-finish':isWall?'node-wall':'';
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