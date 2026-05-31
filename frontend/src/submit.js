// submit.js

import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { nodes, edges } = useStore((s) => ({ nodes: s.nodes, edges: s.edges }));

    const onSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Request failed (${res.status}): ${text}`);
            }

            const data = await res.json();
            alert(
                `Pipeline parsed!\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag ? "Yes" : "No"}`,
            );
        } catch (err) {
            alert(`Submit failed: ${err?.message || String(err)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="vs-submitbar">
            <button className="vs-button" type="button" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}
