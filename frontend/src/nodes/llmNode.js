// llmNode.js

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "system",
          style: { top: `${100 / 3}%` },
        },
        {
          type: "target",
          position: Position.Left,
          id: "prompt",
          style: { top: `${200 / 3}%` },
        },
        {
          type: "source",
          position: Position.Right,
          id: "response",
          style: { top: "50%" },
        },
      ]}
    >
      <span style={{ fontSize: 12, color: "#444" }}>This is a LLM.</span>
    </BaseNode>
  );
};
