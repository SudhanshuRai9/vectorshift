import { Handle } from "reactflow";

export const BaseNode = ({
  id,
  label,
  children,
  handles = [],
  className,
  style,
}) => {
  return (
    <div
      className={["vs-node", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className="vs-node__header">{label}</div>
      <div className="vs-node__body">{children}</div>

      {handles.map((h, index) => (
        <Handle
          key={`${id}-${index}`}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          className="vs-handle"
          style={h.style}
        />
      ))}
    </div>
  );
};
