import React from "react";
import Collapsible from "./Collapsible";
import PaddingMarginConfig from "./PaddingMarginInterface";

const PropertiesPanel: React.FC = () => {
  return (
    <aside className="PropertiesPanel">
      <Collapsible title="Load examples">
        <p>Example content goes here.</p>
      </Collapsible>
      <Collapsible title="Margins & Padding">
        <PaddingMarginConfig />
      </Collapsible>
      <Collapsible title="Size">
        <p>Size settings go here.</p>
      </Collapsible>
    </aside>
  );
};

export default PropertiesPanel;
