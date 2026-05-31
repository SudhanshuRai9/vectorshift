import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || "x > 0");

  return (
    <BaseNode
      id={id}
      label="Condition"
      handles={[
        { type: "target", position: Position.Left, id: "in", style: { top: "50%" } },
        { type: "source", position: Position.Right, id: "true", style: { top: "35%" } },
        { type: "source", position: Position.Right, id: "false", style: { top: "65%" } },
      ]}
    >
      <label className="vs-field">
        <span className="vs-field__label">Expression</span>
        <input
          className="vs-input"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. count > 10"
        />
      </label>
      <div className="vs-help">Routes input to “true” or “false”.</div>
    </BaseNode>
  );
};

