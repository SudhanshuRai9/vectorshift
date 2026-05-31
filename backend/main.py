from collections import deque
from typing import Any, Dict, List, Set

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class ParsePipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)


class ParsePipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def _is_dag(node_ids: Set[str], edges: List[Dict[str, Any]]) -> bool:
    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    indegree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if not isinstance(source, str) or not isinstance(target, str):
            return False
        if source not in node_ids or target not in node_ids:
            return False
        if source == target:
            return False

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque([n for n, d in indegree.items() if d == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adjacency[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.post("/pipelines/parse", response_model=ParsePipelineResponse)
def parse_pipeline(payload: ParsePipelineRequest) -> ParsePipelineResponse:
    node_ids = {n.get("id") for n in payload.nodes if isinstance(n, dict)}
    node_ids = {n for n in node_ids if isinstance(n, str)}

    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    is_dag = _is_dag(node_ids, payload.edges)

    return ParsePipelineResponse(num_nodes=num_nodes, num_edges=num_edges, is_dag=is_dag)
