// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, ControlButton, Controls, MiniMap } from "reactflow";
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MergeNode } from "./nodes/mergeNode";
import { TransformNode } from "./nodes/transformNode";
import { DelayNode } from "./nodes/delayNode";
import { ConditionNode } from "./nodes/conditionNode";
import { TemplateNode } from "./nodes/templateNode";

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  merge: MergeNode,
  transform: TransformNode,
  delay: DelayNode,
  condition: ConditionNode,
  template: TemplateNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgeUpdate: state.onEdgeUpdate,
  lastSelected: state.lastSelected,
  deleteLatestSelected: state.deleteLatestSelected,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onEdgeUpdate,
      lastSelected,
      deleteLatestSelected,
    } = useStore(selector, shallow);

    const canDeleteLatest = useMemo(() => {
      if (!lastSelected) return false;
      if (lastSelected.type === "node") {
        return nodes.some((n) => n.id === lastSelected.id && n.selected);
      }
      return edges.some((e) => e.id === lastSelected.id && e.selected);
    }, [edges, lastSelected, nodes]);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                edgesUpdatable
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls position="top-right" showInteractive>
                  <ControlButton
                    onClick={deleteLatestSelected}
                    disabled={!canDeleteLatest}
                    title="Delete selected"
                    aria-label="delete selected"
                    className="react-flow__controls-delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v10h-2V9zm4 0h2v10h-2V9zM7 9h2v10H7V9z"
                        fill="currentColor"
                      />
                    </svg>
                  </ControlButton>
                </Controls>
                <MiniMap position="bottom-right" />
            </ReactFlow>
        </div>
        </>
    )
}
