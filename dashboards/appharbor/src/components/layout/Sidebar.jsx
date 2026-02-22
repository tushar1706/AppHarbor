// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
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
          key={item.id} className="sidebar-item"
          >
            <NavLink
              to={`/${item.id}`}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
