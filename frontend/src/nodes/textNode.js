// textNode.js

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

const extractVariables = (text) => {
  const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const seen = new Set();
  const vars = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(currText), [currText]);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [currText]);

  const longestLineLength = useMemo(() => {
    const lines = currText.split("\n");
    return lines.reduce((maxLen, line) => Math.max(maxLen, line.length), 0);
  }, [currText]);

  const nodeWidthPx = clamp(220 + longestLineLength * 6, 220, 520);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const variableHandles = variables.map((name, index) => {
    const top = `${((index + 1) / (variables.length + 1)) * 100}%`;
    return { type: "target", position: Position.Left, id: name, style: { top } };
  });

  const variableKey = useMemo(() => variables.join("|"), [variables]);

  // ReactFlow caches handle bounds; when we add/remove handles dynamically we must
  // tell it to re-measure this node.
  useLayoutEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variableKey]);

  return (
    <BaseNode
      id={id}
      label="Text"
      style={{ width: nodeWidthPx }}
      handles={[
        ...variableHandles,
        {
          type: "source",
          position: Position.Right,
          id: "output",
          style: { top: "50%" },
        },
      ]}
    >
      <label className="vs-field">
        <span className="vs-field__label">Text</span>
        <textarea
          ref={textareaRef}
          className="vs-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          placeholder="Type text. Use {{variable}} to create inputs."
        />
      </label>
      <div className="vs-help">
        Variables:{" "}
        {variables.length ? variables.map((v) => `{{${v}}}`).join(", ") : "none"}
      </div>
    </BaseNode>
  );
};
