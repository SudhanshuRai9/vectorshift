import { Handle } from "reactflow";

export const BaseNode = ({ id, label, children, handles = [] }) => {
  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        border: "1px solid #777",
        borderRadius: "8px",
        background: "#fff",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #eee",
          paddingBottom: "5px",
        }}
      >
        {label}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>

      {handles.map((h, index) => (
        <Handle
          key={`${id}-${index}`}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          style={h.style}
        />
      ))}
    </div>
  );
};
