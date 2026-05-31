// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
    updateEdge,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    lastSelected: null,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      const lastSelectedChange = [...changes].reverse().find(
        (c) => c.type === "select" && c.selected === true,
      );
      set({
        nodes: applyNodeChanges(changes, get().nodes),
        lastSelected: lastSelectedChange
          ? { type: "node", id: lastSelectedChange.id }
          : get().lastSelected,
      });
    },
    onEdgesChange: (changes) => {
      const lastSelectedChange = [...changes].reverse().find(
        (c) => c.type === "select" && c.selected === true,
      );
      set({
        edges: applyEdgeChanges(changes, get().edges),
        lastSelected: lastSelectedChange
          ? { type: "edge", id: lastSelectedChange.id }
          : get().lastSelected,
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    onEdgeUpdate: (oldEdge, newConnection) => {
      set({
        edges: updateEdge(oldEdge, newConnection, get().edges),
      });
    },
    deleteLatestSelected: () => {
      const { lastSelected } = get();
      if (!lastSelected) return;

      if (lastSelected.type === "edge") {
        const edge = get().edges.find((e) => e.id === lastSelected.id);
        if (!edge?.selected) return;
        set({ edges: get().edges.filter((e) => e.id !== lastSelected.id) });
        return;
      }

      const node = get().nodes.find((n) => n.id === lastSelected.id);
      if (!node?.selected) return;

      set({
        nodes: get().nodes.filter((n) => n.id !== lastSelected.id),
        edges: get().edges.filter(
          (e) => e.source !== lastSelected.id && e.target !== lastSelected.id,
        ),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
