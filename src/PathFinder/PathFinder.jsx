import React, {Component} from 'react';
import Node from './Node/Node';
import './PathFinder.css';

const START_ROW=5;
const NUMROWS=20;
const START_COL=10;
const NUMCOLS=40;
const END_ROW=15;
const END_COL=35;

export default class PathFinder extends Component {
    constructor() {
      super();
      this.state = {
          mouseIsPressed: false,
          grid:[],
      };

    }
    componentDidMount(){
        const grid=getInitGrid();
        this.setState({grid:grid});
    }
       

    render(){
        const grid=this.state.grid;
        const mousePress=this.state.mouseIsPressed;

        return(
            <>
            <button>Find Path</button>
            <div className='board'>
            {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mousePress}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
            </div>
            </>
        )
    }

    
}

const createNode=(col,row)=>{
    return{
        col:col,
        row:row,
        isStart:(row==START_ROW)&&(col==START_COL),
        isFinish:(row==END_ROW)&& (col==END_COL),
        isWall: false,
        isVisited: false,
        //distance: Infinity,
        prevNode: null,

    }
};
const getInitGrid=()=>{
    const grid=[];
    for(let i=0;i<NUMROWS;i++){
        const temp=[];
        for(let j=0;j<NUMCOLS;j++){
            temp.push(createNode(j,i))
        }
        grid.push(temp);
    }
    return grid;
};