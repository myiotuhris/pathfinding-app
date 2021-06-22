export function bfs(grid,startNode,endNode){
    const visitedNodesInOrder=[];
    let nextNodeList=[startNode];
    while(nextNodeList.length){
        const currNode=nextNodeList.shift();
        if(currNode===endNode) return visitedNodesInOrder;
        if( !currNode.isWall && (currNode.isStart || !currNode.isVisited)){
            currNode.isVisited=true;
            visitedNodesInOrder.push(currNode);
            const row=currNode.row;
            const col=currNode.col;
            let neighbour;
            if(col<grid[0].length-1){
                neighbour=grid[row][col+1];
                if(!neighbour.isVisited) {nextNodeList.push(neighbour);neighbour.prevNode=currNode;}

            }
            if(row<grid.length-1){
                neighbour=grid[row+1][col];
                if(!neighbour.isVisited) {nextNodeList.push(neighbour);neighbour.prevNode=currNode;}

            }
            if(col>0){
                neighbour=grid[row][col-1];
                if(!neighbour.isVisited) {nextNodeList.push(neighbour);neighbour.prevNode=currNode;}

            }
            if(row>0){
                neighbour=grid[row-1][col];
                if(!neighbour.isVisited) {nextNodeList.push(neighbour);neighbour.prevNode=currNode;}

            }
            
        }
    }
 
}
export function getNodesInShortestPathOrderBFS(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    // let i=0;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.prevNode;
    //console.log(i);i++;
    }
    return nodesInShortestPathOrder;
  }