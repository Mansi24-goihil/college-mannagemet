import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // For menu toggle icons
import menuData from "./menuData"; // Import menu data

const Sidebar = () => {
  // State to handle opening and closing of menus and submenus
  const [openSubMenus, setOpenSubMenus] = useState(
    menuData.reduce((acc, menu, index) => {
      acc[index] = false; // Initialize all menu states as false
      return acc;
    }, {})
  );
  const [openSubSubMenus, setOpenSubSubMenus] = useState({});

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubSubMenu = (index) => {
    setOpenSubSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="h-screen bg-gray-900 text-white w-64 shadow-lg transition-transform transform">
      <div className="p-6 text-2xl font-semibold text-center bg-gray-800 border-b border-gray-700 shadow-lg">
        My Sidebar
      </div>
      <ul className="space-y-2 py-4">
        {menuData.map((menu, menuIndex) => (
          <React.Fragment key={menuIndex}>
            {/* Main Menu Item */}
            <li
              className={`px-6 py-3 hover:bg-gray-700 rounded-lg cursor-pointer transition duration-300 ease-in-out transform ${
                openSubMenus[menuIndex] ? "bg-gray-700" : ""
              }`}
              onClick={() => menu.submenus.length > 0 && toggleSubMenu(menuIndex)}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{menu.name}</div>
                {menu.submenus.length > 0 && (
                  openSubMenus[menuIndex] ? (
                    <FaChevronUp className="text-sm text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-sm text-gray-400" />
                  )
                )}
              </div>
            </li>

            {/* Submenus */}
            {openSubMenus[menuIndex] && menu.submenus.length > 0 && (
              <ul className="pl-8 space-y-1 mt-2">
                {menu.submenus.map((submenu, submenuIndex) => (
                  <React.Fragment key={submenuIndex}>
                    <li
                      className={`px-6 py-2 hover:bg-gray-600 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                        openSubSubMenus[submenuIndex] ? "bg-gray-600" : ""
                      }`}
                      onClick={() => toggleSubSubMenu(submenuIndex)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg">{submenu.name}</div>
                        {submenu.subsubmenus.length > 0 && (
                          openSubSubMenus[submenuIndex] ? (
                            <FaChevronUp className="text-sm text-gray-400" />
                          ) : (
                            <FaChevronDown className="text-sm text-gray-400" />
                          )
                        )}
                      </div>
                    </li>

                    {/* Sub-submenus */}
                    {openSubSubMenus[submenuIndex] && submenu.subsubmenus.length > 0 && (
                      <ul className="pl-8 space-y-1 mt-2">
                        {submenu.subsubmenus.map((subsubmenu, subsubmenuIndex) => (
                          <li
                            key={subsubmenuIndex}
                            className="px-6 py-2 hover:bg-gray-500 rounded-lg cursor-pointer transition duration-200 ease-in-out"
                          >
                            {subsubmenu}
                          </li>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
