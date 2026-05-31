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
      <label className="vs-field">
        <span className="vs-field__label">Name</span>
        <input
          className="vs-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </label>
      <label className="vs-field">
        <span className="vs-field__label">Type</span>
        <select
          className="vs-select"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
