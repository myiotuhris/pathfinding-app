export function dfs(grid,startNode,endNode){
    const visitedNodesInOrder=[];
    let nextNodeList=[startNode];
    while(nextNodeList.length){
        const currNode=nextNodeList.pop();
        if(currNode===endNode) return visitedNodesInOrder;
        if( !currNode.isWall && (currNode.isStart || !currNode.isVisited)){
            currNode.isVisited=true;
            visitedNodesInOrder.push(currNode);
            const row=currNode.row;
            const col=currNode.col;
            let neighbour;
            if(row>0){
                neighbour=grid[row-1][col];
                if(!neighbour.isVisted) {nextNodeList.push(neighbour);neighbour.previousNode=currNode;}

            }
            if(row<grid.length-1){
                neighbour=grid[row+1][col];
                if(!neighbour.isVisted) {nextNodeList.push(neighbour);neighbour.previousNode=currNode;}

            }
            if(col>0){
                neighbour=grid[row][col-1];
                if(!neighbour.isVisted) {nextNodeList.push(neighbour);neighbour.previousNode=currNode;}

            }
            if(col<grid[0].length-1){
                neighbour=grid[row][col+1];
                if(!neighbour.isVisted) {nextNodeList.push(neighbour);neighbour.previousNode=currNode;}

            }

        }
    }


    //return visitedNodesInOrder; 
}