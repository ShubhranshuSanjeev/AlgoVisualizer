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
        this.buttonsOn = true;
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
                    if(this.buttonsOn)
                    {
                        grid.mouseDown = true;
                        if (currentNode.status !== "source" && currentNode.status !== "destination") {
                            currentElement.className = currentNode.status !== "wall" ? "wall" : "unvisited";
                            currentNode.status = currentElement.className !== "wall" ? "unvisited" : "wall";
                        }
                        grid.pressedNodeStatus = currentNode.status;
                    }
                };

                currentElement.onmouseup = () => {
                    if(this.buttonsOn)
                    {
                        grid.mouseDown = false;
                        if (grid.pressedNodeStatus === "source") {
                            grid.source = currentID;
                        }
                        else if (grid.pressedNodeStatus === "destination") {
                            grid.destination = currentID;
                        }
                        grid.pressedNodeStatus = "normal";
                    }
                };

                currentElement.onmouseenter = () => {
                    if(this.buttonsOn)
                    {
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
                    }
                };

                currentElement.onmouseleave = () => {
                    if(this.buttonsOn) {
                        if (grid.mouseDown && (grid.pressedNodeStatus === "source" || grid.pressedNodeStatus === "destination")) {
                            grid.changeTerminalNodes(currentNode);
                        }
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
                this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
                previousElement.className = this.previouslyPressedNodeStatus === "visited" ? "unvisited" : this.previouslyPressedNodeStatus;
                this.previouslySwitchedNode = null;
                this.previouslyPressedNodeStatus = currentNode.status;
                currentNode.status = this.pressedNodeStatus;
                element.className = currentNode.status;
            }
        }

        else if (currentNode.status !== this.pressedNodeStatus) {
            this.previouslySwitchedNode.status = this.pressedNodeStatus;
            previousElement.className = this.pressedNodeStatus;
        } 

        else if (currentNode.status === this.pressedNodeStatus) 
        {
            this.previouslySwitchedNode = currentNode;
            currentNode.status = this.previouslyPressedNodeStatus;
            element.className =  this.previouslyPressedNodeStatus;
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
        var neighbours = [[r-1,c], [r,c+1], [r+1,c], [r,c-1]];
        
        neighbours = neighbours.filter(neighbour => this.inBounds(neighbour[0], neighbour[1]));
        neighbours = neighbours.filter(neighbour => this.isPassable(neighbour[0], neighbour[1]));
        
        for(let i = 0; i < neighbours.length; i++)
            neighbours[i] = `cell_${neighbours[i][0]}_${neighbours[i][1]}`;

        return neighbours.reverse();
    }

    resetGrid () {
        this.shortestPathNodes = [];
        this.visitedNodes = [];

        Object.keys(this.nodes).forEach(node => {
            if(this.nodes[node].status === "visited") 
            {
                document.getElementById(this.nodes[node].id).className = "unvisited";
                this.nodes[node].status = "unvisited";
            }
            this.nodes[node].previousNode = null;
        });

        this.clearWalls();
    }

    clearPath() {
        this.shortestPathNodes = [];
        this.visitedNodes = [];

        Object.keys(this.nodes).forEach(node => {
            if(this.nodes[node].status === "visited") 
            {
                document.getElementById(this.nodes[node].id).className = "unvisited";
                this.nodes[node].status = "unvisited";
            }
            this.nodes[node].previousNode = null;
        });
    }

    redoAlgorithm () {
        this.clearPath();
        this.algoDone = false;
        this.instantAlgorithm();
    }

    instantAlgorithm() {
        if(this.algorithmName === "Astar")
            astar(this.source, this.destination, this);
        else if(this.algorithmName === "Dijkstra")
            Dijkstra(this, this.source);
        else if(this.algorithmName === "Dfs")
            dfs(this, this.source);
        else if(this.algorithmName === "Bfs")
            bfs(this, this.source);
        
        getShortestPath(this);
        launchInstantAnimations(this);
        this.algoDone = true;
    }
    
    clearWalls() {
        let nodeIds = Object.keys(this.nodes);
        nodeIds.forEach(nodeId => {
            let node = this.getNode(nodeId);
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

/* ***************************************************************************************Algorithms*********************************************************************** */

function ManhattanDistance(nodeId, target) {
    let coord1 = nodeId.split("_");
    let coord2 = target.split("_");
    
    let x1 = parseInt(coord1[1]);
    let y1 = parseInt(coord1[2]);
    let x2 = parseInt(coord2[1]);
    let y2 = parseInt(coord2[2]);

    let potential = Math.abs(x1 - x2) + Math.abs(y1 - y2);

    return Math.pow(potential,1); 
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
        if(current !== start) 
        {
            Grid.getNode(current).status = "visited";
            Grid.visitedNodes.push(current);
        }
        
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
        if(current !== start) 
        {
            Grid.getNode(current).status = "visited";
            Grid.visitedNodes.push(current);
        }
        
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

function dfs(Grid, start) {
    let stack = [start];
    let exploredNodes = new Map();
    exploredNodes.set(start, true);
    
    while (stack.length)
    {
        let currentNode = stack.pop();
        exploredNodes.set(currentNode, true);
        
        if (currentNode === Grid.destination) return;

        if(currentNode !== start)
        {
            Grid.visitedNodes.push(currentNode);
            Grid.getNode(currentNode).status = "visited";
        }
        let neighbours = Grid.getNeighbours(currentNode);
        
        neighbours.forEach(neighbour => {
            if (!exploredNodes.get(neighbour)) {
                Grid.getNode(neighbour).previousNode = Grid.getNode(currentNode);
                stack.push(neighbour);
            }
        });
    }
}

function bfs(Grid, start)
{
    let queue = [start];
    let exploredNodes = new Map();
    exploredNodes.set(start, true);
    
    while (queue.length)
    {
        let currentNode = queue.shift();

        if (currentNode === Grid.destination) return;

        if(currentNode !== start)
        {
            Grid.visitedNodes.push(currentNode);
            Grid.getNode(currentNode).status = "visited";
        }

        let neighbours = Grid.getNeighbours(currentNode);
        
        neighbours.forEach(neighbour => {
            if (!exploredNodes.get(neighbour)) {
                exploredNodes.set(neighbour, true);
                Grid.getNode(neighbour).previousNode = Grid.getNode(currentNode);
                queue.push(neighbour);
            }
        });
    }
}

/* *********************************************************************Launch Animations************************************************************************* */

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

function launchAnimations (index, Grid) {
    let speed = 0;
    Grid.shortestPathNodes.reverse(); 
    drawVisited(index);

    function drawVisited(index) {
        setTimeout( function () {
            if(index === Grid.visitedNodes.length) 
            { 
                setTimeout(() => drawShortestPath(0), 1200);
                return;
            }
            let currentNodeID = Grid.visitedNodes[index];
            let ele = document.getElementById(currentNodeID);
            ele.className = "visited";
            drawVisited(index + 1);
        }, speed);
    }

    function drawShortestPath(index) {
        setTimeout( function() {
            if (index === Grid.shortestPathNodes.length) 
            {
                Grid.algoDone = true;
                Grid.buttonsOn = true;
                return;
            }
            let currentID = Grid.shortestPathNodes[index];
            document.getElementById(currentID).className = "shortestPathNode";
            drawShortestPath(index + 1);
        }, 40);
    }
}

function launchInstantAnimations (Grid) {
    let len;
    len = Grid.visitedNodes.length;
    for(let i = 0; i < len; i++)
    {
        let currentNodeID = Grid.visitedNodes[i];
        document.getElementById(currentNodeID).className = "visitedInstant";
    }

    len = Grid.shortestPathNodes.length;
    for(let i = 0; i < len; i++)
    {
        let currentNodeID = Grid.shortestPathNodes[i];
        document.getElementById(currentNodeID).className = "shortestPathNodeInstant";
    }
}

/* *********************************************************************Intialization*********************************************************************** */

let width = 63;
let height = 25;
let newGrid = new Grid(width, height);
newGrid.intialise();

document.getElementById("astar").addEventListener("click", () => {
    newGrid.algorithmName = "Astar";
    newGrid.algoDone = false;
    document.getElementById("startBtn").innerHTML = "Visualize Astar";
});

document.getElementById("dijkstra").addEventListener("click", () => {
    newGrid.algorithmName = "Dijkstra"; 
    newGrid.algoDone = false;
    document.getElementById("startBtn").innerHTML = "Visualize Dijkstra";
});

document.getElementById("dfs").addEventListener("click", () => {
    newGrid.algorithmName = "Dfs";
    newGrid.algoDone = false;
    document.getElementById("startBtn").innerHTML = "Visualize Depth First Search";
});

document.getElementById("bfs").addEventListener("click", () => {
    newGrid.algorithmName = "Bfs";
    newGrid.algoDone = false;
    document.getElementById("startBtn").innerHTML = "Visualize Breadth First Search";
});

document.getElementById("startBtn").addEventListener("click", startVisualization);

document.getElementById("clear_path").addEventListener("click", function() {
    if(newGrid.buttonsOn)
    {
        newGrid.clearPath();
        newGrid.algoDone = false;   
    }

});
document.getElementById("clear_walls").addEventListener("click", function() {
    if(newGrid.buttonsOn)
    {
        newGrid.clearWalls();
        newGrid.algoDone = false;
    }
});
document.getElementById("reset_grid").addEventListener("click", function() {
    if(newGrid.buttonsOn)
    {
        newGrid.resetGrid();
        newGrid.algoDone = false;   
    }

});

function startVisualization () {
    if(newGrid.buttonsOn)
    {
        if(newGrid.algorithmName === null)
        {
            document.getElementById("startBtn").innerHTML = "Select an Algorithm"; 
        }
        else
        {
            newGrid.buttonsOn = false;
            newGrid.clearPath();
            if(newGrid.algorithmName === "Astar")
                astar(newGrid.source, newGrid.destination, newGrid);
            else if(newGrid.algorithmName === "Dijkstra")
                Dijkstra(newGrid, newGrid.source);
            else if(newGrid.algorithmName === "Dfs")
                dfs(newGrid, newGrid.source);
            else if(newGrid.algorithmName === "Bfs")
                bfs(newGrid, newGrid.source);
            getShortestPath(newGrid);
            launchAnimations(0, newGrid);
        }
    }
}