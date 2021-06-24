import React, {Component} from 'react';
import Node from './Node/Node';
import './PathFinder.css';
import {bfs,getNodesInShortestPathOrder} from '../algo/bfs';
import{dfs} from '../algo/dfs';
import {djikstra} from '../algo/djikstra';

const START_ROW=2;
const NUMROWS=20;
const START_COL=5;
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
          selectedAlgo: "Select An Algorithm",
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
    animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 15 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if(!node.isStart && !node.isFinish){document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';}
        }, 15 * i);
      }
    }
  
    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if(!node.isStart && !node.isFinish){document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';}
        }, 30 * i);
      }
      this.setState({visualizing:false});
    }
    generateRandomMaze(){
      this.resetGrid();
      for (let row = 0; row < this.state.grid.length; row++) {
        for (let col = 0; col < this.state.grid[0].length; col++) {
          if (
            !(
              (row === START_ROW && col === START_COL) ||
            (row === END_ROW && col === END_COL)
            )
          ) {
            document.getElementById(`node-${row}-${col}`).className = "node";
          }
        }
      }
      let ngrid=this.state.grid.slice();
      for (let row = 0; row < ngrid.length; row++) {
        for (let col = 0; col < ngrid[0].length; col++) {
          if (
            (row === START_ROW && col === START_COL) ||
            (row === END_ROW && col === END_COL)
          )
            continue;
          if (Math.random() < 0.33) {
            ngrid[row][col].isWall=true;
          }
        }
      }
      this.setState({grid: ngrid});
    }
    visualizeBFS() {
      if(this.state.visualizing) return;
      this.setState({visualizing:true});
      const grid = this.state.grid;
      const startNode = grid[START_ROW][START_COL];
      const finishNode = grid[END_ROW][END_COL];
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    visualizeDFS(){
      if(this.state.visualizing) return;
      this.setState({visualizing:true});
      const grid = this.state.grid;
      const startNode = grid[START_ROW][START_COL];
      const finishNode = grid[END_ROW][END_COL];
      const visitedNodesInOrder = dfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    visualizeDjikstra(){
      if(this.state.visualizing) return;
      this.setState({visualizing:true});
      const grid = this.state.grid;
      const startNode = grid[START_ROW][START_COL];
      const finishNode = grid[END_ROW][END_COL];
      const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    resetGrid(){
      if(this.state.visualizing) return;
      const newGrid=getInitGrid();
      this.setState({grid:newGrid,visualizing:false,});
    }
    clearPath(){
      if(this.state.visualizing) return;
      for (let row = 0; row < this.state.grid.length; row++) {
        for (let col = 0; col < this.state.grid[0].length; col++) {
          if (
            document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path"
          ) {
            document.getElementById(`node-${row}-${col}`).className = "node";
          }
        }
      }
      const newGrid = getGridWithoutPath(this.state.grid);
      this.setState({
        grid: newGrid,
      });
    }
    visualize(){
      const text=document.getElementById("algo-options").value;
      this.setState({selectedAlgo:text});
      if(text==="bfs"){this.visualizeBFS();}
      if(text==="dfs"){this.visualizeDFS();}
      if(text==="djikstra"){this.visualizeDjikstra();}

    }
    render(){
        const grid=this.state.grid;
        const mousePress=this.state.mouseIsPressed;

        return(
            <>
            
            <div class="navbar">
            <select id="algo-options" class="dropdown dropbtn">
              <option value="null" selected>Select an Algorithm</option>
              <option value="bfs">Breadth First Search</option>
              <option value="dfs">Depth First Search</option>
              <option value="djikstra">Djikstra Algorithm</option>
              
            </select>
              {/* <div class="dropdown">
                <button class="dropbtn"
                data-toggle="dropdown"
                aria-haspopup="true"
                  aria-expanded="false">
                  Algorithms

                  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                  <button>Djikstra Algorithm</button>
                  <button>Breadth First Search</button>
                  <button>Depth First Search</button>
                </div>
              </div> */}
              <button onClick={()=>this.generateRandomMaze()}>Generate Random Maze</button>
              <button onClick={()=>this.visualize()}>Visualize Algorithm</button>
              <button onClick={()=>this.clearPath()}>Clear Path</button>
              <button  onClick={()=>this.resetGrid()}>Clear Grid</button>
            </div> 
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
const getGridWithoutPath = (grid) => {
  let newGrid = grid.slice();
  for (let row of grid) {
    for (let node of row) {
      let newNode = {
        ...node,
        distance: Infinity,
        isVisited: false,
        isShortest: false,
        prevNode: null,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  return newGrid;
};