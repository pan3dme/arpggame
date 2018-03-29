
declare class Graph {

    constructor(a: Array<any>);
    public grid: Array<Array<any>>
    public graph: any
    public diagonal:boolean
}
declare class astar {
    public static search(graphData, start, end): Array<any>
}

