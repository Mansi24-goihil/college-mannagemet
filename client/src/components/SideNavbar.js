
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const Sidebar = ({ menus }) => {
//   const [openSubmenu, setOpenSubmenu] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to generate path dynamically based on menu and page names
//   const generatePath = (menuName, pageName) => {
//     // Define a base URL for each menu type
//     const basePaths = {
//       master: '/master',
//       teacher: '/teacher',
//       userAccount: '/user-account',
//       student: '/student',
//       student2: '/student2',
//     };

//     // Get the base path for the menu
//     const basePath = basePaths[menuName.toLowerCase()];

//     // Generate the full path by appending the page name
//     return basePath ? `${basePath}/${pageName.toLowerCase().replace(/ /g, '-')}` : '#';
//   };

//   const handleSubmenuClick = (path) => {
//     setOpenSubmenu('');
//     navigate(path);
//   };

//   const toggleSubmenu = (submenu) => {
//     setOpenSubmenu((prev) => (prev === submenu ? '' : submenu)); // Toggle submenu visibility
//   };

//   useEffect(() => {
//     // Retrieve menus from the passed state
//     if (location.state && location.state.menus) {
//       // Filter the menus where the status is true
//       const filteredMenus = location.state.menus.filter(menu => menu.status === true);
//       setMenus(filteredMenus);
//     }
//   }, [location]);

//   useEffect(() => {
//     // Retrieve menus from localStorage
//     const savedMenus = localStorage.getItem('menus');
//     if (savedMenus) {
//       const parsedMenus = JSON.parse(savedMenus); // Parse the menus from localStorage
//       setMenus(parsedMenus); // Set the menus state
//     }
//   }, []);

//   if (menus.length === 0) {
//     return <div>No menus available</div>;
//   }

//   return (
//     <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg">
//       <div className="flex items-center justify-center h-16 border-b border-gray-700">
//         <h1 className="text-xl font-bold">MyApp</h1>
//       </div>
//       <nav className="flex-grow">
//         <ul className="flex flex-col space-y-2 p-4">
//           {/* Loop through all menus */}
//           {menus.map((menu) => (
//             <li key={menu.name} className="relative">
//               <div
//                 className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-700"
//                 onClick={() => toggleSubmenu(menu.name)} // Toggle submenu when main menu clicked
//               >
//                 <span>{menu.name}</span>
//                 <span>{openSubmenu === menu.name ? '▼' : '►'}</span>
//               </div>
//               {openSubmenu === menu.name && (
//                 <ul className="ml-4">
//                   {/* Loop through submenu items (pages) */}
//                   {menu.pages && menu.pages.filter(page => page.status === true).map((page, subIndex) => {
//                     return (
//                       <li key={subIndex}>
//                         <Link
//                           to={generatePath(menu.name, page.name)} // Generate path dynamically
//                           className="block p-2 text-sm hover:bg-gray-700"
//                           onClick={() => handleSubmenuClick(generatePath(menu.name, page.name))} // Navigate to the generated path
//                         >
//                           {page.name}
//                         </Link>
//                         {/* Loop through submenus if they exist */}
//                         {page.submenus && page.submenus.filter(submenu => submenu.status === true).map((submenu, index) => (
//                           <ul key={index} className="ml-4">
//                             <li>
//                               <span>{submenu.name}</span>
//                             </li>
//                           </ul>
//                         ))}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const Sidebar = ({ menus }) => {
//   const [openSubmenu, setOpenSubmenu] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to generate path dynamically based on menu and page names
//   const generatePath = (menuName, pageName) => {
//     const basePaths = {
//       master: '/master',
//       teacher: '/teacher',
//       userAccount: '/user-account',
//       student: '/student',
//       student2: '/student2',
//     };

//     const basePath = basePaths[menuName.toLowerCase()];

//     return basePath ? `${basePath}/${pageName.toLowerCase().replace(/ /g, '-')}` : '#';
//   };

//   const handleSubmenuClick = (path) => {
//     setOpenSubmenu('');
//     navigate(path);
//   };

//   const toggleSubmenu = (submenu) => {
//     setOpenSubmenu((prev) => (prev === submenu ? '' : submenu)); // Toggle submenu visibility
//   };

//   useEffect(() => {
//     if (location.state && location.state.menus) {
//       const filteredMenus = location.state.menus.filter(menu => menu.status === true);
//       setMenus(filteredMenus);
//     }
//   }, [location]);

//   useEffect(() => {
//     const savedMenus = localStorage.getItem('menus');
//     if (savedMenus) {
//       const parsedMenus = JSON.parse(savedMenus); 
//       setMenus(parsedMenus); 
//     }
//   }, []);

//   if (menus.length === 0) {
//     return <div className="text-center text-white">No menus available</div>;
//   }

//   return (
//     <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg">
//       {/* Header Section */}
//       <div className="flex items-center justify-center h-16 border-b border-gray-700 bg-gray-900">
//         <h1 className="text-xl font-semibold text-white">MyApp</h1>
//       </div>
      
//       {/* Sidebar Navigation */}
//       <nav className="flex-grow overflow-y-auto">
//         <ul className="space-y-4 p-4">
//           {/* Loop through all menus */}
//           {menus.map((menu) => (
//             <li key={menu.name} className="relative">
//               <div
//                 className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300"
//                 onClick={() => toggleSubmenu(menu.name)} // Toggle submenu when main menu clicked
//               >
//                 <span className="font-medium">{menu.name}</span>
//                 <span>{openSubmenu === menu.name ? '▼' : '►'}</span>
//               </div>
              
//               {/* Render submenus if the current menu is open */}
//               {openSubmenu === menu.name && (
//                 <ul className="ml-4 mt-2 space-y-2">
//                   {/* Loop through submenu items (pages) */}
//                   {menu.pages && menu.pages.filter(page => page.status === true).map((page, subIndex) => (
//                     <li key={subIndex} className="space-y-1">
//                       <Link
//                         to={generatePath(menu.name, page.name)} // Generate path dynamically
//                         className="block p-2 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition-all duration-200"
//                         onClick={() => handleSubmenuClick(generatePath(menu.name, page.name))} // Navigate to the generated path
//                       >
//                         {page.name}
//                       </Link>
                      
//                       {/* Render submenus for pages if they exist */}
//                       {page.submenus && page.submenus.filter(submenu => submenu.status === true).map((submenu, index) => (
//                         <ul key={index} className="ml-4 mt-2 space-y-1">
//                           <li>
//                             <span className="text-xs text-gray-400">{submenu.name}</span>
//                           </li>
//                         </ul>
//                       ))}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Read the menus from the cookie
    const menuData = document.cookie.split(';').find(cookie => cookie.trim().startsWith('menus='));

    if (menuData) {
      const menus = JSON.parse(decodeURIComponent(menuData.split('=')[1]));
      console.log('Menus from cookie:', menus); // Verify the menu data from the cookie
      setMenus(menus);
    } else {
      console.log('No menus found in cookie');
    }
  }, []);

  if (menus.length === 0) {
    return <div className="text-center text-white">No menus available</div>;
  }

  // Function to generate path dynamically based on menu and page names
  const generatePath = (menuName, pageName) => {
    const basePaths = {
      master: '/master',
      teacher: '/teacher',
      userAccount: '/user-account',
      student: '/student',
      student2: '/student2',
    };

    const basePath = basePaths[menuName.toLowerCase()];
    return basePath ? `${basePath}/${pageName.toLowerCase().replace(/ /g, '-')}` : '#';
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg">
      {/* Header Section */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700 bg-gray-900">
        <h1 className="text-xl font-semibold text-white">MyApp</h1>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-4 p-4">
          {/* Loop through all menus */}
          {menus.map((menu, index) => (
            <li key={index} className="relative">
              <div className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300">
                <span className="font-medium">{menu.name}</span>
              </div>

              {/* Render submenus if any */}
              {menu.pages && menu.pages.length > 0 && (
                <ul className="ml-4 mt-2 space-y-2">
                  {menu.pages.map((page, subIndex) => (
                    <li key={subIndex} className="space-y-1">
                      <Link
                        to={generatePath(menu.name, page.name)}
                        className="block p-2 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition-all duration-200"
                      >
                        {page.name}
                      </Link>

                      {/* Render submenus for pages if they exist */}
                      {page.submenus && page.submenus.length > 0 && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {page.submenus.map((submenu, subMenuIndex) => (
                            <li key={subMenuIndex}>
                              <span className="text-xs text-gray-400">{submenu.name}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

