

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { menuOptions2} from '../menuOptions2';

// const Course = () => {

//   const [roles, setRoles] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState('');
//   const [selectedSubmenu, setSelectedSubmenu] = useState('');
//   const [selectedsubItem, setSelectedSubItem] = useState('');
//   const [menuNamesLogged, setMenuNamesLogged] = useState(false);
//   const [allowedSubmenus, setAllowedSubmenus] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [permissions, setPermissions] = useState([]);
//   const [submenuPermissions, setSubmenuPermissions] = useState({});


//   const selectedSubmenus = selectedMenu ? menuOptions2[selectedMenu].submenus : [];
// console.log("123",selectedSubmenus);

//   useEffect(() => {
//     if (selectedSubmenus.length > 0) {
//       setSubmenuPermissions(
//         selectedSubmenus.reduce((acc, submenu) => {
//           acc[submenu.name] = { permissions: [] };

//           if (submenu.subItems) {
//             submenu.subItems.forEach(subItem => {
//               acc[subItem.name] = { permissions: [] };
//             });
//           }
//           return acc;
//         }, {})
//       );
//     }
//   }, [selectedSubmenus]);




//   const fetchRolesAndUpdateMenus = async () => {
//     try {
//       const roleResponse = await axios.get('http://localhost:5001/role/read');
//       const roles = roleResponse.data;
//       setRoles(roles);

//       for (const role of roles) {
//         const roleId = role._id;
//         const existingMenusResponse = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//         const existingMenus = existingMenusResponse.data.menus;

//         for (const [menuKey, menuData] of Object.entries(menuOptions2)) {
//           const existingMenu = existingMenus.find((menu) => menu.name === menuKey);

//           if (!existingMenu) {


//             const pages = menuData.submenus && Array.isArray(menuData.submenus)
//               ? menuData.submenus.map((submenu) => ({
//                 name: submenu.name,
//                 permissions: [],
//                 status: false,
//                 submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.map((subitem) => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false,
//                   })) : []
//               })) : [];

//             const menus = {
//               name: menuKey,
//               pages,
//             }


//             await axios.put(`http://localhost:5001/role/add-menu/${roleId}`, { menus });
//             console.log(`Menu '${menuKey}' added to role '${role.name}'`);
//           } else {

//             const existingPage = existingMenu.pages;

//             for (const submenu of menuData.submenus) {
//               const page = existingPage.find(page => page.name === submenu.name);
//               if (page) {
//                 const existingSubmenus = page.submenus || [];
//                 const missingSubmenus = submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.filter(subItem =>
//                     !existingSubmenus.some(existingSubmenu => existingSubmenu.name === subItem.name)

//                   ) : [];

//                 if (missingSubmenus.length > 0) {
//                   page.submenus = [...existingSubmenus, ...missingSubmenus.map(subitem => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false
//                   }))];
//                 }
//               } else {
//                 existingMenu.pages.push({
//                   name: submenu.name,
//                   submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                     ? submenu.subItems.map(subitem => ({
//                       name: subitem.name,
//                       permissions: [],
//                       status: false,
//                     })) : [],
//                 });
//               }
//             }


//             await axios.put(`http://localhost:5001/role/update-menu/${roleId}`, { updatedMenu: existingMenu });
//             console.log(`Submenus added to menu '${menuKey}' for role '${role.name}'`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching roles or updating menus:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRolesAndUpdateMenus();
//   }, []);



//   useEffect(() => {
//     if (!menuNamesLogged) {
//       const allMenuNames = Object.entries(menuOptions2).map(([key, { title }]) => title);
//       console.log('All Menu Names:', allMenuNames);
//       setMenuNamesLogged(true);
//     }
//   }, [menuNamesLogged]);


//   const handleMenuChange = (e) => {
//     const menu = e.target.value;
//     setSelectedMenu(menu);
//     setSelectedSubmenu('');
//     setAllowedSubmenus([]);
//   }

//   const handleSubmenuChange = (e) => {
//     setSelectedSubmenu(e.target.value);
//     setSelectedSubItem('');
//   };


//   useEffect(() => {
//     const fetchAllowedSubmenus = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find(menu => menu.name === selectedMenu);
//           if (menu) {
//             setAllowedSubmenus(menu.pages.filter(submenu => submenu.status).map(submenu => submenu.name));
//           }
//         }
//       }
//     };

//     fetchAllowedSubmenus();
//   }, [selectedMenu, roles, selectedRole]);




//   const handlePermissionCheckboxChange = (submenuName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const submenuPerms = prevPermissions[submenuName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array
//       const updatedPermissions = submenuPerms.permissions.includes(permissionId)
//         ? submenuPerms.permissions.filter((id) => id !== permissionId)
//         : [...submenuPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [submenuName]: { ...submenuPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // Handle subItem checkbox change
//   const handleSubItemPermissionCheckboxChange = (subItemName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const subItemPerms = prevPermissions[subItemName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array for subItem
//       const updatedPermissions = subItemPerms.permissions.includes(permissionId)
//         ? subItemPerms.permissions.filter((id) => id !== permissionId)
//         : [...subItemPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [subItemName]: { ...subItemPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // // Main checkbox handler for submenu and subItems
//   const handleCheckboxChange = (name, permissionId = null) => {
//     const isChecked = allowedSubmenus.includes(name);

//     // Toggle allowed submenus or subItems
//     if (isChecked) {
//       setAllowedSubmenus((prev) => prev.filter((submenuName) => submenuName !== name));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, name]);
//     }

//     // If permissionId is provided, also toggle the permissions for this submenu or subItem
//     if (permissionId) {
//       handlePermissionCheckboxChange(name, permissionId);
//     }
//   };


//   const handleSubItemCheckboxChange = (submenuName, subItemName) => {
//     const isSubItemChecked = submenuPermissions[submenuName]?.subItems?.some(
//       (subItem) => subItem.name === subItemName && subItem.status
//     );

//     if (isSubItemChecked) {
//       setAllowedSubmenus((prev) => prev.filter((name) => name !== subItemName));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, subItemName]);
//     }

//     // Update permission for the subItem
//     handleSubItemPermissionCheckboxChange(subItemName, null);
//   };

//   useEffect(() => {
//     const fetchSubmenuPermissions = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find((menu) => menu.name === selectedMenu);
//           if (menu) {
//             const submenuPermissionsData = menu.pages.reduce((acc, page) => {
//               acc[page.name] = {
//                 permissions: page.permissions || [],
//                 status: page.status,

//               };

//               if(page.submenus){
//                 page.submenus.forEach((submenu)=>{
//                   acc[submenu.name]={
//                     permissions:submenu.permissions || [],
//                     status:submenu.status,
//                   }
//                 })
//               }

//               return acc;
//             }, {});

//             setSubmenuPermissions(submenuPermissionsData);
//             let allowedSubmenus =menu.pages
//             .filter((page)=>page.status)
//             .map((page)=>page.name);

//             menu.pages.forEach((page)=>{
//              if(Array.isArray(page.submenus)){
//               allowedSubmenus.push(
//                 ...page.submenus.filter((submenu)=> submenu.status).map((submenu)=>submenu.name)
//               )
//              }
//             });

//             setAllowedSubmenus(allowedSubmenus);
//             // setAllowedSubmenus(menu.pages.filter((submenu) => submenu.status).map((submenu) => submenu.name));
//           }
//         }
//       }
//     };

//     fetchSubmenuPermissions();
//   }, [selectedMenu, selectedRole, roles]);





//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSave = async () => {
//     if (!selectedRole) {
//       alert('Please select a role.');
//       return;
//     }

//     try {
//       const roleId = roles.find((role) => role.name === selectedRole)?._id;

//       if (roleId) {
//         const updates = selectedSubmenus.map((submenu) => ({
//           name: submenu.name,
//           permissions: submenuPermissions[submenu.name]?.permissions || [],
//           status: allowedSubmenus.includes(submenu.name),  // true if allowed, false otherwise
//           submenus: submenu.subItems?.map(subItem => ({
//             name: subItem.name,
//             status: allowedSubmenus.includes(subItem.name),
//             permissions: submenuPermissions[subItem.name]?.permissions || [],
//           })) || [],
//         }));

//         console.log('Sending updates:', updates);

//         const response = await axios.put(
//           `http://localhost:5001/role/update-submenu-status/${roleId}`,
//           { updates }
//         );

//         console.log('Response from server:', response.data);
//         alert('Submenu statuses updated successfully!');
//       } else {
//         alert('No role ID found for the selected role.');
//       }
//     } catch (error) {
//       console.error('Error saving submenu statuses:', error);
//       alert('Failed to save submenu statuses.');
//     }
//   };

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/permission/read');
//         setPermissions(response.data);
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//       }
//     };

//     fetchPermissions();
//   }, []);

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
//             value={selectedRole}
//             onChange={handleRoleChange}
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
//             {Object.entries(menuOptions2).map(([key, { title }]) => (
//               <option key={key} value={key}>
//                 {title}
//               </option>
//             ))}
//           </select>
//         </div>


//         {selectedMenu && (
//           <div className="w-1/3 ">
//             <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
//               Select Submenu
//             </label>
//             <select
//               id="submenuSelection"
//               value={selectedSubmenu}
//               onChange={handleSubmenuChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Submenu</option>
//               {menuOptions2[selectedMenu]?.submenus
//                 ?.filter((submenu) => submenu.subItems && submenu.subItems.length > 0)
//                 .map((submenu) => (
//                   <option key={submenu.name} value={submenu.name}>
//                     {submenu.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         )}


//       </div>

//       <div className="overflow-x-auto">



//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-2 px-4 border-b">Allow</th>
//               <th className="py-2 px-4 border-b">From Title</th>

//               {permissions.map((permission) => (
//                 <th key={permission._id} className="py-2 px-4 border-b">
//                   {permission.name}
//                 </th>
//               ))}

//             </tr>
//           </thead>
//           {!selectedSubmenu && (
//             <tbody>
//               {selectedSubmenus.map((submenu) => (
//                 <tr key={submenu.name}>
//                   <td className="py-2 px-4 border-b">
//                     <input
//                       type="checkbox"
//                       checked={allowedSubmenus.includes(submenu.name)}
//                       onChange={() => handleCheckboxChange(submenu.name)}
//                     />
//                   </td>

//                   <td className="py-2 px-4 border-b">{submenu.name}</td>

//                   {permissions.map((permission) => (
//                     <td key={permission.id} className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={submenuPermissions[submenu.name]?.permissions?.includes(permission._id) || false}
//                         onChange={() => handlePermissionCheckboxChange(submenu.name, permission._id)} // Ensure permission.id is passed
//                         disabled={!allowedSubmenus.includes(submenu.name)} // 
//                         id={`${submenu.name}-${permission.name}`}
//                       />
//                     </td>
//                   ))}



//                 </tr>
//               ))}


//             </tbody>
//           )}

//           {selectedSubmenu && (
//             <tbody>

//               {menuOptions2[selectedMenu].submenus
//                 ?.find((submenu) => submenu.name === selectedSubmenu)
//                 ?.subItems?.map((subItem) => (


//                   <tr key={subItem.name}>
//                     <td className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={allowedSubmenus.includes(subItem.name)}
//                         onChange={() => handleCheckboxChange(subItem.name)}
//                       />
//                     </td>

//                     <td className="py-2 px-4 border-b">{subItem.name}</td>
//                     {permissions.map((permission) => (
//                       <td key={permission.id} className="py-2 px-4 border-b">
//                         <input
//                           type="checkbox"
//                           checked={submenuPermissions[subItem.name]?.permissions?.includes(permission._id) || false}
//                           onChange={() => handleSubItemPermissionCheckboxChange(subItem.name, permission._id)}
//                           disabled={!allowedSubmenus.includes(subItem.name)}
//                           id={`${subItem.name}-${permission.name}`}
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//             </tbody>
//           )}

//         </table>

//       </div>




//       <div className="mt-4">
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Course;








// code --1
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { menuOptions2 } from '../menuOptions2';

// const Course = () => {

//   const [roles, setRoles] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState('');
//   const [selectedSubmenu, setSelectedSubmenu] = useState('');
//   const [selectedsubItem, setSelectedSubItem] = useState('');
//   const [menuNamesLogged, setMenuNamesLogged] = useState(false);
//   const [allowedSubmenus, setAllowedSubmenus] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [permissions, setPermissions] = useState([]);
//   const [submenuPermissions, setSubmenuPermissions] = useState({});
//   const [menuOptions,setMenuOptions]=useState({})

//   useEffect(()=>{
//     const storeMenuOptions=localStorage.getItem('menus');
//     if(storeMenuOptions){
//       setMenuOptions(JSON.parse(storeMenuOptions));
//       console.log("Options::",storeMenuOptions);

//     }else{
//       console.log("no menus options found in storage");

//     }
//   },[])

//   const selectedSubmenus = selectedMenu ? menuOptions[selectedMenu]?.submenus || [] : [];

//   useEffect(() => {
//     if (selectedSubmenus.length > 0) {
//       setSubmenuPermissions(
//         selectedSubmenus.reduce((acc, submenu) => {
//           acc[submenu.name] = { permissions: [] };

//           if (submenu.subItems) {
//             submenu.subItems.forEach(subItem => {
//               acc[subItem.name] = { permissions: [] };
//             });
//           }
//           return acc;
//         }, {})
//       );
//     }
//   }, [selectedSubmenus]);




//   const fetchRolesAndUpdateMenus = async () => {
//     try {
//       const roleResponse = await axios.get('http://localhost:5001/role/read');
//       const roles = roleResponse.data;
//       setRoles(roles);

//       for (const role of roles) {
//         const roleId = role._id;
//         const existingMenusResponse = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//         const existingMenus = existingMenusResponse.data.menus;

//         for (const [menuKey, menuData] of Object.entries(menuOptions2)) {
//           const existingMenu = existingMenus.find((menus) => menus.name === menuKey);

//           if (!existingMenu) {


//             const pages = menuData.submenus && Array.isArray(menuData.submenus)
//               ? menuData.submenus.map((submenu) => ({
//                 name: submenu.name,
//                 permissions: [],
//                 status: false,
//                 submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.map((subitem) => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false,
//                   })) : []
//               })) : [];

//             const menus = {
//               name: menuKey,
//               pages,
//             }


//             await axios.put(`http://localhost:5001/role/add-menu/${roleId}`, { menus });
//             console.log(`Menu '${menuKey}' added to role '${role.name}'`);
//           } else {

//             const existingPage = existingMenu.pages;

//             for (const submenu of menuData.submenus) {
//               const page = existingPage.find(page => page.name === submenu.name);
//               if (page) {
//                 const existingSubmenus = page.submenus || [];
//                 const missingSubmenus = submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.filter(subItem =>
//                     !existingSubmenus.some(existingSubmenu => existingSubmenu.name === subItem.name)

//                   ) : [];

//                 if (missingSubmenus.length > 0) {
//                   page.submenus = [...existingSubmenus, ...missingSubmenus.map(subitem => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false
//                   }))];
//                 }
//               } else {
//                 existingMenu.pages.push({
//                   name: submenu.name,
//                   submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                     ? submenu.subItems.map(subitem => ({
//                       name: subitem.name,
//                       permissions: [],
//                       status: false,
//                     })) : [],
//                 });
//               }
//             }


//             await axios.put(`http://localhost:5001/role/update-menu/${roleId}`, { updatedMenu: existingMenu });
//             console.log(`Submenus added to menu '${menuKey}' for role '${role.name}'`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching roles or updating menus:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRolesAndUpdateMenus();
//   }, []);



//   useEffect(() => {
//     if (!menuNamesLogged) {
//       const allMenuNames = Object.entries(menuOptions).map(([key, { title }]) => title);
//       console.log('All Menu Names:', allMenuNames);
//       setMenuNamesLogged(true);
//     }
//   }, [menuNamesLogged]);


//   const handleMenuChange = (e) => {
//     const menu = e.target.value;
//     setSelectedMenu(menu);
//     setSelectedSubmenu('');
//     setAllowedSubmenus([]);
//   }

//   const handleSubmenuChange = (e) => {
//     setSelectedSubmenu(e.target.value);
//     setSelectedSubItem('');
//   };


//   useEffect(() => {
//     const fetchAllowedSubmenus = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find(menu => menu.name === selectedMenu);
//           if (menu) {
//             setAllowedSubmenus(menu.pages.filter(submenu => submenu.status).map(submenu => submenu.name));
//           }
//         }
//       }
//     };

//     fetchAllowedSubmenus();
//   }, [selectedMenu, roles, selectedRole]);




//   const handlePermissionCheckboxChange = (submenuName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const submenuPerms = prevPermissions[submenuName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array
//       const updatedPermissions = submenuPerms.permissions.includes(permissionId)
//         ? submenuPerms.permissions.filter((id) => id !== permissionId)
//         : [...submenuPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [submenuName]: { ...submenuPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // Handle subItem checkbox change
//   const handleSubItemPermissionCheckboxChange = (subItemName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const subItemPerms = prevPermissions[subItemName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array for subItem
//       const updatedPermissions = subItemPerms.permissions.includes(permissionId)
//         ? subItemPerms.permissions.filter((id) => id !== permissionId)
//         : [...subItemPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [subItemName]: { ...subItemPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // // Main checkbox handler for submenu and subItems
//   const handleCheckboxChange = (name, permissionId = null) => {
//     const isChecked = allowedSubmenus.includes(name);

//     // Toggle allowed submenus or subItems
//     if (isChecked) {
//       setAllowedSubmenus((prev) => prev.filter((submenuName) => submenuName !== name));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, name]);
//     }

//     // If permissionId is provided, also toggle the permissions for this submenu or subItem
//     if (permissionId) {
//       handlePermissionCheckboxChange(name, permissionId);
//     }
//   };


//   const handleSubItemCheckboxChange = (submenuName, subItemName) => {
//     const isSubItemChecked = submenuPermissions[submenuName]?.subItems?.some(
//       (subItem) => subItem.name === subItemName && subItem.status
//     );

//     if (isSubItemChecked) {
//       setAllowedSubmenus((prev) => prev.filter((name) => name !== subItemName));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, subItemName]);
//     }

//     // Update permission for the subItem
//     handleSubItemPermissionCheckboxChange(subItemName, null);
//   };

//   useEffect(() => {
//     const fetchSubmenuPermissions = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find((menu) => menu.name === selectedMenu);
//           if (menu) {
//             const submenuPermissionsData = menu.pages.reduce((acc, page) => {
//               acc[page.name] = {
//                 permissions: page.permissions || [],
//                 status: page.status,

//               };

//               if(Array.isArray(page.submenus)){
//                 page.submenus.forEach((submenu)=>{
//                   acc[submenu.name]={
//                     permissions:submenu.permissions || [],
//                     status:submenu.status,
//                   }
//                 })
//               }

//               return acc;
//             }, {});

//             setSubmenuPermissions(submenuPermissionsData);
//             let allowedSubmenus =menu.pages
//             .filter((page)=>page.status)
//             .map((page)=>page.name);

//             menu.pages.forEach((page)=>{
//              if(Array.isArray(page.submenus)){
//               allowedSubmenus.push(
//                 ...page.submenus.filter((submenu)=> submenu.status).map((submenu)=>submenu.name)
//               )
//              }
//             });

//             setAllowedSubmenus(allowedSubmenus);
//             // setAllowedSubmenus(menu.pages.filter((submenu) => submenu.status).map((submenu) => submenu.name));
//           }
//         }
//       }
//     };

//     fetchSubmenuPermissions();
//   }, [selectedMenu, selectedRole, roles]);


//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSave = async () => {
//     if (!selectedRole) {
//       alert('Please select a role.');
//       return;
//     }

//     try {
//       const roleId = roles.find((role) => role.name === selectedRole)?._id;

//       if (roleId) {
//         const updates = menuOptions[selectedMenu]?.pages.map((submenu) => ({
//           name: submenu.name,
//           permissions: submenuPermissions[submenu.name]?.permissions || [],
//           status: allowedSubmenus.includes(submenu.name),  // true if allowed, false otherwise
//           submenus: submenu.submenus?.map(subItem => ({
//             name: subItem.name,
//             status: allowedSubmenus.includes(subItem.name),
//             permissions: submenuPermissions[subItem.name]?.permissions || [],
//           })) || [],
//         }));

//         console.log('Sending updates:', updates);

//         const response = await axios.put(
//           `http://localhost:5001/role/update-submenu-status/${roleId}`,
//           { updates }
//         );

//         console.log('Response from server:', response.data);
//         alert('Submenu statuses updated successfully!');
//       } else {
//         alert('No role ID found for the selected role.');
//       }
//     } catch (error) {
//       console.error('Error saving submenu statuses:', error);
//       alert('Failed to save submenu statuses.');
//     }
//   };

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/permission/read');
//         setPermissions(response.data);
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//       }
//     };

//     fetchPermissions();
//   }, []);

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
//             value={selectedRole}
//             onChange={handleRoleChange}
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
//             {Object.entries(menuOptions).map(([key,menu]) => (
//               <option key={key} value={key}>
//                 {menu.name}
//               </option>
//             ))}
//           </select>
//         </div>


//         {selectedMenu && (
//           <div className="w-1/3 ">
//             <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
//               Select Submenu
//             </label>
//             <select
//               id="submenuSelection"
//               value={selectedSubmenu}
//               onChange={handleSubmenuChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Submenu</option>

//                 {menuOptions[selectedMenu]?.pages
//                 ?.filter((page)=>page.submenus && page.submenus.length > 0 )
//                 .map((submenu)=>(
//                   <option key={submenu.name} value={submenu.name}>
//                     {submenu.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         )}


//       </div>

//       <div className="overflow-x-auto">



//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-2 px-4 border-b">Allow</th>
//               <th className="py-2 px-4 border-b">From Title</th>

//               {permissions.map((permission) => (
//                 <th key={permission._id} className="py-2 px-4 border-b">
//                   {permission.name}
//                 </th>
//               ))}

//             </tr>
//           </thead>
//           {!selectedSubmenu && (
//             <tbody>
//               {menuOptions[selectedMenu]?.pages.map((submenu) => (
//                 <tr key={submenu.name}>
//                   <td className="py-2 px-4 border-b">
//                     <input
//                       type="checkbox"
//                       checked={allowedSubmenus.includes(submenu.name)}
//                       onChange={() => handleCheckboxChange(submenu.name)}
//                     />
//                   </td>

//                   <td className="py-2 px-4 border-b">{submenu.name}</td>

//                   {permissions.map((permission) => (
//                     <td key={permission.id} className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={submenuPermissions[submenu.name]?.permissions?.includes(permission._id) || false}
//                         onChange={() => handlePermissionCheckboxChange(submenu.name, permission._id)} // Ensure permission.id is passed
//                         disabled={!allowedSubmenus.includes(submenu.name)} // 
//                         id={`${submenu.name}-${permission.name}`}
//                       />
//                     </td>
//                   ))}



//                 </tr>
//               ))}


//             </tbody>
//           )}

//           {selectedSubmenu && (
//             <tbody>

//               {menuOptions[selectedMenu]?.pages
//                 ?.find((page) => page.name === selectedSubmenu)
//                 ?.submenus?.map((subItem) => (


//                   <tr key={subItem.name}>
//                     <td className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={allowedSubmenus.includes(subItem.name)}
//                         onChange={() => handleCheckboxChange(subItem.name)}
//                       />
//                     </td>

//                     <td className="py-2 px-4 border-b">{subItem.name}</td>
//                     {permissions.map((permission) => (
//                       <td key={permission.id} className="py-2 px-4 border-b">
//                         <input
//                           type="checkbox"
//                           checked={submenuPermissions[subItem.name]?.permissions?.includes(permission._id) || false}
//                           onChange={() => handleSubItemPermissionCheckboxChange(subItem.name, permission._id)}
//                           disabled={!allowedSubmenus.includes(subItem.name)}
//                           id={`${subItem.name}-${permission.name}`}
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//             </tbody>
//           )}

//         </table>

//       </div>




//       <div className="mt-4">
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Course;


// code -2





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { menuOptions2 } from '../menuOptions2';

// const Course = () => {

//   const [roles, setRoles] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState('');
//   const [selectedSubmenu, setSelectedSubmenu] = useState('');
//   const [selectedsubItem, setSelectedSubItem] = useState('');
//   const [menuNamesLogged, setMenuNamesLogged] = useState(false);
//   const [allowedSubmenus, setAllowedSubmenus] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [permissions, setPermissions] = useState([]);
//   const [submenuPermissions, setSubmenuPermissions] = useState({});
//   const [menuOptions,setMenuOptions]=useState({})

//   useEffect(()=>{
//     const storeMenuOptions=localStorage.getItem('menus');
//     if(storeMenuOptions){
//       setMenuOptions(JSON.parse(storeMenuOptions));
//       console.log("Options::",storeMenuOptions);

//     }else{
//       console.log("no menus options found in storage");

//     }
//   },[])

//   const selectedSubmenus = selectedMenu ? menuOptions[selectedMenu]?.submenus || [] : [];

//   useEffect(() => {
//     if (selectedSubmenus.length > 0) {
//       setSubmenuPermissions(
//         selectedSubmenus.reduce((acc, submenu) => {
//           acc[submenu.name] = { permissions: [] };

//           if (submenu.subItems) {
//             submenu.subItems.forEach(subItem => {
//               acc[subItem.name] = { permissions: [] };
//             });
//           }
//           return acc;
//         }, {})
//       );
//     }
//   }, [selectedSubmenus]);




//   const fetchRolesAndUpdateMenus = async () => {
//     try {
//       const roleResponse = await axios.get('http://localhost:5001/role/read');
//       const roles = roleResponse.data;
//       setRoles(roles);

//       for (const role of roles) {
//         const roleId = role._id;
//         const existingMenusResponse = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//         const existingMenus = existingMenusResponse.data.menus;

//         for (const [menuKey, menuData] of Object.entries(menuOptions2)) {
//           const existingMenu = existingMenus.find((menus) => menus.name === menuKey);

//           if (!existingMenu) {


//             const pages = menuData.submenus && Array.isArray(menuData.submenus)
//               ? menuData.submenus.map((submenu) => ({
//                 name: submenu.name,
//                 permissions: [],
//                 status: false,
//                 submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.map((subitem) => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false,
//                   })) : []
//               })) : [];

//             const menus = {
//               name: menuKey,
//               pages,
//             }


//             await axios.put(`http://localhost:5001/role/add-menu/${roleId}`, { menus });
//             console.log(`Menu '${menuKey}' added to role '${role.name}'`);
//           } else {

//             const existingPage = existingMenu.pages;

//             for (const submenu of menuData.submenus) {
//               const page = existingPage.find(page => page.name === submenu.name);
//               if (page) {
//                 const existingSubmenus = page.submenus || [];
//                 const missingSubmenus = submenu.subItems && Array.isArray(submenu.subItems)
//                   ? submenu.subItems.filter(subItem =>
//                     !existingSubmenus.some(existingSubmenu => existingSubmenu.name === subItem.name)

//                   ) : [];

//                 if (missingSubmenus.length > 0) {
//                   page.submenus = [...existingSubmenus, ...missingSubmenus.map(subitem => ({
//                     name: subitem.name,
//                     permissions: [],
//                     status: false
//                   }))];
//                 }
//               } else {
//                 existingMenu.pages.push({
//                   name: submenu.name,
//                   submenus: submenu.subItems && Array.isArray(submenu.subItems)
//                     ? submenu.subItems.map(subitem => ({
//                       name: subitem.name,
//                       permissions: [],
//                       status: false,
//                     })) : [],
//                 });
//               }
//             }


//             await axios.put(`http://localhost:5001/role/update-menu/${roleId}`, { updatedMenu: existingMenu });
//             console.log(`Submenus added to menu '${menuKey}' for role '${role.name}'`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching roles or updating menus:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRolesAndUpdateMenus();
//   }, []);



//   useEffect(() => {
//     if (!menuNamesLogged) {
//       const allMenuNames = Object.entries(menuOptions).map(([key, { title }]) => title);
//       console.log('All Menu Names:', allMenuNames);
//       setMenuNamesLogged(true);
//     }
//   }, [menuNamesLogged]);


//   const handleMenuChange = (e) => {
//     const menu = e.target.value;
//     setSelectedMenu(menu);
//     setSelectedSubmenu('');
//     setAllowedSubmenus([]);
//   }

//   const handleSubmenuChange = (e) => {
//     setSelectedSubmenu(e.target.value);
//     setSelectedSubItem('');
//   };


//   useEffect(() => {
//     const fetchAllowedSubmenus = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find(menu => menu.name === selectedMenu);
//           if (menu) {
//             setAllowedSubmenus(menu.pages.filter(submenu => submenu.status).map(submenu => submenu.name));
//           }
//         }
//       }
//     };

//     fetchAllowedSubmenus();
//   }, [selectedMenu, roles, selectedRole]);




//   const handlePermissionCheckboxChange = (submenuName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const submenuPerms = prevPermissions[submenuName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array
//       const updatedPermissions = submenuPerms.permissions.includes(permissionId)
//         ? submenuPerms.permissions.filter((id) => id !== permissionId)
//         : [...submenuPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [submenuName]: { ...submenuPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // Handle subItem checkbox change
//   const handleSubItemPermissionCheckboxChange = (subItemName, permissionId) => {
//     setSubmenuPermissions((prevPermissions) => {
//       const subItemPerms = prevPermissions[subItemName] || { permissions: [] };

//       // Toggle the permissionId in the permissions array for subItem
//       const updatedPermissions = subItemPerms.permissions.includes(permissionId)
//         ? subItemPerms.permissions.filter((id) => id !== permissionId)
//         : [...subItemPerms.permissions, permissionId];

//       return {
//         ...prevPermissions,
//         [subItemName]: { ...subItemPerms, permissions: updatedPermissions },
//       };
//     });
//   };

//   // // Main checkbox handler for submenu and subItems
//   const handleCheckboxChange = (name, permissionId = null) => {
//     const isChecked = allowedSubmenus.includes(name);

//     // Toggle allowed submenus or subItems
//     if (isChecked) {
//       setAllowedSubmenus((prev) => prev.filter((submenuName) => submenuName !== name));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, name]);
//     }

//     // If permissionId is provided, also toggle the permissions for this submenu or subItem
//     if (permissionId) {
//       handlePermissionCheckboxChange(name, permissionId);
//     }
//   };


//   const handleSubItemCheckboxChange = (submenuName, subItemName) => {
//     const isSubItemChecked = submenuPermissions[submenuName]?.subItems?.some(
//       (subItem) => subItem.name === subItemName && subItem.status
//     );

//     if (isSubItemChecked) {
//       setAllowedSubmenus((prev) => prev.filter((name) => name !== subItemName));
//     } else {
//       setAllowedSubmenus((prev) => [...prev, subItemName]);
//     }

//     // Update permission for the subItem
//     handleSubItemPermissionCheckboxChange(subItemName, null);
//   };

//   useEffect(() => {
//     const fetchSubmenuPermissions = async () => {
//       if (selectedMenu && selectedRole) {
//         const roleId = roles.find((role) => role.name === selectedRole)?._id;
//         if (roleId) {
//           const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
//           const menu = data.menus.find((menu) => menu.name === selectedMenu);
//           if (menu) {
//             const submenuPermissionsData = menu.pages.reduce((acc, page) => {
//               acc[page.name] = {
//                 permissions: page.permissions || [],
//                 status: page.status,

//               };

//               if(Array.isArray(page.submenus)){
//                 page.submenus.forEach((submenu)=>{
//                   acc[submenu.name]={
//                     permissions:submenu.permissions || [],
//                     status:submenu.status,
//                   }
//                 })
//               }

//               return acc;
//             }, {});

//             setSubmenuPermissions(submenuPermissionsData);
//             let allowedSubmenus =menu.pages
//             .filter((page)=>page.status)
//             .map((page)=>page.name);

//             menu.pages.forEach((page)=>{
//              if(Array.isArray(page.submenus)){
//               allowedSubmenus.push(
//                 ...page.submenus.filter((submenu)=> submenu.status).map((submenu)=>submenu.name)
//               )
//              }
//             });

//             setAllowedSubmenus(allowedSubmenus);
//             // setAllowedSubmenus(menu.pages.filter((submenu) => submenu.status).map((submenu) => submenu.name));
//           }
//         }
//       }
//     };

//     fetchSubmenuPermissions();
//   }, [selectedMenu, selectedRole, roles]);


//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSave = async () => {
//     if (!selectedRole) {
//       alert('Please select a role.');
//       return;
//     }

//     try {
//       const roleId = roles.find((role) => role.name === selectedRole)?._id;

//       if (roleId) {
//         const updates = menuOptions[selectedMenu]?.pages.map((submenu) => ({
//           name: submenu.name,
//           permissions: submenuPermissions[submenu.name]?.permissions || [],
//           status: allowedSubmenus.includes(submenu.name),  // true if allowed, false otherwise
//           submenus: submenu.submenus?.map(subItem => ({
//             name: subItem.name,
//             status: allowedSubmenus.includes(subItem.name),
//             permissions: submenuPermissions[subItem.name]?.permissions || [],
//           })) || [],
//         }));

//         console.log('Sending updates:', updates);

//         const response = await axios.put(
//           `http://localhost:5001/role/update-submenu-status/${roleId}`,
//           { updates }
//         );

//         console.log('Response from server:', response.data);
//         alert('Submenu statuses updated successfully!');
//       } else {
//         alert('No role ID found for the selected role.');
//       }
//     } catch (error) {
//       console.error('Error saving submenu statuses:', error);
//       alert('Failed to save submenu statuses.');
//     }
//   };

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/permission/read');
//         setPermissions(response.data);
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//       }
//     };

//     fetchPermissions();
//   }, []);

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
//             value={selectedRole}
//             onChange={handleRoleChange}
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
//             {Object.entries(menuOptions).map(([key,menu]) => (
//               <option key={key} value={key}>
//                 {menu.name}
//               </option>
//             ))}
//           </select>
//         </div>


//         {selectedMenu && (
//           <div className="w-1/3 ">
//             <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
//               Select Submenu
//             </label>
//             <select
//               id="submenuSelection"
//               value={selectedSubmenu}
//               onChange={handleSubmenuChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Submenu</option>

//                 {menuOptions[selectedMenu]?.pages
//                 ?.filter((page)=>page.submenus && page.submenus.length > 0 )
//                 .map((submenu)=>(
//                   <option key={submenu.name} value={submenu.name}>
//                     {submenu.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         )}


//       </div>

//       <div className="overflow-x-auto">



//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="py-2 px-4 border-b">Allow</th>
//               <th className="py-2 px-4 border-b">From Title</th>

//               {permissions.map((permission) => (
//                 <th key={permission._id} className="py-2 px-4 border-b">
//                   {permission.name}
//                 </th>
//               ))}

//             </tr>
//           </thead>
//           {!selectedSubmenu && (
//             <tbody>
//               {menuOptions[selectedMenu]?.pages.map((submenu) => (
//                 <tr key={submenu.name}>
//                   <td className="py-2 px-4 border-b">
//                     <input
//                       type="checkbox"
//                       checked={allowedSubmenus.includes(submenu.name)}
//                       onChange={() => handleCheckboxChange(submenu.name)}
//                     />
//                   </td>

//                   <td className="py-2 px-4 border-b">{submenu.name}</td>

//                   {permissions.map((permission) => (
//                     <td key={permission.id} className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={submenuPermissions[submenu.name]?.permissions?.includes(permission._id) || false}
//                         onChange={() => handlePermissionCheckboxChange(submenu.name, permission._id)} // Ensure permission.id is passed
//                         disabled={!allowedSubmenus.includes(submenu.name)} // 
//                         id={`${submenu.name}-${permission.name}`}
//                       />
//                     </td>
//                   ))}



//                 </tr>
//               ))}


//             </tbody>
//           )}

//           {selectedSubmenu && (
//             <tbody>

//               {menuOptions[selectedMenu]?.pages
//                 ?.find((page) => page.name === selectedSubmenu)
//                 ?.submenus?.map((subItem) => (


//                   <tr key={subItem.name}>
//                     <td className="py-2 px-4 border-b">
//                       <input
//                         type="checkbox"
//                         checked={allowedSubmenus.includes(subItem.name)}
//                         onChange={() => handleCheckboxChange(subItem.name)}
//                       />
//                     </td>

//                     <td className="py-2 px-4 border-b">{subItem.name}</td>
//                     {permissions.map((permission) => (
//                       <td key={permission.id} className="py-2 px-4 border-b">
//                         <input
//                           type="checkbox"
//                           checked={submenuPermissions[subItem.name]?.permissions?.includes(permission._id) || false}
//                           onChange={() => handleSubItemPermissionCheckboxChange(subItem.name, permission._id)}
//                           disabled={!allowedSubmenus.includes(subItem.name)}
//                           id={`${subItem.name}-${permission.name}`}
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//             </tbody>
//           )}

//         </table>

//       </div>




//       <div className="mt-4">
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Course;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { menuOptions2 } from '../menuOptions2';

const Course = () => {

  const [roles, setRoles] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubmenu, setSelectedSubmenu] = useState('');
  const [selectedsubItem, setSelectedSubItem] = useState('');
  const [menuNamesLogged, setMenuNamesLogged] = useState(false);
  const [allowedSubmenus, setAllowedSubmenus] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [submenuPermissions, setSubmenuPermissions] = useState({});
  const [menuOptions, setMenuOptions] = useState({});

  useEffect(()=>{
    const storeMenuOptions= localStorage.getItem('menus')
    if(storeMenuOptions){
        setMenuOptions(JSON.parse(storeMenuOptions));
        console.log(storeMenuOptions);
        
    }else{
      console.log("not found");
      
    }
  },[])

  const selectedSubmenus = selectedMenu ? menuOptions[selectedMenu]?.pages : [];
  console.log("123", selectedSubmenus);


  const fetchRolesAndUpdateMenus = async () => {
    try {
      const roleResponse = await axios.get('http://localhost:5001/role/read');
      const roles = roleResponse.data;
      setRoles(roles);

      for (const role of roles) {
        const roleId = role._id;
        const existingMenusResponse = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
        const existingMenus = existingMenusResponse.data.menus;

        for (const [menuKey, menuData] of Object.entries(menuOptions2)) {
          const existingMenu = existingMenus.find((menu) => menu.name === menuKey);

          if (!existingMenu) {


            const pages = menuData.submenus && Array.isArray(menuData.submenus)
              ? menuData.submenus.map((submenu) => ({
                name: submenu.name,
                permissions: [],
                status: false,
                submenus: submenu.subItems && Array.isArray(submenu.subItems)
                  ? submenu.subItems.map((subitem) => ({
                    name: subitem.name,
                    permissions: [],
                    status: false,
                  })) : []
              })) : [];

            const menus = {
              name: menuKey,
              pages,
            }


            await axios.put(`http://localhost:5001/role/add-menu/${roleId}`, { menus });
            console.log(`Menu '${menuKey}' added to role '${role.name}'`);
          } else {

            const existingPage = existingMenu.pages;

            for (const submenu of menuData.submenus) {
              const page = existingPage.find(page => page.name === submenu.name);
              if (page) {
                const existingSubmenus = page.submenus || [];
                const missingSubmenus = submenu.subItems && Array.isArray(submenu.subItems)
                  ? submenu.subItems.filter(subItem =>
                    !existingSubmenus.some(existingSubmenu => existingSubmenu.name === subItem.name)

                  ) : [];

                if (missingSubmenus.length > 0) {
                  page.submenus = [...existingSubmenus, ...missingSubmenus.map(subitem => ({
                    name: subitem.name,
                    permissions: [],
                    status: false
                  }))];
                }
              } else {
                existingMenu.pages.push({
                  name: submenu.name,
                  submenus: submenu.subItems && Array.isArray(submenu.subItems)
                    ? submenu.subItems.map(subitem => ({
                      name: subitem.name,
                      permissions: [],
                      status: false,
                    })) : [],
                });
              }
            }


            await axios.put(`http://localhost:5001/role/update-menu/${roleId}`, { updatedMenu: existingMenu });
            console.log(`Submenus added to menu '${menuKey}' for role '${role.name}'`);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching roles or updating menus:', error);
    }
  };

  useEffect(() => {
    fetchRolesAndUpdateMenus();
  }, []);





  const handleMenuChange = (e) => {
    const menu = e.target.value;
    setSelectedMenu(menu);
    setSelectedSubmenu('');
    setAllowedSubmenus([]);
  }

  const handleSubmenuChange = (e) => {
    setSelectedSubmenu(e.target.value);
    setSelectedSubItem('');
  };




  const handlePermissionCheckboxChange = (submenuName, permissionId) => {
    setSubmenuPermissions((prevPermissions) => {
      const submenuPerms = prevPermissions[submenuName] || { permissions: [] };

      // Toggle the permissionId in the permissions array
      const updatedPermissions = submenuPerms.permissions.includes(permissionId)
        ? submenuPerms.permissions.filter((id) => id !== permissionId)
        : [...submenuPerms.permissions, permissionId];

      return {
        ...prevPermissions,
        [submenuName]: { ...submenuPerms, permissions: updatedPermissions },
      };
    });
  };

  // Handle subItem checkbox change
  const handleSubItemPermissionCheckboxChange = (subItemName, permissionId) => {
    setSubmenuPermissions((prevPermissions) => {
      const subItemPerms = prevPermissions[subItemName] || { permissions: [] };

      // Toggle the permissionId in the permissions array for subItem
      const updatedPermissions = subItemPerms.permissions.includes(permissionId)
        ? subItemPerms.permissions.filter((id) => id !== permissionId)
        : [...subItemPerms.permissions, permissionId];

      return {
        ...prevPermissions,
        [subItemName]: { ...subItemPerms, permissions: updatedPermissions },
      };
    });
  };

  // // Main checkbox handler for submenu and subItems
  const handleCheckboxChange = (name, permissionId = null) => {
    const isChecked = allowedSubmenus.includes(name);

    // Toggle allowed submenus or subItems
    if (isChecked) {
      setAllowedSubmenus((prev) => prev.filter((submenuName) => submenuName !== name));
    } else {
      setAllowedSubmenus((prev) => [...prev, name]);
    }

    // If permissionId is provided, also toggle the permissions for this submenu or subItem
    if (permissionId) {
      handlePermissionCheckboxChange(name, permissionId);
    }
  };


  useEffect(() => {
    const fetchSubmenuPermissions = async () => {
      if (selectedMenu && selectedRole) {
        const roleId = roles.find((role) => role.name === selectedRole)?._id;
        if (roleId) {
          const { data } = await axios.get(`http://localhost:5001/role/${roleId}/menus`);
          const menu = data.menus.find((menu) => menu.name === selectedMenu);
          if (menu) {
            const submenuPermissionsData = menu.pages.reduce((acc, page) => {
              acc[page.name] = {
                permissions: page.permissions || [],
                status: page.status,

              };

              if (page.submenus) {
                page.submenus.forEach((submenu) => {
                  acc[submenu.name] = {
                    permissions: submenu.permissions || [],
                    status: submenu.status,
                  }
                })
              }

              return acc;
            }, {});

            setSubmenuPermissions(submenuPermissionsData);
            let allowedSubmenus = menu.pages
              .filter((page) => page.status)
              .map((page) => page.name);

            menu.pages.forEach((page) => {
              if (Array.isArray(page.submenus)) {
                allowedSubmenus.push(
                  ...page.submenus.filter((submenu) => submenu.status).map((submenu) => submenu.name)
                )
              }
            });

            setAllowedSubmenus(allowedSubmenus);
            console.log("678", allowedSubmenus)
            // setAllowedSubmenus(menu.pages.filter((submenu) => submenu.status).map((submenu) => submenu.name));
          }
        }
      }
    };

    fetchSubmenuPermissions();
  }, [selectedMenu, selectedRole, roles]);





  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSave = async () => {
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }

    try {
      const roleId = roles.find((role) => role.name === selectedRole)?._id;

      if (roleId) {
        const updates = selectedSubmenus.map((submenu) => ({
          name: submenu.name,
          permissions: submenuPermissions[submenu.name]?.permissions || [],
          status: allowedSubmenus.includes(submenu.name),  // true if allowed, false otherwise
          submenus: submenu.subItems?.map(subItem => ({
            name: subItem.name,
            status: allowedSubmenus.includes(subItem.name),
            permissions: submenuPermissions[subItem.name]?.permissions || [],
          })) || [],
        }));

        console.log('Sending updates:', updates);

        const response = await axios.put(
          `http://localhost:5001/role/update-submenu-status/${roleId}`,
          { updates }
        );

        console.log('Response from server:', response.data);
        alert('Submenu statuses updated successfully!');
      } else {
        alert('No role ID found for the selected role.');
      }
    } catch (error) {
      console.error('Error saving submenu statuses:', error);
      alert('Failed to save submenu statuses.');
    }
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:5001/permission/read');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

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
            value={selectedRole}
            onChange={handleRoleChange}
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
            {/* {Object.entries(menuOptions2).map(([key, { title }]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))} */}
            {
              Object.entries(menuOptions).map(([key,menu])=>(
                <option key={key} value={key}>
                  {menu.name}
                </option>
              ))
            }
          </select>
        </div>


        {selectedMenu && (
          <div className="w-1/3 ">
            <label htmlFor="submenuSelection" className="block text-sm font-medium text-gray-700">
              Select Submenu
            </label>
            <select
              id="submenuSelection"
              value={selectedSubmenu}
              onChange={handleSubmenuChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Submenu</option>
              {menuOptions[selectedMenu]?.pages
                ?.filter((pages) => pages.submenus && pages.submenus.length > 0)
                .map((page) => (
                  <option key={page.name} value={page.name}>
                    {page.name}
                  </option>
                ))}
            </select>
          </div>
        )}


      </div>

      <div className="overflow-x-auto">



        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Allow</th>
              <th className="py-2 px-4 border-b">From Title</th>

              {permissions.map((permission) => (
                <th key={permission._id} className="py-2 px-4 border-b">
                  {permission.name}
                </th>
              ))}

            </tr>
          </thead>
          {!selectedSubmenu && (
            <tbody>
              {menuOptions[selectedMenu]?.pages.map((submenu) => (
                <tr key={submenu.name}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={allowedSubmenus.includes(submenu.name)}
                      onChange={() => handleCheckboxChange(submenu.name)}
                    />
                  </td>

                  <td className="py-2 px-4 border-b">{submenu.name}</td>

                  {permissions.map((permission) => (
                    <td key={permission.id} className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={submenuPermissions[submenu.name]?.permissions?.includes(permission._id) || false}
                        onChange={() => handlePermissionCheckboxChange(submenu.name, permission._id)} // Ensure permission.id is passed
                        disabled={!allowedSubmenus.includes(submenu.name)} // 
                        id={`${submenu.name}-${permission.name}`}
                      />
                    </td>
                  ))}



                </tr>
              ))}


            </tbody>
          )}

          {selectedSubmenu && (
            <tbody>

              {menuOptions[selectedMenu]?.pages
               
                ?.find((pages) => pages.submenus.name === selectedSubmenu)
                ?.submenus?.map((subItem) => (


                  <tr key={subItem.name}>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={allowedSubmenus.includes(subItem.name)}
                        onChange={() => handleCheckboxChange(subItem.name)}
                      />
                    </td>

                    <td className="py-2 px-4 border-b">{subItem.name}</td>
                    {permissions.map((permission) => (
                      <td key={permission.id} className="py-2 px-4 border-b">
                        <input
                          type="checkbox"
                          checked={submenuPermissions[subItem.name]?.permissions?.includes(permission._id) || false}
                          onChange={() => handleSubItemPermissionCheckboxChange(subItem.name, permission._id)}
                          disabled={!allowedSubmenus.includes(subItem.name)}
                          id={`${subItem.name}-${permission.name}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          )}

        </table>

      </div>




      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Course;



