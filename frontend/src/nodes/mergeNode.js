import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="Merge"
      handles={[
        { type: "target", position: Position.Left, id: "a", style: { top: "35%" } },
        { type: "target", position: Position.Left, id: "b", style: { top: "65%" } },
        { type: "source", position: Position.Right, id: "out", style: { top: "50%" } },
      ]}
    >
      <div className="vs-help">Combines inputs A + B into one output.</div>
    </BaseNode>
  );
};

