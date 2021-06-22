import React, {Component} from 'react';
import Node from './Node/Node';
import './PathFinder.css';
import {bfs,getNodesInShortestPathOrderBFS} from '../algo/bfs';
// import{dfs} from './algo/dfs';
//import {djikstra, getNodesInShortestPathOrder} from '../algo/djikstra';

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
          visualizing: false,
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
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if(!node.isStart){document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';}
        }, 10 * i);
      }
    }
  
    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if(!node.isStart && !node.isFinish){document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';}
        }, 5 * i);
      }
      this.setState({visualizing:false});
    }
  
    visualizeBFS() {
      if(this.state.visualizing) return;
      this.setState({visualizing:true});
      const grid = this.state.grid;
      const startNode = grid[START_ROW][START_COL];
      const finishNode = grid[END_ROW][END_COL];
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      // for(let i=0;i<visitedNodesInOrder.length;i++){
      //   let temp=visitedNodesInOrder[i].prevNode;
      //   console.log({temp});
      // }
      const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
      this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    //visualizeDfs()
    render(){
        const grid=this.state.grid;
        const mousePress=this.state.mouseIsPressed;

        return(
            <>
            <button onClick={()=>this.visualizeBFS()}>Find Path with BFS</button>
            <div className='board'>
            {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall,isVisited,isShortest } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                      isShortest={isShortest}
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
        isShortest: false,
        distance: Infinity,
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