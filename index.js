/*********************************************************************Version 0.1*************************************************************************************/
// document.querySelector("#astar").addEventListener("click", algoAstarCaller);
// document.querySelector("#dijkstra").addEventListener("click", algoDijkstraCaller);
// var startX = 11;
// var startY = 14;
// var startID = `#cell_${startX}_${startY}`;
// var endX = 11;
// var endY = 44;
// var endID = `#cell_${endX}_${endY}`;
// function addWalls(e) {
//     console.log(e);
// }
// /*********************************************************************************************************************/
// class PriorityQueue {
//     constructor() {
//         this.collection = [];
//     }
//     enqueue(element) {
//         if(this.isEmpty()) {
//             this.collection.push(element);
//         }
//         else {
//             let added = false;
//             for(let i = 1; i <= this.collection.length; i++) {
//                 if(element[1] < this.collection[i-1][1]) {
//                     this.collection.splice(i-1, 0, element);
//                     added = true;
//                     break;
//                 }
//             }
//             if(!added) {
//                 this.collection.push(element);
//             }
//         }
//     };
//     dequeue() {
//         let value = this.collection.shift();
//         return value;
//     };
//     isEmpty() {
//         return (this.collection.length === 0);
//     }
// }
// class Graph {
//     constructor(walls) {
//         this.width = 60;
//         this.height = 24;
//         this.walls = walls; 
//     }
//     inBounds(x, y) {
//         return ( (x >= 0 && x < this.height) && (y >= 0 && y < this.width) ); 
//     }
//     isPassable(x, y) {
//         for(let i = 0; i < this.walls.length; i++) if(walls[i][0] == x && walls[i][1] == y) return false;
//         return true;
//     }
//     getNeighbours(x, y) {
//         var neighbours = [[x+1,y], [x,y-1], [x-1,y], [x,y+1]];
//         neighbours = neighbours.filter(neighbour => this.inBounds(neighbour[0], neighbour[1]));
//         //neighbours = neighbours.filter(neighbour => this.isPassable(neighbour[0], neighbour[1]));
//         return neighbours;
//     }
// }
// function Dijkstra(graph, start, end) {
//     var prioQueue = new PriorityQueue();
//     var came_from = new Map();
//     var cost_so_far = new Map();
//     came_from.set(start[0] + " " + start[1], null);
//     cost_so_far.set(start[0] + " " + start[1], 0);
//     prioQueue.enqueue([start[0] + " " + start[1], 0]);
//     while(!prioQueue.isEmpty()) {
//         var current = prioQueue.dequeue();
//         var coord = current[0].split(" ");
//         coord[0] = parseInt(coord[0]);
//         coord[1] = parseInt(coord[1]);   
//         let id = `#cell_${coord[0]}_${coord[1]}`;
//         document.querySelector(id).className = "visited";
//         if (coord[0] == end[0] && coord[1] == end[1]) {
//             break;
//         }
//         var neighbours = graph.getNeighbours(coord[0], coord[1]);
//         var neighbours = graph.getNeighbours(coord[0], coord[1]);
//         neighbours.forEach(next => {
//             let new_cost = cost_so_far.get(current[0]) + 1;
//             let c = next[0] + " " + next[1];
//             if ( cost_so_far.has(c) === false ||  new_cost < cost_so_far.get(c)) {
//                 cost_so_far.set(c, new_cost);
//                 let priority = new_cost;
//                 prioQueue.enqueue([c, priority]);
//                 came_from.set(c, coord);
//             }
//         });
//     }
// }
// function potentialFunction(a, b) {
//     var potential =  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
//     return potential;
// }
// function Astar(graph, start, end) {
//     var prioQueue = new PriorityQueue();
//     var came_from = new Map();
//     var cost_so_far = new Map();
//     came_from.set(start[0] + " " + start[1], null);
//     cost_so_far.set(start[0] + " " + start[1], 0);
//     prioQueue.enqueue([start[0] + " " + start[1], 0]);
//     while(!prioQueue.isEmpty()) {
//         var current = prioQueue.dequeue();
//         var coord = current[0].split(" ");
//         coord[0] = parseInt(coord[0]);
//         coord[1] = parseInt(coord[1]);        
//         var id = `#cell_${coord[0]}_${coord[1]}`;
//         document.querySelector(id).className = "visited";
//         if (coord[0] == end[0] && coord[1] == end[1]) {
//             break;
//         }
//         var neighbours = graph.getNeighbours(coord[0], coord[1]);
//         neighbours.forEach(next => {
//             let new_cost = cost_so_far.get(current[0]) + 1;
//             let c = next[0] + " " + next[1];
//             if ( cost_so_far.has(c) === false ||  new_cost < cost_so_far.get(c)) {
//                 cost_so_far.set(c, new_cost);
//                 let priority = new_cost + potentialFunction(end, next);
//                 prioQueue.enqueue([c, priority]);
//                 came_from.set(c, current);
//             }
//         });
//     }
// }
// /************************************************************************************************************************************/
// function algoAstarCaller() {
//     var c = document.getElementsByClassName("visited");
//     var len = c.length;
//     for(var i = 0; i < len; i++) document.querySelector(`#${c[0].id}`).className="unvisited";
//     var start = document.querySelector(startID);
//     start.className = "start";
//     var end = document.querySelector(endID);
//     end.className = "end";
//     var source = document.querySelector('.start');
//     var terminate = document.querySelector('.end');
//     var x1,y1,x2,y2;
//     x1 = source.id.substring(5, 7);
//     y1 = source.id.substring(8);
//     x2 = terminate.id.substring(5, 7);
//     y2 = terminate.id.substring(8);
//     var graph = new Graph([]);
//     var a = [x1, y1];
//     var b = [x2, y2];
//     Astar(graph, a, b);
// }
// function algoDijkstraCaller() {
//     var c = document.getElementsByClassName("visited");
//     var len = c.length;
//     for(var i = 0; i < len; i++) document.querySelector(`#${c[0].id}`).className="unvisited";
//     var start = document.querySelector(startID);
//     start.className = "start";
//     var end = document.querySelector(endID);
//     end.className = "end";   
//     var source = document.querySelector('.start');
//     var terminate = document.querySelector('.end');
//     var x1,y1,x2,y2;
//     x1 = source.id.substring(5, 7);
//     y1 = source.id.substring(8);
//     x2 = terminate.id.substring(5, 7);
//     y2 = terminate.id.substring(8);
//     var graph = new Graph([]);
//     var a = [x1, y1];
//     var b = [x2, y2];
//     Dijkstra(graph, a, b);
// }
// function init() {
//     var start = document.querySelector(startID);
//     start.className = "start";
//     var startIcon = document.createElement("i");
//     startIcon.className = "fas fa-chevron-right";
//     start.appendChild(startIcon);
//     var end = document.querySelector(endID);
//     end.className = "end";
//     var endIcon = document.createElement("i");
//     endIcon.className = "fas fa-bullseye";
//     end.appendChild(endIcon);
// }
// init();
/******************************************************************Version 0.2**************************************************************************************/
class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.source = null;
        this.destination = null;
        this.gridArray = [];
        this.nodes = {};
        this.visitedNodes = [];
        this.shortestPathNodes = [];
        this.buttonsOn = false;
        this.mouseDown = false;
        this.pressedNodeStatus = "normal";
        this.previouslySwitchedNode = null;
        this.previouslyPressedNodeStatus = null;
        this.algoDone = false;
        this.algorithmName = null;
    }

    intialise() {
        this.createGrid();
        this.addEventListeners();
    }

    createGrid() {
        let gridHTML = "";
        for (let r = 0; r < this.height; r++) {
            let currentArrayRow = [];
            let currentHTMLRow = `<div id="row_${r}" class="row">`;
            for (let c = 0; c < this.width; c++) {
                let newNodeID = `cell_${r}_${c}`, newNodeClass, newNode;
                if (r === Math.floor(this.height / 2) && c === Math.floor(this.width / 4)) {
                    newNodeClass = "source";
                    this.source = `${newNodeID}`;
                }
                else if (r === Math.floor(this.height / 2) && c === Math.floor(3 * this.width / 4)) {
                    newNodeClass = "destination";
                    this.destination = `${newNodeID}`;
                }
                else {
                    newNodeClass = "unvisited";
                }
                newNode = new Node(newNodeID, newNodeClass);
                currentArrayRow.push(newNode);
                currentHTMLRow += `<div id="${newNodeID}" class="${newNodeClass}"></div>`;
                this.nodes[`${newNodeID}`] = newNode;
            }
            this.gridArray.push(currentArrayRow);
            currentHTMLRow += "</div>";
            gridHTML += currentHTMLRow;
        }
        let grid = document.getElementById("grid");
        grid.innerHTML = gridHTML;
    }

    addEventListeners() {
        let grid = this;
        for (let r = 0; r < grid.height; r++) {
            for (let c = 0; c < grid.width; c++) {
                let currentID = `cell_${r}_${c}`;
                let currentNode = grid.getNode(currentID);
                let currentElement = document.getElementById(currentID);
                currentElement.onmousedown = (e) => {
                    e.preventDefault();
                    grid.mouseDown = true;
                    if (currentNode.status !== "source" && currentNode.status !== "destination") {
                        currentElement.className = currentNode.status !== "wall" ? "wall" : "unvisited";
                        currentNode.status = currentElement.className !== "wall" ? "unvisited" : "wall";
                    }
                    grid.pressedNodeStatus = currentNode.status;
                };

                currentElement.onmouseup = () => {
                    grid.mouseDown = false;
                    if (grid.pressedNodeStatus === "source") {
                        grid.source = currentID;
                    }
                    else if (grid.pressedNodeStatus === "destination") {
                        grid.destination = currentID;
                    }
                    grid.pressedNodeStatus = "normal";
                };

                currentElement.onmouseenter = () => {
                    if (grid.mouseDown && (grid.pressedNodeStatus === "source" || grid.pressedNodeStatus === "destination" )) {
                        grid.changeTerminalNodes(currentNode);
                        if (grid.pressedNodeStatus === "destination") {
                            grid.destination = currentID;
                            if(grid.algoDone) {
                                grid.redoAlgorithm();
                            }
                        }
                        else if (grid.pressedNodeStatus === "source") {
                            grid.source = currentID;
                            if(grid.algoDone) {
                                grid.redoAlgorithm();
                            }
                        }
                    }
                    else if (grid.mouseDown) {
                        if (currentNode.status !== "source" && currentNode.status !== "destination") {
                            if (this.pressedNodeStatus === "wall" || this.pressedNodeStatus === "unvisited") {
                                currentElement.className = grid.pressedNodeStatus;
                                currentNode.status = currentElement.className !== "wall" ? "unvisited" : "wall";
                            }
                        }
                    }
                };

                currentElement.onmouseleave = () => {
                    if (grid.mouseDown && (grid.pressedNodeStatus === "source" || grid.pressedNodeStatus === "destination")) {
                        grid.changeTerminalNodes(currentNode);
                    }
                };
            }
        }
    }

    changeTerminalNodes(currentNode) {
        let element = document.getElementById(currentNode.id), previousElement;
        if (this.previouslySwitchedNode)
            previousElement = document.getElementById(this.previouslySwitchedNode.id);

        if (currentNode.status !== "source" && currentNode.status !== "destination") {
            if(this.previouslySwitchedNode)
            {
                console.log(previousElement);
                this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
                previousElement.className = this.previouslyPressedNodeStatus;
                this.previouslySwitchedNode = null;
                this.previouslyPressedNodeStatus = currentNode.status;
                element.className = this.pressedNodeStatus;
                currentNode.status = this.pressedNodeStatus;
            }
        }

        else if (currentNode.status !== this.pressedNodeStatus) {
            this.previouslySwitchedNode.status = this.pressedNodeStatus;
            previousElement.className = this.pressedNodeStatus;
        } 

        else {
            this.previouslySwitchedNode = currentNode;
            element.className = !this.previouslyPressedNodeStatus ? "unvisited" : this.previouslyPressedNodeStatus;
            currentNode.status = this.previouslyPressedNodeStatus;
        }
    }

    getNode(id) {
        let coordinates = id.split("_");
        let r = parseInt(coordinates[1]);
        let c = parseInt(coordinates[2]);
        return this.gridArray[r][c];
    }

    inBounds(r, c) {
        return ( (r >= 0 && r < this.height) && (c >= 0 && c < this.width) ); 
    }

    isPassable(r, c) {
        let id = `cell_${r}_${c}`;
        if(this.getNode(id).status === "wall") return false;
        return true;
    }

    getNeighbours(nodeId) {
        let coord = nodeId.split("_");
        let r = parseInt(coord[1]), c = parseInt(coord[2]);
        var neighbours = [[r,c+1], [r+1,c], [r,c-1], [r-1,c]];
        
        neighbours = neighbours.filter(neighbour => this.inBounds(neighbour[0], neighbour[1]));
        neighbours = neighbours.filter(neighbour => this.isPassable(neighbour[0], neighbour[1]));
        
        for(let i = 0; i < neighbours.length; i++)
            neighbours[i] = `cell_${neighbours[i][0]}_${neighbours[i][1]}`;

        return neighbours;
    }

    redoAlgorithm () {
        this.clearVisitedNodes();
        this.clearShortestPath();
        this.instantAlgorithm();
    }

    instantAlgorithm() {
        if(this.algorithmName === "Astar")
        {
            astar(this.source, this.destination, this);
            getShortestPath(this);
            drawVisitedNodes(this);
            drawShortestPath(this);
        }
        else if(this.algorithmName === "Dijkstra")
        {
            Dijkstra(this, this.source);
            getShortestPath(this);
            drawVisitedNodes(this);
            drawShortestPath(this);
        }
    }

    clearVisitedNodes() {
        let Grid = this;
        let len = Grid.visitedNodes.length;
        for(let i = 0; i < len; i++)
        {
            let currentId = Grid.visitedNodes[Grid.visitedNodes.length -  1];
            if(Grid.getNode(currentId).status !== "wall") document.getElementById(currentId).className = "unvisited";
            Grid.visitedNodes.pop();
        }
    }
    
    clearShortestPath() {
        let Grid = this;
        let len = Grid.shortestPathNodes.length;
        for(let i = 0; i < len; i++)
        {
            let currentId = Grid.shortestPathNodes[Grid.shortestPathNodes.length - 1];
            Grid.getNode(currentId).previousNode = null;
            if(Grid.getNode(currentId).status !== "wall") document.getElementById(currentId).className = "unvisited";
            Grid.shortestPathNodes.pop();
        }
    }
    
    clearWalls() {
        let Grid = this;
        let nodeIds = Object.keys(Grid.nodes);
        nodeIds.forEach(nodeId => {
            let node = Grid.getNode(nodeId);
            if(node.status === "wall")
            {
                document.getElementById(nodeId).className = "unvisited";
                node.status = "unvisited";
            }
        });
    }
}

var Node = function (id, status) {
    this.id = id;
    this.status = status;
    this.previousNode = null;
};

/* *******************************************************************************Priority Queue********************************************************************** */
/* *MIN_HEAP* */

// class PriorityQueue {
//     constructor() {
//         this.queue = [];
//     }

//     getParent(i) {
//         return Math.floor((i - 1) / 2);
//     }

//     getLeft(i) {
//         return (2 * i + 1);
//     }

//     getRight(i) {
//         return (2 * i + 2);
//     }

//     isEmpty() {
//         return (this.queue.length === 0);
//     }

//     minHeapify(i) {
//         let len = this.queue.length;
//         let l = this.getLeft(i);
//         let r = this.getRight(i);
//         let smallest = i;

//         if (l < len && this.queue[l][1] < this.queue[i][1])
//             smallest = l;

//         if (r < len && this.queue[r][1] < this.queue[smallest][1])
//             smallest = r;

//         if (smallest !== i) {
//             let temp = this.queue[smallest][0];
//             this.queue[smallest][0] = this.queue[i][0];
//             this.queue[i][0] = temp;

//             let temp2 = this.queue[smallest][1];
//             this.queue[smallest][1] = this.queue[i][1];
//             this.queue[i][1] = temp2;

//             this.minHeapify(smallest);
//         }
//     }

//     enqueue(element) {
//         this.queue.push(element);
//         let len = this.queue.length;
//         let i = len - 1;
    
//         while (i > 0 && this.queue[this.getParent(i)][1] > this.queue[i][1]) {
//             let temp = this.queue[this.getParent(i)][0];
//             this.queue[this.getParent(i)][0] = this.queue[i][0];
//             this.queue[i][0] = temp;

//             let temp2 = this.queue[this.getParent(i)][1];
//             this.queue[this.getParent(i)][1] = this.queue[i][1];
//             this.queue[i][1] = temp2;
            
//             i = this.getParent(i);
//         }
//     }

//     getMin() {
//         if (!this.isEmpty()) {
//             let node = this.queue.shift()[0];
//             this.minHeapify(0);
//             return node;
//         }
//     }
// }

class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(element) {
        if(this.isEmpty()) {
            this.queue.push(element);
        }
        else {
            let added = false;
            for(let i = 1; i <= this.queue.length; i++) {
                if(element[1] < this.queue[i-1][1]) {
                    this.queue.splice(i-1, 0, element);
                    added = true;
                    break;
                }
            }
            if(!added) {
                this.queue.push(element);
            }
        }
    };
    getMin() {
        let node = this.queue.shift();
        return node[0];
    };
    isEmpty() {
        return (this.queue.length === 0);
    };
}

/* ***************************************************************************************ASTAR*********************************************************************** */

function ManhattanDistance(nodeId, target) {
    let coord1 = nodeId.split("_");
    let coord2 = target.split("_");
    
    let x1 = parseInt(coord1[1]);
    let y1 = parseInt(coord1[2]);
    let x2 = parseInt(coord2[1]);
    let y2 = parseInt(coord2[2]);

    let potential = Math.abs(x1 - x2) + Math.abs(y1 - y2);

    return Math.pow(potential, 7); 
};

function astar (start, target, Grid) {
    var prioQueue = new PriorityQueue();
    var cost_so_far = new Map();

    cost_so_far.set(start, 0);
    prioQueue.enqueue([start, 0]);

    while(!prioQueue.isEmpty())
    {
        let current = prioQueue.getMin();
        
        if(Grid.getNode(current).status === "destination") break;
        if(current !== start) Grid.visitedNodes.push(current);
        
        let neighbours = Grid.getNeighbours(current);
        neighbours.forEach(next => {
            let newCost = cost_so_far.get(current) + 1;

            if(cost_so_far.has(next) === false || newCost < cost_so_far.get(next)) 
            {
                cost_so_far.set(next, newCost);
                let priority = newCost + ManhattanDistance(next, target);
                prioQueue.enqueue([next, priority]);
                Grid.getNode(next).previousNode = Grid.getNode(current);
            }
        });
    }
} 

function Dijkstra(Grid, start) {
    var prioQueue = new PriorityQueue();
    var cost_so_far = new Map();

    cost_so_far.set(start, 0);
    prioQueue.enqueue([start, 0]);

    while(!prioQueue.isEmpty()) 
    {
        let current = prioQueue.getMin();
        
        if (Grid.getNode(current).status === "destination") break;
        if(current !== start) Grid.visitedNodes.push(current);
        
        let neighbours = Grid.getNeighbours(current);
        neighbours.forEach(next => {
            let newCost = cost_so_far.get(current) + 1;

            if(cost_so_far.has(next) === false || newCost < cost_so_far.get(next)) 
            {
                cost_so_far.set(next, newCost);
                prioQueue.enqueue([next, newCost]);
                Grid.getNode(next).previousNode = Grid.getNode(current);
            }
        });
    }
}

function getShortestPath(Grid) {
    let previous = Grid.getNode(Grid.destination).previousNode;
    Grid.getNode(Grid.destination).previousNode = null;
    if(previous === null) return;
    while(previous.status !== "source")
    {
        Grid.shortestPathNodes.push(previous.id);
        previous = previous.previousNode;
    }
}

function drawVisitedNodes(Grid) {
    document.getElementById(Grid.source).className = "source";
    document.getElementById(Grid.destination).className = "destination";
    for(let i = 0; i < Grid.visitedNodes.length; i++)
    {
        let currentNodeID = Grid.visitedNodes[i];
        if(Grid.source === currentNodeID || Grid.destination === currentNodeID) continue;
        document.getElementById(currentNodeID).className = "visited";
    }
}

function drawShortestPath(Grid) {
    for(let i = 0; i < Grid.shortestPathNodes.length; i++)
    {
        let currentID = Grid.shortestPathNodes[i];
        document.getElementById(currentID).className = "shortestPathNode";
    }
}

/* *********************************************************************Intialization*********************************************************************** */

let width = 63;
let height = 24;
let newGrid = new Grid(width, height);
newGrid.intialise();

document.querySelector("#astar").addEventListener("click", algoAstarCaller);
document.querySelector("#dijkstra").addEventListener("click", algoDijkstraCaller);
document.querySelector("#clear_grid").addEventListener("click", function() {
    newGrid.clearShortestPath();
    newGrid.clearVisitedNodes();
    newGrid.clearWalls();
    newGrid.clearNodeStatuses();
    newGrid.algoDone = false;
});

function algoAstarCaller() {
    newGrid.algorithmName = "Astar";
    newGrid.clearShortestPath();
    newGrid.clearVisitedNodes();
    newGrid.algoDone = false;

    astar(newGrid.source, newGrid.destination, newGrid);
    
    newGrid.algoDone = true;
    getShortestPath(newGrid);
    drawVisitedNodes(newGrid);
    drawShortestPath(newGrid);
}

function algoDijkstraCaller() {
    newGrid.algorithmName = "Dijkstra";
    newGrid.clearShortestPath();
    newGrid.clearVisitedNodes();
    newGrid.algoDone = false;

    Dijkstra(newGrid, newGrid.source);
    
    newGrid.algoDone = true;
    getShortestPath(newGrid);
    drawVisitedNodes(newGrid);
    drawShortestPath(newGrid);
}
