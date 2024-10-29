import React from "react";
import Collapsible from "./Collapsible";
import PaddingMarginConfig from "./PaddingMarginInterface";
import { useLayoutSettings } from "../hooks/useLayoutSettings";

const PropertiesPanel: React.FC = () => {
  const { data: layoutRes, isLoading, error } = useLayoutSettings();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="PropertiesPanel">
      <Collapsible title="Load examples">
        <p>Example content goes here.</p>
      </Collapsible>
      <Collapsible title="Margins & Padding">
        <PaddingMarginConfig data={layoutRes.data} />
      </Collapsible>
      <Collapsible title="Size">
        <p>Size settings go here.</p>
      </Collapsible>
    </aside>
  );
};

export default PropertiesPanel;
