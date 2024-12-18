import React, { useState } from 'react';
import menuData from './menuData';

const Course = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSubmenu, setSelectedSubmenu] = useState('');
    const [selectedSubsubmenu, setSelectedSubsubmenu] = useState('');
    const [permissions, setPermissions] = useState({});

    const roles = ['Admin', 'User', 'Manager'];

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handleMenuChange = (e) => {
        setSelectedMenu(e.target.value);
        setSelectedSubmenu('');
        setSelectedSubsubmenu('');
    }

    const handleSubmenuChange = (e) => {
        setSelectedSubmenu(e.target.value);
        setSelectedSubsubmenu('');
    };

    const handleSubsubmenuChange = (e) => {
        setSelectedSubsubmenu(e.target.value);
    }

    const handlePermisssionChange = (type, name, checked) => {
        setPermissions(prevPermission => ({
            ...prevPermission,
            [name]: {
                ...prevPermission[name],
                [type]: checked
            }
        }));
    }

    const handleSave = () => {
        const result = [];

        if (selectedMenu) {
            result.push({
                name: selectedMenu,
                permissions: {
                    allow: permissions[selectedMenu]?.allow || false,
                    read: permissions[selectedMenu]?.read || false,
                    insert: permissions[selectedMenu]?.insert || false,
                    update: permissions[selectedMenu]?.update || false,
                    delete: permissions[selectedMenu]?.delete || false,
                }
            })
        }
        alert("permission Saved")
        console.log(result);
    }



    const selectedMenuData = menuData.find(menu => menu.name === selectedMenu);

    const selectedSubmenuData = selectedMenuData?.submenus.find(submenu => submenu.name === selectedSubmenu);

    const SubmenuwithSubsubmenu = selectedMenuData?.submenus.filter(submenu => submenu.subsubmenus?.length > 0);

    return (
        <div className='p-4 sm:p-6 md:p-8'>
            <div className='max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg'>
                <h2 className='text-lg sm:text-xl font-semibold mb-4'>Selected Role and Menu</h2>

                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                    <div className='w-full md:w-1/3'>
                        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                            Role:
                        </label>
                        <select
                            id="role"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedRole}
                            onChange={handleRoleChange}
                        >
                            <option value="">Select Role</option>
                            {roles.map((role, index) => (
                                <option value={role} key={index}>{role}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full md:w-1/3'>
                        <label htmlFor="menu" className="block text-gray-700 font-medium mb-2">
                            Menu:
                        </label>
                        <select
                            id="menu"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedMenu}
                            onChange={handleMenuChange}
                        >
                            <option value="">Select Menu</option>
                            {menuData.map((menu, index) => (
                                <option key={index} value={menu.name}>{menu.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submenu Dropdown (Only if selected Menu has submenus) */}
                    {selectedMenu && SubmenuwithSubsubmenu?.length > 0 && (
                        <div className='w-full md:w-1/3'>
                            <label htmlFor="submenu" className="block text-gray-700 font-medium mb-2">
                                Submenu:
                            </label>
                            <select
                                id="submenu"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={selectedSubmenu}
                                onChange={handleSubmenuChange}
                            >
                                <option value="">Select a Submenu</option>
                                {SubmenuwithSubsubmenu.map((submenu, index) => (
                                    <option key={index} value={submenu.name}>{submenu.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    {selectedMenu && selectedMenuData?.submenus.length > 0 && !selectedSubmenu && (
                        <div className='mb-4'>
                            <h3 className="text-md sm:text-lg font-medium mb-2">Submenus:</h3>
                            {selectedMenuData.submenus.map((submenu, index) => (
                                <p key={index} className='text-gray-700'>{submenu.name}</p>
                            ))}
                        </div>
                    )}

                    {selectedSubmenu && selectedSubmenuData?.subsubmenus.length > 0 && (
                        <div className='mb-4'>
                            <h3 className="text-md sm:text-lg font-medium mb-2">SubSubmenus:</h3>
                            {selectedSubmenuData.subsubmenus.map((subsubmenus, index) => (
                                <p key={index} className='text-gray-700'>{subsubmenus}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className='mt-4'>
                    <h3 className="text-md sm:text-lg font-medium mb-4">Permissions</h3>

                    <h3 className="text-md sm:text-lg font-medium mb-4">Permissions</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className='px-4 py-2'>Allow</th>
                                <th className='px-4 py-2'>Menus Name</th>
                                <th className='px-4 py-2'>Read</th>
                                <th className='px-4 py-2'>Insert</th>
                                <th className='px-4 py-2'>Update</th>
                                <th className='px-4 py-2'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* {selectedMenuData && (
                                <tr>
                                    <td className='border px-4 py-2'>
                                        <input
                                            type='checkbox'
                                            onChange={(e) => handlePermisssionChange('allow', selectedMenu, e.target.checked)}
                                            checked={permissions[selectedMenu]?.allow || false} />
                                    </td>

                                  
                                    <td className="border px-4 py-2">{selectedMenu}</td>

                                    {['read','insert','update','delete'].map((permission)=>(
                                        <td key={permission} className='border px-4 py-2'>
                                            <input
                                                type='checkbox'
                                                onChange={(e)=>handlePermisssionChange(permission,selectedMenu,e.target.checked)}
                                                checked={permissions[selectedMenu]?.[permission] || false}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            )} */}

                          {selectedMenu && selectedMenuData?.submenus.length >0 && !selectedSubmenu &&(
                            selectedMenuData.submenus.map((submenu,index)=>{
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        <input
                                            type='checkbox'
                                            onChange={(e)=>handlePermisssionChange('allow',submenu.name,e.target.checked)}
                                            checked={permissions[selectedMenu]?.[submenu.name]?.allow ||false}
                                         />
                                    </td>

                                    <td  className="border px-4 py-2">{submenu.name}</td>

                                    {['read','insert','update','delete'].map((permission)=>(
                                        <td key={permission} className="border px-4 py-2">
                                                <input 
                                                    type="checkbox"
                                                    onChange={(e)=>handlePermisssionChange(permission,submenu.name,e.target.checked)}
                                                    checked={permissions[selectedMenu]?.[submenu.name]?.[permission] || false}
                                                />
                                        </td>
                                    ))}
                                </tr>
                            })
                          )}

                          
                             {selectedSubmenu && selectedSubmenuData?.subsubmenus.length > 0  && (
                                <tr>
                                    <td className='border px-4 py-2'>
                                        <input
                                            type='checkbox'
                                            onChange={(e) => handlePermisssionChange('allow', selectedMenu, e.target.checked)}
                                            checked={permissions[selectedMenu]?.allow || false} />
                                    </td>

                                    {/* Menu Name */}
                                    <td className="border px-4 py-2">{selectedMenu}</td>

                                    {['read','insert','update','delete'].map((permission)=>(
                                        <td key={permission} className='border px-4 py-2'>
                                            <input
                                                type='checkbox'
                                                onChange={(e)=>handlePermisssionChange(permission,selectedMenu,e.target.checked)}
                                                checked={permissions[selectedMenu]?.[permission] || false}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
                {/* save button  */}
                <div className='mt-6'>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSave}> save</button>
                </div>
            </div>
        </div>
    );
}

export default Course;

// import React, { useState } from 'react';
// import menuData from './menuData';

// const Course = () => {
//     const [selectedRole, setSelectedRole] = useState('');
//     const [selectedMenu, setSelectedMenu] = useState('');
//     const [selectedSubmenu, setSelectedSubmenu] = useState('');
//     const [selectedSubsubmenu, setSelectedSubsubmenu] = useState('');
//     const [permissions, setPermissions] = useState({});

//     const roles = ['Admin', 'User', 'Manager'];

//     const handleRoleChange = (e) => {
//         setSelectedRole(e.target.value);
//     }

//     const handleMenuChange = (e) => {
//         setSelectedMenu(e.target.value);
//         setSelectedSubmenu('');
//         setSelectedSubsubmenu('');
//     }

//     const handleSubmenuChange = (e) => {
//         setSelectedSubmenu(e.target.value);
//         setSelectedSubsubmenu('');
//     };

//     const handleSubsubmenuChange = (e) => {
//         setSelectedSubsubmenu(e.target.value);
//     }

//     const selectedMenuData = menuData.find(menu => menu.name === selectedMenu);
//     const selectedSubmenuData = selectedMenuData?.submenus.find(submenu => submenu.name === selectedSubmenu);
//     const SubmenuwithSubsubmenu = selectedMenuData?.submenus.filter(submenu => submenu.subsubmenus?.length > 0);

//     const handlePermissionChange = (type, name, checked) => {
//         setPermissions(prevPermissions => ({
//             ...prevPermissions,
//             [name]: {
//                 ...prevPermissions[name],
//                 [type]: checked
//             }
//         }));
//     }

//     return (
//         <div className='p-4 sm:p-6 md:p-8'>
//             <div className='max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg'>
//                 <h2 className='text-lg sm:text-xl font-semibold mb-4'>Selected Role and Menu</h2>

//                 <div className='flex flex-col md:flex-row gap-4 mb-4'>
//                     <div className='w-full md:w-1/3'>
//                         <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
//                             Role:
//                         </label>
//                         <select
//                             id="role"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             value={selectedRole}
//                             onChange={handleRoleChange}
//                         >
//                             <option value="">Select Role</option>
//                             {roles.map((role, index) => (
//                                 <option value={role} key={index}>{role}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className='w-full md:w-1/3'>
//                         <label htmlFor="menu" className="block text-gray-700 font-medium mb-2">
//                             Menu:
//                         </label>
//                         <select
//                             id="menu"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             value={selectedMenu}
//                             onChange={handleMenuChange}
//                         >
//                             <option value="">Select Menu</option>
//                             {menuData.map((menu, index) => (
//                                 <option key={index} value={menu.name}>{menu.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Submenu Dropdown (Only if selected Menu has submenus) */}
//                     {selectedMenu && SubmenuwithSubsubmenu?.length > 0 && (
//                         <div className='w-full md:w-1/3'>
//                             <label htmlFor="submenu" className="block text-gray-700 font-medium mb-2">
//                                 Submenu:
//                             </label>
//                             <select
//                                 id="submenu"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 value={selectedSubmenu}
//                                 onChange={handleSubmenuChange}
//                             >
//                                 <option value="">Select a Submenu</option>
//                                 {SubmenuwithSubsubmenu.map((submenu, index) => (
//                                     <option key={index} value={submenu.name}>{submenu.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}
//                 </div>

//                 {/* Permissions Table */}
//                 <div className="mt-4">
//                     <h3 className="text-md sm:text-lg font-medium mb-4">Permissions</h3>
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2">Allow</th>
//                                 <th className="px-4 py-2">Menu / Submenu Name</th>
//                                 <th className="px-4 py-2">Read</th>
//                                 <th className="px-4 py-2">Insert</th>
//                                 <th className="px-4 py-2">Update</th>
//                                 <th className="px-4 py-2">Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {selectedMenuData && (
//                                 <>
//                                     <tr>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('allow', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.allow || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">{selectedMenu}</td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('read', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.read || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('insert', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.insert || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('update', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.update || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('delete', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.delete || false}
//                                             />
//                                         </td>
//                                     </tr>
//                                     {/* Display Submenus */}
//                                     {selectedMenuData.submenus.map((submenu, submenuIndex) => (
//                                         <tr key={submenuIndex}>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('allow', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.allow || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">-- {submenu.name}</td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('read', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.read || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('insert', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.insert || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('update', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.update || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('delete', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.delete || false}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Course;

// import React, { useState } from 'react';
// import menuData from './menuData';

// const Course = () => {
//     const [selectedRole, setSelectedRole] = useState('');
//     const [selectedMenu, setSelectedMenu] = useState('');
//     const [selectedSubmenu, setSelectedSubmenu] = useState('');
//     const [selectedSubsubmenu, setSelectedSubsubmenu] = useState('');
//     const [permissions, setPermissions] = useState({});

//     const roles = ['Admin', 'User', 'Manager'];

//     const handleRoleChange = (e) => {
//         setSelectedRole(e.target.value);
//     }

//     const handleMenuChange = (e) => {
//         setSelectedMenu(e.target.value);
//         setSelectedSubmenu('');
//         setSelectedSubsubmenu('');
//     }

//     const handleSubmenuChange = (e) => {
//         setSelectedSubmenu(e.target.value);
//         setSelectedSubsubmenu('');
//     };

//     const handleSubsubmenuChange = (e) => {
//         setSelectedSubsubmenu(e.target.value);
//     }

//     const selectedMenuData = menuData.find(menu => menu.name === selectedMenu);
//     const selectedSubmenuData = selectedMenuData?.submenus.find(submenu => submenu.name === selectedSubmenu);
//     const SubmenuwithSubsubmenu = selectedMenuData?.submenus.filter(submenu => submenu.subsubmenus?.length > 0);

//     const handlePermissionChange = (type, name, checked) => {
//         setPermissions(prevPermissions => ({
//             ...prevPermissions,
//             [name]: {
//                 ...prevPermissions[name],
//                 [type]: checked
//             }
//         }));
//     }

//     // Save function to log selected permissions
//     const handleSave = () => {
//         const result = [];

//         if (selectedMenu) {
//             result.push({
//                 name: selectedMenu,
//                 permissions: {
//                     allow: permissions[selectedMenu]?.allow || false,
//                     read: permissions[selectedMenu]?.read || false,
//                     insert: permissions[selectedMenu]?.insert || false,
//                     update: permissions[selectedMenu]?.update || false,
//                     delete: permissions[selectedMenu]?.delete || false
//                 }
//             });

//             selectedMenuData.submenus.forEach(submenu => {
//                 result.push({
//                     name: submenu.name,
//                     permissions: {
//                         allow: permissions[submenu.name]?.allow || false,
//                         read: permissions[submenu.name]?.read || false,
//                         insert: permissions[submenu.name]?.insert || false,
//                         update: permissions[submenu.name]?.update || false,
//                         delete: permissions[submenu.name]?.delete || false
//                     }
//                 });
//             });
//         }

//         console.log(result);
//     };

//     return (
//         <div className='p-4 sm:p-6 md:p-8'>
//             <div className='max-w-full mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg'>
//                 <h2 className='text-lg sm:text-xl font-semibold mb-4'>Selected Role and Menu</h2>

//                 <div className='flex flex-col md:flex-row gap-4 mb-4'>
//                     <div className='w-full md:w-1/3'>
//                         <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
//                             Role:
//                         </label>
//                         <select
//                             id="role"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             value={selectedRole}
//                             onChange={handleRoleChange}
//                         >
//                             <option value="">Select Role</option>
//                             {roles.map((role, index) => (
//                                 <option value={role} key={index}>{role}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className='w-full md:w-1/3'>
//                         <label htmlFor="menu" className="block text-gray-700 font-medium mb-2">
//                             Menu:
//                         </label>
//                         <select
//                             id="menu"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             value={selectedMenu}
//                             onChange={handleMenuChange}
//                         >
//                             <option value="">Select Menu</option>
//                             {menuData.map((menu, index) => (
//                                 <option key={index} value={menu.name}>{menu.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {selectedMenu && SubmenuwithSubsubmenu?.length > 0 && (
//                         <div className='w-full md:w-1/3'>
//                             <label htmlFor="submenu" className="block text-gray-700 font-medium mb-2">
//                                 Submenu:
//                             </label>
//                             <select
//                                 id="submenu"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 value={selectedSubmenu}
//                                 onChange={handleSubmenuChange}
//                             >
//                                 <option value="">Select a Submenu</option>
//                                 {SubmenuwithSubsubmenu.map((submenu, index) => (
//                                     <option key={index} value={submenu.name}>{submenu.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}
//                 </div>

//                 <div className="mt-4">
//                     <h3 className="text-md sm:text-lg font-medium mb-4">Permissions</h3>
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2">Allow</th>
//                                 <th className="px-4 py-2">Menu / Submenu Name</th>
//                                 <th className="px-4 py-2">Read</th>
//                                 <th className="px-4 py-2">Insert</th>
//                                 <th className="px-4 py-2">Update</th>
//                                 <th className="px-4 py-2">Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {selectedMenuData && (
//                                 <>
//                                     <tr>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('allow', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.allow || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">{selectedMenu}</td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('read', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.read || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('insert', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.insert || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('update', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.update || false}
//                                             />
//                                         </td>
//                                         <td className="border px-4 py-2">
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handlePermissionChange('delete', selectedMenu, e.target.checked)}
//                                                 checked={permissions[selectedMenu]?.delete || false}
//                                             />
//                                         </td>
//                                     </tr>
//                                     {selectedMenuData.submenus.map((submenu, submenuIndex) => (
//                                         <tr key={submenuIndex}>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('allow', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.allow || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">-- {submenu.name}</td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('read', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.read || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('insert', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.insert || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('update', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.update || false}
//                                                 />
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={(e) => handlePermissionChange('delete', submenu.name, e.target.checked)}
//                                                     checked={permissions[submenu.name]?.delete || false}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Save Button */}
//                 <div className="mt-6">
//                     <button
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                         onClick={handleSave}
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Course;
