class GraphSearch {
  static breadthFirstSearch(startId: number, targetId: number, edgeIds: Record<string, number[]>) {
    const queue = [[startId]];
    const visited = new Set();

    while (queue.length > 0) {
      const path = queue.shift()!;
      const currentPointId = path[path.length - 1];

      if (currentPointId === targetId) {
        return path;
      }

      if (!visited.has(currentPointId)) {
        const edges = edgeIds[currentPointId];
        
        for (let i = 0; i < edges.length; i++) {
          const neighborId = edges[i];
          if (!visited.has(neighborId)) {
            queue.push([...path, neighborId]);
          }
        }

        visited.add(currentPointId);
      }
    }
    return null;
  }
}
export default GraphSearch;