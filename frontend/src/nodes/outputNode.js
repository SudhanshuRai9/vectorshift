// outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Output"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "value",
          style: { top: "50%" },
        },
      ]}
    >
      <label
        style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}
      >
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ marginTop: "5px" }}
        />
      </label>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "12px",
          marginTop: "5px",
        }}
      >
        Type:
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{ marginTop: "5px" }}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
