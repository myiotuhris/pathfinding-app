export function djikstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const unvisitedNodes=[];
    for(const row of grid){
      for(const node of row){
        unvisitedNodes.push(node);
      }
    }
    startNode.distance = 0;
    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      const row=closestNode.row;
      const col=closestNode.col;
      let neighbour;
      if(col<grid[0].length-1){
        neighbour=grid[row][col+1];
        if(!neighbour.isVisited) {
          neighbour.prevNode=closestNode;
          neighbour.distance=closestNode.distance+1;}

      }
      if(row<grid.length-1){
        neighbour=grid[row+1][col];
        if(!neighbour.isVisited) {neighbour.prevNode=closestNode;
          neighbour.distance=closestNode.distance+1;}

      }
      if(col>0){
        neighbour=grid[row][col-1];
        if(!neighbour.isVisited) {neighbour.prevNode=closestNode;
          neighbour.distance=closestNode.distance+1;}

      }
      if(row>0){
        neighbour=grid[row-1][col];
        if(!neighbour.isVisited) {neighbour.prevNode=closestNode;
          neighbour.distance=closestNode.distance+1;}

      }
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
