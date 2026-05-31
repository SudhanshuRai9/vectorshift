import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DelayNode = ({ id, data }) => {
  const [ms, setMs] = useState(data?.ms ?? 500);

  return (
    <BaseNode
      id={id}
      label="Delay"
      handles={[
        { type: "target", position: Position.Left, id: "in", style: { top: "50%" } },
        { type: "source", position: Position.Right, id: "out", style: { top: "50%" } },
      ]}
    >
      <label className="vs-field">
        <span className="vs-field__label">Milliseconds</span>
        <input
          className="vs-input"
          type="number"
          min={0}
          step={50}
          value={ms}
          onChange={(e) => setMs(Number(e.target.value))}
        />
      </label>
      <div className="vs-help">Simulates waiting before passing data through.</div>
    </BaseNode>
  );
};

