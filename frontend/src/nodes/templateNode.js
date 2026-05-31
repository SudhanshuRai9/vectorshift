import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TemplateNode = ({ id, data }) => {
  const [template, setTemplate] = useState(
    data?.template || "Hello {{name}}, your order {{orderId}} is ready.",
  );

  return (
    <BaseNode
      id={id}
      label="Template"
      handles={[
        { type: "target", position: Position.Left, id: "name", style: { top: "35%" } },
        { type: "target", position: Position.Left, id: "orderId", style: { top: "65%" } },
        { type: "source", position: Position.Right, id: "out", style: { top: "50%" } },
      ]}
    >
      <label className="vs-field">
        <span className="vs-field__label">Template</span>
        <textarea
          className="vs-textarea"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          rows={3}
        />
      </label>
      <div className="vs-help">Fills a string using inputs.</div>
    </BaseNode>
  );
};

