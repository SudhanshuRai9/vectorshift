// textNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Text"
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: "output",
          style: { top: "50%" },
        },
      ]}
    >
      <label
        style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}
      >
        Text:
        <input
          type="text"
          value={currText}
          onChange={handleTextChange}
          style={{ marginTop: "5px" }}
        />
      </label>
    </BaseNode>
  );
};
