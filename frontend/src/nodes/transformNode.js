import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || "uppercase");

  return (
    <BaseNode
      id={id}
      label="Transform"
      handles={[
        { type: "target", position: Position.Left, id: "in", style: { top: "50%" } },
        { type: "source", position: Position.Right, id: "out", style: { top: "50%" } },
      ]}
    >
      <label className="vs-field">
        <span className="vs-field__label">Mode</span>
        <select className="vs-select" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
        </select>
      </label>
      <div className="vs-help">Applies a simple transformation to text.</div>
    </BaseNode>
  );
};

