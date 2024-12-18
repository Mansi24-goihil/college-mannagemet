// menuData.js
const menuData = [
    {
      name: "Dashboard",
      path: "/dashboard",
      submenus: [],
    },
    {
      name: "Menu 1",
      path: "/menu1",
      submenus: [
        {
          name: "Submenu 1-1",
          subsubmenus: ["Subsubmenu 1-1-1", "Subsubmenu 1-1-2"],
        },
        {
          name: "Submenu 1-2",
          subsubmenus: [],
        },
        {
          name: "Submenu 1-3",
          subsubmenus: [],
        },
      ],
    },
    {
      name: "Menu 2",
      path: "/menu2",
      submenus: [
        {
          name: "Submenu 2-1",
          subsubmenus: ["Subsubmenu 2-1-1", "Subsubmenu 2-1-2"],
        },
        {
          name: "Submenu 2-2",
          subsubmenus: [],
        },
      ],
    },
    {
      name: "Profile",
      path: "/profile",
      submenus: [
        {
            name: "Submenu 3-1",
            subsubmenus: [],
          },
      ],
    },
    {
      name: "Settings",
      path: "/settings",
      submenus: [],
    },
  ];
  
  export default menuData;
  