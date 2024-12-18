// // Course.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUserRights } from '../UserRightsContext';
// import { useMenuContext } from '../MenuContext'; // Import the new context
// import { menuOptions } from '../menuOptions';

// const Course = () => {
//   const { userRights, toggleRight } = useUserRights();
//   const { submenuVisibility, toggleSubmenuVisibility } = useMenuContext(); // Use the menu context
//   const [selectedMenu, setSelectedMenu] = useState('');
//   const [selectedSubmenu, setSelectedSubmenu] = useState('');
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/role/read');
//         setRoles(response.data);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };

//     fetchRoles();
//   }, []);

//   const handleMenuChange = (e) => {
//     setSelectedMenu(e.target.value);
//     setSelectedSubmenu('');
//   };

//   const handleSubmenuChange = (e) => {
//     setSelectedSubmenu(e.target.value);
//   };

//  const [menuNamesLogged, setMenuNamesLogged] = useState(false);

// useEffect(() => {
//   const allMenuNames = Object.entries(menuOptions).map(([key, { title }]) => title);
  
//   // Log menu names only if they haven't been logged yet
//   if (!menuNamesLogged) {
//     console.log('All Menu Names:', allMenuNames);
//     setMenuNamesLogged(true); // Mark as logged
//   }
// }, [menuNamesLogged]);
//   const selectedSubmenus = selectedMenu ? menuOptions[selectedMenu].submenus : [];

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">User Right Management</h1>

//       <div className="flex space-x-4 mb-6">
//         <div className="w-1/3">
//           <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
//             User Type
//           </label>
//           <select
//             id="userType"
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">Select User Type</option>
//             {roles.map((role) => (
//               <option key={role._id} value={role.name}>
//                 {role.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-1/3">
//           <label htmlFor="menuSelection" className="block text-sm font-medium text-gray-700">
//             Select Menu
//           </label>
//           <select
//             id="menuSelection"
//             value={selectedMenu}
//             onChange={handleMenuChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">Select Menu</option>
//             {Object.entries(menuOptions).map(([key, { title }]) => (
//               <option key={key} value={key}>
//                 {title}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-1/3">
//           <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
//             Select Submenu
//           </label>
//           <select
//             id="submenuSelection"
//             value={selectedSubmenu}
//             onChange={handleSubmenuChange}
//             disabled={!selectedMenu || selectedSubmenus.length === 0}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">Select Submenu</option>
//             {selectedSubmenus.map(({ name }) => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-2 px-4 border-b">Allow</th>
//               <th className="py-2 px-4 border-b">From Title</th>
//               <th className="py-2 px-4 border-b">Add</th>
//               <th className="py-2 px-4 border-b">Edit</th>
//               <th className="py-2 px-4 border-b">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedSubmenus.map(({ name }) => (
//               <tr key={name}>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="checkbox"
//                     checked={userRights[name] || false}
//                     onChange={() => {
//                       toggleSubmenuVisibility(name); // Update visibility on checkbox change
//                       toggleRight(name);
//                     }}
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">{name}</td>
//                 <td className="py-2 px-4 border-b">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input type="checkbox" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Course;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserRights } from './UserRightsContext';
import { useMenuContext } from './MenuContext'; // Import the new context
import { menuOptions2 } from './menuOptions2';

const Course = () => {
  const { userRights, toggleRight } = useUserRights();
  const { toggleSubmenuVisibility } = useMenuContext(); // Removed submenuVisibility
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubmenu, setSelectedSubmenu] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/role/read');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleMenuChange = (e) => {
    setSelectedMenu(e.target.value);
    setSelectedSubmenu('');
  };

  const handleSubmenuChange = (e) => {
    setSelectedSubmenu(e.target.value);
  };

  const [menuNamesLogged, setMenuNamesLogged] = useState(false);

  useEffect(() => {
    const allMenuNames = Object.entries(menuOptions).map(([key, { title }]) => title);
  
    // Log menu names only if they haven't been logged yet
    if (!menuNamesLogged) {
      console.log('All Menu Names:', allMenuNames);
      setMenuNamesLogged(true); // Mark as logged
    }
  }, [menuNamesLogged]);

  const selectedSubmenus = selectedMenu ? menuOptions[selectedMenu].submenus : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Right Management</h1>

      <div className="flex space-x-4 mb-6">
        <div className="w-1/3">
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            id="userType"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select User Type</option>
            {roles.map((role) => (
              <option key={role._id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label htmlFor="menuSelection" className="block text-sm font-medium text-gray-700">
            Select Menu
          </label>
          <select
            id="menuSelection"
            value={selectedMenu}
            onChange={handleMenuChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select Menu</option>
            {Object.entries(menuOptions).map(([key, { title }]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
            Select Submenu
          </label>
          <select
            id="submenuSelection"
            value={selectedSubmenu}
            onChange={handleSubmenuChange}
            disabled={!selectedMenu || selectedSubmenus.length === 0}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select Submenu</option>
            {selectedSubmenus.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Allow</th>
              <th className="py-2 px-4 border-b">From Title</th>
              <th className="py-2 px-4 border-b">Add</th>
              <th className="py-2 px-4 border-b">Edit</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedSubmenus.map(({ name }) => (
              <tr key={name}>
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={userRights[name] || false}
                    onChange={() => {
                      toggleSubmenuVisibility(name); // Update visibility on checkbox change
                      toggleRight(name);
                    }}
                  />
                </td>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border-b">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border-b">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
