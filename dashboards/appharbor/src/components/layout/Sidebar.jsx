// Sidebar.jsx
import React from "react";

const Sidebar = ({ active, onSelect }) => {
  const menuItems = [
    { id: "containers", label: "Containers", icon: "🐳" },
    { id: "images", label: "Images", icon: "📦" },
    { id: "volumes", label: "Volumes", icon: "💾" },
    { id: "networks", label: "Networks", icon: "🌐" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        Docker Dashboard
      </div>

      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item.id}
            className={`sidebar-item ${active === item.id ? "active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
