// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="vs-toolbar">
            <div className="vs-toolbar__grid">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type="merge" label="Merge" />
                <DraggableNode type="transform" label="Transform" />
                <DraggableNode type="delay" label="Delay" />
                <DraggableNode type="condition" label="Condition" />
                <DraggableNode type="template" label="Template" />
            </div>
        </div>
    );
};
