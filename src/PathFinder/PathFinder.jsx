import React, {Component} from 'react';
import Node from './Node/Node';
import './PathFinder.css';
// import {bfs} from './algo/bfs';
// import{dfs} from './algo/dfs';
import {djikstra, getNodesInShortestPathOrder} from '../algo/djikstra';

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
       
    handleMouseDown(row,col){
      const newgrid=getNewGrid(this.state.grid,row,col);
      this.setState({grid: newgrid,mouseIsPressed: true,});
    }
    handleMouseEnter(row,col){
      if(!this.state.mouseIsPressed) return;
      const newgrid=getNewGrid(this.state.grid,row,col);
      this.setState({grid: newgrid,});
    }
    handleMouseUp(row,col){
      this.setState({mouseIsPressed: false,});
    }
    animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, 10 * i);
      }
    }
  
    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }, 5 * i);
      }
    }
  
    visualizeDjikstra() {
      const grid = this.state.grid;
      const startNode = grid[START_ROW][START_COL];
      const finishNode = grid[END_ROW][END_COL];
      const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    //visualizeDfs()
    render(){
        const grid=this.state.grid;
        const mousePress=this.state.mouseIsPressed;

        return(
            <>
            <button onClick={()=>this.visualizeDjikstra()}>Find Path</button>
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
const getNewGrid=(grid,row,col)=>{
    const temp=grid.slice();
    const prevnode=temp[row][col];
    const newnode={
      ...prevnode,
      isWall: !prevnode.isWall,
    }
    temp[row][col]=newnode;
    return temp;


};