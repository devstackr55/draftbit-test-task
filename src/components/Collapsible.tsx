import React, { useState, ReactNode } from "react";
import "./PropertiesPanel.css";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    console.log("runn");
    setCollapsed((prev) => !prev);
  };

  return (
    <section className="Collapsible">
      <button className="Collapsible-button" onClick={toggleCollapse}>
        <span>{title}</span>
        <span>{collapsed ? "+" : "-"}</span>
      </button>
      {!collapsed && <div className="Collapsible-content">{children}</div>}
    </section>
  );
};

export default Collapsible;
