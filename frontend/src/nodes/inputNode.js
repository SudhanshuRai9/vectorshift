// inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
      handles={[
        {
          type: "source",
          position: Position.Right,
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
          value={inputType}
          onChange={handleTypeChange}
          style={{ marginTop: "5px" }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
